import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "lucide-react";
import { toast } from "../lib/toast";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import OilBackground from "../components/OilBackground";

const RaceSelector = lazy(() => import("../components/builder/RaceSelector"));
const WeaponSelector = lazy(() => import("../components/builder/WeaponSelector"));
const SinsAllocator = lazy(() => import("../components/builder/SinsAllocator"));
const RelicsSelector = lazy(() => import("../components/builder/RelicsSelector"));
const SkillTree = lazy(() => import("../components/builder/SkillTree.jsx"));
const Skills = lazy(() => import("../components/builder/Skills"));
const BuildSummary = lazy(() => import("../components/builder/BuildSummary"));

const BUILD_CACHE_PREFIX = 'absolvement-build:';
const SHARE_CODE_PARAM = 'b';
const SHARE_PAYLOAD_PARAM = 'd';
const SHARE_SLUG_PARAM = 'slug';
const BRANDED_SLUG_PREFIX = 'abs-builder';
const BUILD_CODE_VERSION = 'v0.2';
const LEGACY_CODE_VERSION = 'v0.1';
const MAX_SHARE_URL_LENGTH = 2048;
const SITE_VERSION = '0.1';

function getIdValue(value) {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object') return value.id || value.name || null;
  return null;
}

function compactBuildState(buildState) {
  const compactState = { v: '0.2' };

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

  if (typeof buildState.buildExplanation === 'string' && buildState.buildExplanation.trim().length > 0) {
    compactState.x = buildState.buildExplanation;
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
    buildExplanation: buildData.x ?? buildData.build_explanation ?? "",
  };
}

function createRoomCode(length = 8) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = new Uint32Array(length);
  window.crypto.getRandomValues(values);
  return Array.from(values, (value) => alphabet[value % alphabet.length]).join('');
}

