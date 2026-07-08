import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "lucide-react";
import { toast } from "../lib/toast";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import OilBackground from "../components/OilBackground";
import RaceSelector from "../components/builder/RaceSelector";
import WeaponSelector from "../components/builder/WeaponSelector";
import SinsAllocator from "../components/builder/SinsAllocator";
import RelicsSelector from "../components/builder/RelicsSelector";
import SkillTree from "../components/builder/SkillTree.jsx";
import Skills from "../components/builder/Skills";
import PotentialsPanel from "../components/builder/PotentialsPanel";
import BuildSummary from "../components/builder/BuildSummary";

const BUILD_CACHE_PREFIX = 'absolvement-build:';
const SHARE_PAYLOAD_PARAM = 'd';

function getIdValue(value) {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object') return value.id || value.name || null;
  return null;
}

function compactBuildState(buildState) {
  const compactState = {};

  if (buildState.buildName?.trim()) compactState.n = buildState.buildName.trim();
  const raceId = getIdValue(buildState.race);
  if (raceId) compactState.a = raceId;

  const weaponId = getIdValue(buildState.weapon);
  if (weaponId) compactState.w = weaponId;

  const activeSins = Object.entries(buildState.sins || {})
    .filter(([, value]) => value?.active)
    .map(([key]) => key);
  if (activeSins.length > 0) compactState.s = [...new Set(activeSins)];

  if (Array.isArray(buildState.relics) && buildState.relics.length > 0) {
    compactState.r = [...new Set(buildState.relics.map(getIdValue).filter(Boolean))];
  }

  const unlockedNodes = Object.entries(buildState.skillTree || {})
    .filter(([, value]) => Boolean(value))
    .map(([key]) => key);
  if (unlockedNodes.length > 0) compactState.t = [...new Set(unlockedNodes)];

  if (Array.isArray(buildState.skills) && buildState.skills.length > 0) {
    compactState.k = [...new Set(buildState.skills.map(getIdValue).filter(Boolean))];
  }

  if (Array.isArray(buildState.potentials) && buildState.potentials.length > 0) {
    compactState.p = [...new Set(buildState.potentials.map(getIdValue).filter(Boolean))];
  }

  return compactState;
}

function expandBuildState(buildData) {
  const sinIds = Array.isArray(buildData.s)
    ? buildData.s
    : Object.keys(buildData.sins || {}).filter((id) => buildData.sins?.[id]?.active);

  const sinsObject = sinIds.reduce((acc, id) => {
    acc[id] = { active: true, burden: true };
    return acc;
  }, {});

  const relicsArray = Array.isArray(buildData.r)
    ? buildData.r
    : Array.isArray(buildData.relics)
      ? buildData.relics
      : [];

  const treeArray = Array.isArray(buildData.t)
    ? buildData.t
    : buildData.skill_tree && typeof buildData.skill_tree === 'object'
      ? Object.keys(buildData.skill_tree).filter((key) => buildData.skill_tree[key])
      : [];

  const treeObject = treeArray.reduce((acc, id) => {
    acc[id] = true;
    return acc;
  }, {});

  return {
    buildName: buildData.n ?? buildData.build_name ?? "",
    race: buildData.a ?? buildData.race ?? null,
    weapon: buildData.w ?? buildData.weapon ?? null,
    sins: Object.keys(sinsObject).length ? sinsObject : (buildData.sins ?? {}),
    relics: relicsArray,
    skillTree: Object.keys(treeObject).length ? treeObject : (buildData.skill_tree ?? {}),
    skills: buildData.k ?? buildData.skills ?? [],
    potentials: buildData.p ?? buildData.potentials ?? [],
  };
}

function createRoomCode(length = 8) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = new Uint32Array(length);
  window.crypto.getRandomValues(values);
  return Array.from(values, (value) => alphabet[value % alphabet.length]).join('');
}

