import React, { useState } from 'react';
import OilBackground from './components/OilBackground';
import { gameAttributes, gameWeapons, gamePatchInfo } from './gameData';

// Import your custom panel sub-components
import RaceSelector from './components/builder/RaceSelector';
import WeaponSelector from './components/builder/WeaponSelector';
import RelicsSelector from './components/builder/RelicsSelector';
import SinsAllocator from './components/builder/SinsAllocator';
import Skills from './components/builder/Skills';
import SkillTree from './components/builder/SkillTree';
import PotentialsPanel from './components/builder/PotentialsPanel';
import BuildSummary from './components/builder/BuildSummary';

export default function BuildCalculator() {
  // 1. Track which navigation tab is open (Race, Weapon, Sins, Relics, etc.)
  const [activeTab, setActiveTab] = useState('race');

  // 2. State to track the player's choices across the builder panels
  const [buildName, setBuildName] = useState('');
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [allocatedSins, setAllocatedSins] = useState({ strength: 10, agility: 10, intellect: 10 });
  const [selectedRelics, setSelectedRelics] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  return (
    <div className="min-height-screen text-white relative font-sans select-none overflow-x-hidden">
      {/* 🌌 Your beautiful, dark animated custom oil background container */}
      <OilBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        
        {/* 👑 Top Main Title Banner Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-widest text-shadow-lg mb-2">
            ABSOLVEMENT
          </h1>
<p className="text-xs tracking-widest text-gray-400 uppercase">
  Build Planner • {gamePatchInfo?.currentPatch ? gamePatchInfo.currentPatch.toUpperCase() : 'V1.0.0'}
</p>
        </header>

        {/* 🛠️ Top Bar: Build Name Input & Save Utility Action Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/40 border border-white/10 p-4 rounded-xl backdrop-blur-md mb-6">
          <input 
            type="text" 
            placeholder="ENTER BUILD NAME..." 
            value={buildName}
            onChange={(e) => setBuildName(e.target.value)}
            className="w-full sm:w-80 bg-black/60 border border-white/10 px-4 py-2 rounded-lg text-sm tracking-wide focus:outline-none focus:border-white/30 text-white placeholder-gray-600"
          />
          <button className="bg-white text-black font-bold text-xs tracking-wider px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-all shadow-md uppercase">
            Save Build
          </button>
        </div>

        {/* 🗺️ Main 2-Column Dashboard Work Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT 2 COLUMNS: Tabs Nav & Interactive Card Content Grid Panels */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Horizontal Tabs Selection Navigation Ribbon Bar */}
            <nav className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
              {['race', 'weapon', 'sins', 'relics', 'skills', 'skill tree', 'potentials'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-black shadow-lg scale-105' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* Dynamic Content Panel View Swapper Router Conditional Guard */}
            <main className="bg-black/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md min-h-[500px]">
              
              {/* Dev Disclaimer Banner Alert Box notice segment */}
              <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400/80 p-3 rounded-lg text-[11px] tracking-wide mb-6">
                ▲ Dev Note: Not all race information shown here is fully accurate. Some stats and descriptions may be outdated or incomplete.
              </div>

              {/* Dynamic Content Views Panel Elements Mapping */}
              {activeTab === 'race' && <RaceSelector onSelect={setSelectedRace} active={selectedRace} />}
              {activeTab === 'weapon' && <WeaponSelector selected={selectedWeapon} onSelect={setSelectedWeapon} />}
              {activeTab === 'sins' && <SinsAllocator onChange={setAllocatedSins} values={allocatedSins} />}
              {activeTab === 'relics' && <RelicsSelector onChange={setSelectedRelics} active={selectedRelics} />}
              {activeTab === 'skills' && <Skills onChange={setSelectedSkills} active={selectedSkills} />}
              {activeTab === 'skill tree' && <SkillTree />}
              {activeTab === 'potentials' && <PotentialsPanel />}

            </main>
          </div>

          {/* RIGHT 1 COLUMN: Sticky Final Build Summary Sidebar HUD Panel */}
          <aside className="bg-black/60 border border-white/15 p-6 rounded-2xl backdrop-blur-xl lg:sticky lg:top-8 shadow-2xl">
            <BuildSummary 
              buildName={buildName}
              race={selectedRace}
              weapon={selectedWeapon}
              sins={allocatedSins}
              relics={selectedRelics}
              skills={selectedSkills}
            />
          </aside>

        </div>
      </div>
    </div>
  );
}