function normalizeRoomCode(value) {
  return (typeof value === 'string' ? value : '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 32);
}

function formatBuildCode(roomCode, version = BUILD_CODE_VERSION) {
  return roomCode ? `${version}-${roomCode}` : '';
}

function parseBuildCode(rawCode) {
  const value = (typeof rawCode === 'string' ? rawCode : '').trim();
  if (!value) {
    return { version: LEGACY_CODE_VERSION, roomCode: '', normalizedCode: '' };
  }

  const versionedMatch = value.match(/^v(\d+\.\d+)-([A-Za-z0-9]+)$/i);
  if (versionedMatch) {
    const version = `v${versionedMatch[1]}`;
    const roomCode = normalizeRoomCode(versionedMatch[2]);
    return {
      version,
      roomCode,
      normalizedCode: roomCode ? `${version}-${roomCode}` : '',
    };
  }

  const roomCode = normalizeRoomCode(value);
  return {
    version: LEGACY_CODE_VERSION,
    roomCode,
    normalizedCode: roomCode,
  };
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

function normalizeIncomingBuildData(decodedBuildData) {
  if (!decodedBuildData || typeof decodedBuildData !== 'object') return null;

  const normalized = { ...decodedBuildData };
  if (normalized.xc && !normalized.x && typeof normalized.xc === 'string') {
    try {
      const explanation = decompressFromEncodedURIComponent(normalized.xc);
      if (typeof explanation === 'string') {
        normalized.x = explanation;
      }
    } catch (error) {
      // Ignore invalid compressed explanation fallback.
    }
  }

  if (!normalized.v || normalized.v === '0.1') {
    normalized.v = '0.2';
  }

  return normalized;
}

function encodeBuildDataForShare(buildData) {
  return compressToEncodedURIComponent(JSON.stringify(buildData));
}

function decodeBuildDataFromShare(encodedPayload) {
  if (!encodedPayload) return null;

  try {
    const decodedJson = decompressFromEncodedURIComponent(encodedPayload);
    const parsed = decodedJson ? JSON.parse(decodedJson) : null;
    return normalizeIncomingBuildData(parsed);
  } catch (error) {
    return null;
  }
}

function buildBrandedShareUrl(buildCode, encodedPayload) {
  const brandedSlug = `${BRANDED_SLUG_PREFIX}-${buildCode}`;
  const query = `${SHARE_SLUG_PARAM}=${encodeURIComponent(brandedSlug)}&${SHARE_CODE_PARAM}=${encodeURIComponent(buildCode)}&${SHARE_PAYLOAD_PARAM}=${encodedPayload}`;
  return `${window.location.origin}${window.location.pathname}?${query}`;
}

function extractSharedBuildData(shareText) {
  if (!shareText || typeof shareText !== 'string') return null;

  const trimmedShareText = shareText.trim();

  try {
    const shareUrl = new URL(trimmedShareText);
    const encodedPayload = shareUrl.searchParams.get(SHARE_PAYLOAD_PARAM);
    const buildData = decodeBuildDataFromShare(encodedPayload);
    if (buildData) {
      const parsedCode = parseBuildCode(shareUrl.searchParams.get(SHARE_CODE_PARAM) || '');
      return {
        buildData,
        sharedCode: parsedCode.normalizedCode,
        roomCode: parsedCode.roomCode,
      };
    }
  } catch (error) {
    // Fall through and try a loose parameter parse.
  }

  const directPayloadData = decodeBuildDataFromShare(trimmedShareText);
  if (directPayloadData) {
    return {
      buildData: directPayloadData,
      sharedCode: '',
      roomCode: '',
    };
  }

  const encodedMatch = trimmedShareText.match(new RegExp(`[?&]${SHARE_PAYLOAD_PARAM}=([^&\s]+)`));
  if (!encodedMatch?.[1]) return null;

  const buildData = decodeBuildDataFromShare(decodeURIComponent(encodedMatch[1]));
  if (!buildData) return null;

  const codeMatch = trimmedShareText.match(new RegExp(`[?&]${SHARE_CODE_PARAM}=([^&\s]+)`));
  const parsedCode = parseBuildCode(codeMatch?.[1] ? decodeURIComponent(codeMatch[1]) : '');
  return {
    buildData,
    sharedCode: parsedCode.normalizedCode,
    roomCode: parsedCode.roomCode,
  };
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
  const [activeTab, setActiveTab] = useState('race');
  const [mountedTabs, setMountedTabs] = useState(() => new Set(['race']));
  const [buildName, setBuildName] = useState("");
  const [race, setRace] = useState(null);
  const [weapon, setWeapon] = useState(null);
  const [sins, setSins] = useState({});
  const [relics, setRelics] = useState([]);
  const [skillTree, setSkillTree] = useState({});
  const [skills, setSkills] = useState([]);
  const [potentials, setPotentials] = useState([]);
  const [buildExplanation, setBuildExplanation] = useState("");
  const [currentBuildCode, setCurrentBuildCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [shareLink, setShareLink] = useState("");

  const handleTabChange = useCallback((nextTab) => {
    setActiveTab(nextTab);
    setMountedTabs((prev) => {
      if (prev.has(nextTab)) return prev;
      const next = new Set(prev);
      next.add(nextTab);
      return next;
    });
  }, []);

  const tabFallback = useMemo(() => (
    <div className="rounded border border-gray-700 bg-black/40 p-6 text-center text-sm text-gray-400">
      Loading section...
    </div>
  ), []);

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
    setBuildExplanation(nextState.buildExplanation || "");

    if (code) {
      setCurrentBuildCode(code);
      setCodeInput(code);
    }
  };

  const loadBuildByCode = async (inputValue) => {
    const normalizedInput = typeof inputValue === 'string' ? inputValue.trim() : '';

    const directSharedBuildData = extractSharedBuildData(normalizedInput);
    if (directSharedBuildData) {
      if (directSharedBuildData.roomCode) {
        setCachedBuildData(directSharedBuildData.roomCode, directSharedBuildData.buildData);
      }

      applyBuildData(directSharedBuildData.buildData, directSharedBuildData.sharedCode);
      toast.success("Build loaded from share link!");
      return;
    }

    const parsedInputCode = parseBuildCode(normalizedInput);
    const normalizedCode = parsedInputCode.roomCode;

    if (normalizedCode) {
      const cachedBuild = getCachedBuildData(normalizedCode);
      if (cachedBuild) {
        applyBuildData(cachedBuild, parsedInputCode.normalizedCode || normalizedCode);
        toast.success("Build loaded from code!");
        return;
      }
    }

    const clipboardText = await readClipboardText();
    const sharedBuildData = extractSharedBuildData(clipboardText);

    if (sharedBuildData) {
      const sharedCode = sharedBuildData.sharedCode || parsedInputCode.normalizedCode;

      if (sharedBuildData.roomCode || parsedInputCode.roomCode) {
        setCachedBuildData(sharedBuildData.roomCode || parsedInputCode.roomCode, sharedBuildData.buildData);
      }

      applyBuildData(sharedBuildData.buildData, sharedCode);
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
    const incomingCode = params.get(SHARE_CODE_PARAM) || '';
    const parsedIncomingCode = parseBuildCode(incomingCode);
    const encodedPayload = params.get(SHARE_PAYLOAD_PARAM);

    if (encodedPayload) {
      const buildData = decodeBuildDataFromShare(encodedPayload);
      if (buildData) {
        const uiCode = parsedIncomingCode.normalizedCode || incomingCode;
        applyBuildData(buildData, uiCode);
        if (parsedIncomingCode.roomCode) {
          setCachedBuildData(parsedIncomingCode.roomCode, buildData);
        }
      }
      return;
    }

    if (incomingCode) {
      void loadBuildByCode(incomingCode);
    }
  }, []);

  const handleShareBuild = async () => {
    const roomCode = createRoomCode();
    const buildCode = formatBuildCode(roomCode);
    const compactPayload = compactBuildState({
      buildName,
      race,
      weapon,
      sins,
      relics,
      skillTree,
      skills,
      potentials,
      buildExplanation,
    });

    setCurrentBuildCode(buildCode);
    setCodeInput(buildCode);
    setCachedBuildData(roomCode, compactPayload);

    let payloadForShare = { ...compactPayload };
    let encodedPayload = encodeBuildDataForShare(payloadForShare);
    let finalShareUrl = buildBrandedShareUrl(buildCode, encodedPayload);

    if (finalShareUrl.length > MAX_SHARE_URL_LENGTH && typeof payloadForShare.x === 'string') {
      payloadForShare = {
        ...payloadForShare,
        xc: compressToEncodedURIComponent(payloadForShare.x),
      };
      delete payloadForShare.x;
      encodedPayload = encodeBuildDataForShare(payloadForShare);
      finalShareUrl = buildBrandedShareUrl(buildCode, encodedPayload);
    }

    if (finalShareUrl.length > MAX_SHARE_URL_LENGTH) {
      toast.error('Build is too long to share in a URL. Shorten the explanation and try again.');
      return;
    }

    setShareLink(finalShareUrl);

    const copied = await copyToClipboard(finalShareUrl);
    if (copied) {
      toast.success("Share link copied to clipboard!");
      return;
    }

    toast.error("Could not copy share link");
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
          <p className="mt-2 text-[0.62rem] tracking-[0.22em] uppercase text-gray-600" style={{ fontFamily: 'Cinzel, serif' }}>
            Version {SITE_VERSION}
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
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="flex flex-wrap gap-4 bg-zinc-900/60 border border-gray-700 px-3 py-3 mb-6">
                <TabsTrigger value="race" className="rounded-none border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all hover:border-white/15 hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Race</TabsTrigger>
                <TabsTrigger value="weapon" className="rounded-none border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all hover:border-white/15 hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Weapon</TabsTrigger>
                <TabsTrigger value="sins" className="rounded-none border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all hover:border-white/15 hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Sins</TabsTrigger>
                <TabsTrigger value="relics" className="rounded-none border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all hover:border-white/15 hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Relics</TabsTrigger>
                <TabsTrigger value="skills" className="rounded-none border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all hover:border-white/15 hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Soul Tree</TabsTrigger>
                <TabsTrigger value="myskills" className="rounded-none border border-transparent bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all hover:border-white/15 hover:text-white data-[state=active]:border-white/20 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="race">
                {mountedTabs.has('race') ? (
                  <Suspense fallback={tabFallback}>
                    <RaceSelector selected={race} onSelect={setRace} />
                  </Suspense>
                ) : null}
              </TabsContent>

              <TabsContent value="weapon">
                {mountedTabs.has('weapon') ? (
                  <Suspense fallback={tabFallback}>
                    <WeaponSelector selected={weapon} onSelect={setWeapon} />
                  </Suspense>
                ) : null}
              </TabsContent>

              <TabsContent value="sins">
                {mountedTabs.has('sins') ? (
                  <Suspense fallback={tabFallback}>
                    <SinsAllocator sins={sins} onChange={setSins} />
                  </Suspense>
                ) : null}
              </TabsContent>

              <TabsContent value="relics">
                {mountedTabs.has('relics') ? (
                  <Suspense fallback={tabFallback}>
                    <RelicsSelector selected={relics} onSelect={setRelics} />
                  </Suspense>
                ) : null}
              </TabsContent>

              <TabsContent value="skills">
                {mountedTabs.has('skills') ? (
                  <Suspense fallback={tabFallback}>
                    <SkillTree selected={skillTree} onChange={setSkillTree} />
                  </Suspense>
                ) : null}
              </TabsContent>

              <TabsContent value="myskills">
                {mountedTabs.has('myskills') ? (
                  <Suspense fallback={tabFallback}>
                    <Skills selected={skills} onChange={setSkills} race={race} />
                  </Suspense>
                ) : null}
              </TabsContent>
            </Tabs>
          </div>

          {/* Build Summary Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={tabFallback}>
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
                buildExplanation={buildExplanation}
                onBuildExplanationChange={setBuildExplanation}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
