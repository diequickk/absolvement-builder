import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Save, Share2, FileDown, Copy, Link } from "lucide-react";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { base44 } from "../api/base44Client";
import { toast } from "../lib/toast";
import OilBackground from "../components/OilBackground";
import RaceSelector from "../components/builder/RaceSelector";
import WeaponSelector from "../components/builder/WeaponSelector";
import SinsAllocator from "../components/builder/SinsAllocator";
import RelicsSelector from "../components/builder/RelicsSelector";
import SkillTree from "../components/builder/SkillTree.jsx";
import Skills from "../components/builder/Skills";
import PotentialsPanel from "../components/builder/PotentialsPanel";
import BuildSummary from "../components/builder/BuildSummary";

function compactBuildState(buildState) {
  const compactState = {};

  // Keep only tiny ID-like values in the shared payload.
  if (buildState.buildName?.trim()) compactState.n = buildState.buildName.trim();
  if (buildState.race) compactState.a = buildState.race;

  // Weapon: id string only
  if (buildState.weapon?.id) {
    compactState.w = buildState.weapon.id;
  } else if (typeof buildState.weapon === 'string') {
    compactState.w = buildState.weapon;
  }

  // Sins: array of active sin IDs
  const activeSins = Object.entries(buildState.sins || {})
    .filter(([_, value]) => value?.active)
    .map(([key]) => key);
  if (activeSins.length > 0) compactState.s = [...new Set(activeSins)];

  // Relics: array of relic IDs
  if (Array.isArray(buildState.relics) && buildState.relics.length > 0) {
    compactState.r = [...new Set(buildState.relics
      .map((relic) => (typeof relic === 'object' ? (relic.id || relic.name) : relic))
      .filter(Boolean))];
  }

  // Skill tree: array of unlocked node IDs
  const unlockedNodes = Object.entries(buildState.skillTree || {})
    .filter(([_, value]) => Boolean(value))
    .map(([key]) => key);
  if (unlockedNodes.length > 0) compactState.t = [...new Set(unlockedNodes)];

  // Skills: array of skill IDs
  if (Array.isArray(buildState.skills) && buildState.skills.length > 0) {
    compactState.k = [...new Set(buildState.skills.map((skill) => {
      if (!skill) return null;
      return typeof skill === 'object' ? (skill.id || skill.name) : skill;
    }).filter(Boolean))];
  }

  // Potentials: array of potential IDs
  if (Array.isArray(buildState.potentials) && buildState.potentials.length > 0) {
    compactState.p = [...new Set(buildState.potentials.map((pot) => {
      if (!pot) return null;
      return typeof pot === 'object' ? (pot.id || pot.name) : pot;
    }).filter(Boolean))];
  }

  return compactState;
}



function expandBuildState(buildData) {
  const sinIds = Array.isArray(buildData.s)
    ? buildData.s
    : Object.keys(buildData.sins || {}).filter((id) => buildData.sins?.[id]?.active);

  const legacyRace = typeof buildData.r === 'string' ? buildData.r : null;
  const compactRelics = Array.isArray(buildData.r) ? buildData.r : null;

  const sinsObject = sinIds.reduce((acc, id) => {
    acc[id] = { active: true, burden: true };
    return acc;
  }, {});

  const treeArray = Array.isArray(buildData.t) ? buildData.t : [];
  const treeObject = treeArray.reduce((acc, id) => {
    acc[id] = true;
    return acc;
  }, {});

  return {
    buildName: buildData.n ?? buildData.build_name ?? "",
    race: buildData.a ?? legacyRace ?? buildData.race ?? null,
    weapon: buildData.w ?? buildData.weapon ?? null,
    sins: Object.keys(sinsObject).length ? sinsObject : (buildData.sins ?? {}),
    relics: compactRelics ?? buildData.rl ?? buildData.relics ?? [],
    skillTree: Object.keys(treeObject).length ? treeObject : (buildData.skill_tree ?? {}),
    skills: buildData.k ?? buildData.sk ?? buildData.skills ?? [],
    potentials: buildData.p ?? buildData.potentials ?? [],
  };
}