function getCachedBuildData(roomCode) {
  try {
    const raw = window.localStorage.getItem(`${BUILD_CACHE_PREFIX}${roomCode}`);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function setCachedBuildData(roomCode, buildData) {
  try {
    window.localStorage.setItem(`${BUILD_CACHE_PREFIX}${roomCode}`, JSON.stringify(buildData));
  } catch (error) {
    // Ignore storage failures and fall back to the clipboard/link.
  }
}

function encodeBuildDataForShare(buildData) {
  return compressToEncodedURIComponent(JSON.stringify(buildData));
}

function decodeBuildDataFromShare(encodedPayload) {
  if (!encodedPayload) return null;

  try {
    const decodedJson = decompressFromEncodedURIComponent(encodedPayload);
    return decodedJson ? JSON.parse(decodedJson) : null;
  } catch (error) {
    return null;
  }
}

function extractSharedBuildData(shareText) {
  if (!shareText || typeof shareText !== 'string') return null;

  const trimmedShareText = shareText.trim();

  try {
    const shareUrl = new URL(trimmedShareText);
    const encodedPayload = shareUrl.searchParams.get(SHARE_PAYLOAD_PARAM);
    const buildData = decodeBuildDataFromShare(encodedPayload);
    if (buildData) {
      return buildData;
    }
  } catch (error) {
    // Fall through and try a loose parameter parse.
  }

  const directPayloadData = decodeBuildDataFromShare(trimmedShareText);
  if (directPayloadData) {
    return directPayloadData;
  }

  const encodedMatch = trimmedShareText.match(new RegExp(`[?&]${SHARE_PAYLOAD_PARAM}=([^&\s]+)`));
  if (!encodedMatch?.[1]) return null;

  return decodeBuildDataFromShare(decodeURIComponent(encodedMatch[1]));
}

async function readClipboardText() {
  try {
    return await navigator.clipboard.readText();
  } catch (error) {
    return '';
  }
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const fallbackField = document.createElement('textarea');
    fallbackField.value = text;
    fallbackField.setAttribute('readonly', 'true');
    fallbackField.style.position = 'fixed';
    fallbackField.style.opacity = '0';
    document.body.appendChild(fallbackField);
    fallbackField.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(fallbackField);
    return copied;
  }
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
  const [currentBuildCode, setCurrentBuildCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [shareLink, setShareLink] = useState("");

  const applyBuildData = (buildData, code = "") => {
    const nextState = expandBuildState(buildData);

    setBuildName(nextState.buildName || "");
    setRace(nextState.race || null);
    setWeapon(nextState.weapon || null);
    setSins(nextState.sins || {});
    setRelics(nextState.relics || []);
    setSkillTree(nextState.skillTree || {});
    setSkills(nextState.skills || []);
    setPotentials(nextState.potentials || []);

    if (code) {
      setCurrentBuildCode(code);
    }
  };

  const loadBuildByCode = async (inputValue) => {
    const normalizedInput = typeof inputValue === 'string' ? inputValue.trim() : '';

    const directSharedBuildData = extractSharedBuildData(normalizedInput);
    if (directSharedBuildData) {
      let sharedCode = '';
      try {
        sharedCode = new URL(normalizedInput).searchParams.get('b') || '';
      } catch (error) {
        sharedCode = '';
      }

      if (sharedCode) {
        setCachedBuildData(sharedCode, directSharedBuildData);
      }

      applyBuildData(directSharedBuildData, sharedCode);
      toast.success("Build loaded from share link!");
      return;
    }

    const normalizedCode = normalizedInput.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);

    if (normalizedCode) {
      const cachedBuild = getCachedBuildData(normalizedCode);
      if (cachedBuild) {
        applyBuildData(cachedBuild, normalizedCode);
        toast.success("Build loaded from code!");
        return;
      }
    }

    const clipboardText = await readClipboardText();
    const sharedBuildData = extractSharedBuildData(clipboardText);

    if (sharedBuildData) {
      let sharedCode = normalizedCode;
      if (!sharedCode) {
        try {
          sharedCode = new URL(clipboardText).searchParams.get('b') || '';
        } catch (error) {
          sharedCode = '';
        }
      }

      if (sharedCode) {
        setCachedBuildData(sharedCode, sharedBuildData);
      }

      applyBuildData(sharedBuildData, sharedCode);
      toast.success("Build loaded from share link!");
      return;
    }

    if (!normalizedInput) {
      toast.error("Please enter a build code or share link");
      return;
    }

    toast.error("Could not load that code or link");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomCode = params.get('b') || '';
    const encodedPayload = params.get(SHARE_PAYLOAD_PARAM);

    if (encodedPayload) {
      const buildData = decodeBuildDataFromShare(encodedPayload);
      if (buildData) {
        applyBuildData(buildData, roomCode);
        if (roomCode) {
          setCodeInput(roomCode);
          setCurrentBuildCode(roomCode);
          setCachedBuildData(roomCode, buildData);
        }
      }
      return;
    }

    if (roomCode) {
      void loadBuildByCode(roomCode);
    }
  }, []);

  const handleShareBuild = async () => {
    const roomCode = createRoomCode();
    const compactPayload = compactBuildState({
      buildName,
      race,
      weapon,
      sins,
      relics,
      skillTree,
      skills,
      potentials,
    });

    setCurrentBuildCode(roomCode);
    setCachedBuildData(roomCode, compactPayload);

    const encodedPayload = encodeBuildDataForShare(compactPayload);
    const shareUrl = `${window.location.origin}${window.location.pathname}?b=${roomCode}&${SHARE_PAYLOAD_PARAM}=${encodedPayload}`;
    let finalShareUrl = shareUrl;

    try {
      const shortenerResponse = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(shareUrl)}`);
      if (shortenerResponse.ok) {
        const shortUrl = (await shortenerResponse.text()).trim();
        if (shortUrl.startsWith('https://tinyurl.com/')) {
          finalShareUrl = shortUrl;
        }
      }
    } catch (error) {
      // Use the full share URL if shortening fails.
    }

    setShareLink(finalShareUrl);

    const copied = await copyToClipboard(finalShareUrl);
    if (copied) {
      toast.success("Short share link copied to clipboard!");
      return;
    }

    toast.error("Could not create share code");
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
            <h1 className="abs-title" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}>
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

            <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center w-full md:w-auto">
              <Input
                placeholder="Build code or share link"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                autoComplete="off"
                spellCheck={false}
                className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 md:w-36"
              />
              <Button
                onClick={() => void loadBuildByCode(codeInput)}
                className="bg-white hover:bg-gray-200 text-black"
              >
                Load Code
              </Button>
              <Button
                onClick={() => void handleShareBuild()}
                variant="outline"
                className="border-gray-700 text-white hover:bg-zinc-800"
              >
                <Link className="w-4 h-4 mr-2" />
                Share Link
              </Button>
            </div>
          </div>
          {shareLink ? (
            <div className="mt-4 rounded-none border border-white/10 bg-black/30 px-4 py-3 text-left">
              <div className="text-[0.65rem] uppercase tracking-[0.28em] text-gray-500">Share Link</div>
              <div className="mt-2 break-all text-sm text-white/90">{shareLink}</div>
            </div>
          ) : null}
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
              currentBuildCode={currentBuildCode}
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
