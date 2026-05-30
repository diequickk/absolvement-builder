import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Share2, FileDown, Copy, Link } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import RaceSelector from "../components/builder/RaceSelector";
import WeaponSelector from "../components/builder/WeaponSelector";
import SinsAllocator from "../components/builder/SinsAllocator";
import RelicsSelector from "../components/builder/RelicsSelector";
import SkillTree from "../components/builder/SkillTree.jsx";
import Skills from "../components/builder/Skills";
import PotentialsPanel from "../components/builder/PotentialsPanel";
import BuildSummary from "../components/builder/BuildSummary";

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
    const encoded = params.get('build');
    if (encoded) {
      try {
        const data = JSON.parse(atob(encoded));
        if (data.build_name) setBuildName(data.build_name);
        if (data.race) setRace(data.race);
        if (data.weapon) setWeapon(data.weapon);
        if (data.sins) setSins(data.sins);
        if (data.relics) setRelics(data.relics);
        if (data.skill_tree) setSkillTree(data.skill_tree);
        if (data.skills) setSkills(data.skills);
        if (data.potentials) setPotentials(data.potentials);
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
    const buildData = {
      build_name: buildName,
      race,
      weapon,
      sins,
      relics,
      skill_tree: skillTree,
      skills,
      potentials
    };
    const encoded = btoa(JSON.stringify(buildData));
    const url = `${window.location.origin}${window.location.pathname}?build=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Share link copied to clipboard!");
    }).catch(() => {
      toast.error("Could not copy — try again");
    });
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
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
              <TabsList className="bg-zinc-900/50 border border-gray-700 p-1 mb-6 flex-wrap h-auto">
                <TabsTrigger value="race" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Race</TabsTrigger>
                <TabsTrigger value="weapon" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Weapon</TabsTrigger>
                <TabsTrigger value="sins" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Sins</TabsTrigger>
                <TabsTrigger value="relics" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Relics</TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Soul Tree</TabsTrigger>
                <TabsTrigger value="myskills" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Skills</TabsTrigger>
                <TabsTrigger value="potentials" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Core Potentials</TabsTrigger>
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