export default function Builder() {
  const [buildName, setBuildName] = useState("");
  const [race, setRace] = useState(null);
  const [weapon, setWeapon] = useState(null);
  const [sins, setSins] = useState({});
  const [relics, setRelics] = useState([]);
  const [skillTree, setSkillTree] = useState({});
  const [skills, setSkills] = useState([]);
  const [potentials, setPotentials] = useState([]);

  // Load build from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const buildParam = params.get('build');
    if (buildParam) {
      try {
        const decompressed = decompressFromEncodedURIComponent(buildParam);
        const buildData = JSON.parse(decompressed || '{}');
        const nextState = expandBuildState(buildData);
        if (nextState.buildName) setBuildName(nextState.buildName);
        if (nextState.race) setRace(nextState.race);
        if (nextState.weapon) setWeapon(nextState.weapon);
        if (Object.keys(nextState.sins).length > 0) setSins(nextState.sins);
        if (nextState.relics.length > 0) setRelics(nextState.relics);
        if (Object.keys(nextState.skillTree).length > 0) setSkillTree(nextState.skillTree);
        if (nextState.skills.length > 0) setSkills(nextState.skills);
        if (nextState.potentials.length > 0) setPotentials(nextState.potentials);
        toast.success("Build loaded from link!");
      } catch (e) {
        // ignore invalid
      }
    }
  }, []);

  const handleSaveBuild = async () => {
    if (!buildName) {
      toast.error("Please enter a build name");
      return;
    }

    try {
      const buildData = {
        build_name: buildName,
        race: race,
        weapon: weapon,
        sins: sins,
        relics: relics,
        skill_tree: skillTree,
        potentials: [...skills, ...potentials]
      };

      await base44.entities.Build.create(buildData);
      toast.success("Build saved successfully!");
    } catch (error) {
      toast.error("Failed to save build");
    }
  };

    const handleShareBuild = () => {
    const ultraCompactPayload = {
      n: typeof buildName === 'string' ? buildName.trim() : "",
      a: typeof race === 'string' ? race : (race?.id || ""),
      w: typeof weapon === 'string' ? weapon : (weapon?.id || ""),
      s: Object.entries(sins || {})
          .filter(([_, val]) => val === true || val?.active)
          .map(([key]) => key),
      r: Array.isArray(relics) 
          ? relics.map(item => typeof item === 'string' ? item : (item?.id || "")).filter(Boolean) 
          : [],
      t: Object.entries(skillTree || {})
          .filter(([_, active]) => Boolean(active))
          .map(([nodeId]) => nodeId),
      k: Array.isArray(skills) 
          ? skills.map(item => typeof item === 'string' ? item : (item?.id || item?.name || "")).filter(Boolean) 
          : [],
      p: Array.isArray(potentials) 
          ? potentials.map(item => typeof item === 'string' ? item : (item?.id || item?.name || "")).filter(Boolean) 
          : []
    };

    const compressed = compressToEncodedURIComponent(JSON.stringify(ultraCompactPayload));
    const url = `${window.location.origin}/join?build=${compressed}`;
    
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success("Share link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Could not copy – try again");
      });
  };





  return (
    <div className="relative min-h-screen bg-black text-white">
      <OilBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center pt-4">
          {/* Top ornament */}
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gray-500" />
            <div className="w-2 h-2 rotate-45 bg-gray-400" style={{ boxShadow: '0 0 6px rgba(255,255,255,0.5)' }} />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gray-500" />
          </div>

          {/* Framed title */}
          <div className="relative px-10 py-1">
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #c8c8d0, #fff, #c8c8d0, transparent)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #c8c8d0, #fff, #c8c8d0, transparent)' }} />
            <h1
              className="abs-title"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
            >
              ABSOLVEMENT
            </h1>
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center gap-3 mt-2 mb-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gray-500" />
            <div className="w-2 h-2 rotate-45 bg-gray-400" style={{ boxShadow: '0 0 6px rgba(255,255,255,0.5)' }} />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gray-500" />
          </div>

          <p className="text-gray-500 text-xs tracking-widest uppercase" style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.25em' }}>
            Build Planner
          </p>
        </div>

        {/* Build Name & Actions */}
        <Card className="p-4 mb-6" style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(200,200,208,0.15)', backdropFilter: 'blur(8px)' }}>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Enter build name..."
                value={buildName}
                onChange={(e) => setBuildName(e.target.value)}
                className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSaveBuild}
                className="bg-white hover:bg-gray-200 text-black"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Build
              </Button>
              <Button
                onClick={handleShareBuild}
                variant="outline"
                className="border-gray-700 text-white hover:bg-zinc-800"
              >
                <Link className="w-4 h-4 mr-2" />
                Share Link
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Builder Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="race" className="w-full">
              <TabsList className="flex flex-wrap gap-4 bg-zinc-900/60 border border-gray-700 px-3 py-3 mb-6">
                <TabsTrigger value="race" className="rounded-none border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all hover:border-white/15 hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Race</TabsTrigger>
                <TabsTrigger value="weapon" className="rounded-none border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all hover:border-white/15 hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Weapon</TabsTrigger>
                <TabsTrigger value="sins" className="rounded-none border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all hover:border-white/15 hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Sins</TabsTrigger>
                <TabsTrigger value="relics" className="rounded-none border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all hover:border-white/15 hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Relics</TabsTrigger>
                <TabsTrigger value="skills" className="rounded-none border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all hover:border-white/15 hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Soul Tree</TabsTrigger>
                <TabsTrigger value="myskills" className="rounded-none border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all hover:border-white/15 hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Skills</TabsTrigger>
                <TabsTrigger value="potentials" className="rounded-none border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all hover:border-white/15 hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Core Potentials</TabsTrigger>
              </TabsList>

              <TabsContent value="race">
                <RaceSelector selected={race} onSelect={setRace} />
              </TabsContent>

              <TabsContent value="weapon">
                <WeaponSelector selected={weapon} onSelect={setWeapon} />
              </TabsContent>

              <TabsContent value="sins">
                <SinsAllocator sins={sins} onChange={setSins} />
              </TabsContent>

              <TabsContent value="relics">
                <RelicsSelector selected={relics} onSelect={setRelics} />
              </TabsContent>

              <TabsContent value="skills">
                <SkillTree selected={skillTree} onChange={setSkillTree} />
              </TabsContent>

              <TabsContent value="myskills">
                <Skills selected={skills} onChange={setSkills} race={race} />
              </TabsContent>

              <TabsContent value="potentials">
                <PotentialsPanel selected={potentials} onSelect={setPotentials} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Build Summary Sidebar */}
          <div className="lg:col-span-1">
            <BuildSummary
              buildName={buildName}
              race={race}
              weapon={weapon}
              sins={sins}
              relics={relics}
              skillTree={skillTree}
              skills={skills}
              potentials={potentials}
            />
          </div>
        </div>
      </div>
    </div>
  );
}