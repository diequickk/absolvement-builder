import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, X, Search, ChevronDown, ChevronUp, Plus, Check } from "lucide-react";
import { SKILLS, SKILL_ELEMENTS } from "./skillsData";

const RACE_SKILLS = {
  aranae: { name: 'Web Snare', description: 'Entangle an enemy in webs, preventing dodging and slowing them for 3 seconds.' },
  calvar: { name: 'Detonation', description: 'Trigger an internal explosion dealing AoE damage around you.' },
  cragg: { name: 'Stone Charge', description: 'Charge forward with immense force, knocking back all enemies in your path.' },
  facadae: { name: 'Mimic Form', description: "Temporarily copy a nearby enemy's appearance and basic stats." },
  feriun: { name: 'Blood Sacrifice', description: 'Sacrifice a portion of your HP to greatly empower your next spell cast.' },
  gelidium: { name: 'Slime Coat', description: 'Coat yourself in slime, reducing stun durations and slowing nearby enemies.' },
  katiyr: { name: 'Blur Step', description: 'Perform rapid evasive steps, briefly phasing through incoming attacks.' },
  kixxm: { name: "Nature's Grasp", description: 'Root all nearby enemies with vines for 2 seconds, dealing nature damage.' },
  voidtouched: { name: 'Void Pulse', description: 'Emit a burst of void energy, draining mana from nearby enemies and silencing them.' },
  nespin: { name: 'Surge Dash', description: 'Perform an explosive multi-directional dash, dealing damage to enemies you pass through.' },
};

const RARITY_COLORS = {
  Common: 'bg-gray-700 text-gray-300',
  Uncommon: 'bg-green-900/60 text-green-300',
  Rare: 'bg-blue-900/60 text-blue-300',
  Unique: 'bg-purple-900/60 text-purple-300',
  Mythical: 'bg-yellow-900/60 text-yellow-300',
  Advanced: 'bg-orange-900/60 text-orange-300',
  Intermediate: 'bg-cyan-900/60 text-cyan-300',
};

const ELEMENT_COLORS = {
  Physical: 'bg-zinc-700 text-zinc-200',
  Fire: 'bg-red-900/60 text-red-300',
  Frost: 'bg-cyan-900/60 text-cyan-300',
  Shadow: 'bg-purple-900/60 text-purple-300',
  Lightning: 'bg-yellow-900/60 text-yellow-300',
  Wind: 'bg-teal-900/60 text-teal-300',
  Water: 'bg-blue-900/60 text-blue-300',
  Nature: 'bg-green-900/60 text-green-300',
  Disease: 'bg-lime-900/60 text-lime-300',
  Holy: 'bg-amber-900/60 text-amber-300',
  Earth: 'bg-orange-900/60 text-orange-300',
  Arcane: 'bg-fuchsia-900/60 text-fuchsia-300',
  Hybrid: 'bg-rose-900/60 text-rose-300',
};

const TIER_ORDER = ['Basic', 'Intermediate', 'Advanced', 'Masterful', 'Support', 'Special', 'Legendary'];

function SkillCard({ skill, isSelected, onToggle }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded border transition-all ${
        isSelected
          ? 'border-white/30 bg-white/5'
          : 'border-gray-800 bg-black/30 hover:border-gray-600'
      }`}
    >
      <div
        className="flex items-start gap-3 p-3 cursor-pointer"
        onClick={() => onToggle(skill)}
      >
        <div className={`mt-0.5 w-5 h-5 rounded-sm border flex-shrink-0 flex items-center justify-center transition-all ${
          isSelected ? 'bg-white/20 border-white/50' : 'border-gray-600'
        }`}>
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className="text-white text-sm font-medium">{skill.name}</span>
            {skill.tag && (
              <Badge className="text-[10px] px-1 py-0 bg-zinc-700 text-zinc-300">{skill.tag}</Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-1 mb-1.5">
            <Badge className={`text-[10px] px-1.5 py-0 ${ELEMENT_COLORS[skill.element] || 'bg-zinc-700 text-zinc-300'}`}>
              {skill.element}
            </Badge>
            <Badge className="text-[10px] px-1.5 py-0 bg-zinc-800 text-zinc-400">
              {skill.tier}
            </Badge>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{skill.description}</p>
        </div>
        {skill.upgrades.length > 0 && (
          <button
            className="text-gray-500 hover:text-gray-300 flex-shrink-0 mt-0.5"
            onClick={(e) => { e.stopPropagation(); setExpanded(v => !v); }}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {expanded && skill.upgrades.length > 0 && (
        <div className="px-3 pb-3 space-y-1.5 border-t border-gray-800 pt-2">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Upgrade Potentials</p>
          {skill.upgrades.map((upg, i) => (
            <div key={i} className="flex items-start gap-2">
              <Badge className={`text-[9px] px-1.5 py-0 flex-shrink-0 mt-0.5 ${RARITY_COLORS[upg.rarity] || 'bg-zinc-700 text-zinc-400'}`}>
                {upg.rarity}
              </Badge>
              <div>
                <span className="text-gray-300 text-xs font-medium">{upg.name}</span>
                {upg.locks && upg.locks.length > 0 && (
                  <span className="text-red-400 text-[10px] ml-1">(locks: {upg.locks.join(', ')})</span>
                )}
                <p className="text-gray-500 text-[11px]">{upg.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Skills({ selected, onChange, race }) {
  const raceSkill = race ? RACE_SKILLS[race] : null;
  const MAX_SKILLS = 9;
  const raceSlotCount = raceSkill ? 1 : 0;
  const freeSlots = MAX_SKILLS - raceSlotCount;

  const [search, setSearch] = useState('');
  const [elementFilter, setElementFilter] = useState('All');

  // selected is an array of skill IDs
  const selectedIds = useMemo(() => new Set(selected || []), [selected]);

  const handleToggle = (skill) => {
    const current = selected || [];
    if (selectedIds.has(skill.id)) {
      onChange(current.filter(id => id !== skill.id));
    } else {
      if (current.length >= freeSlots) return;
      onChange([...current, skill.id]);
    }
  };

  const filteredSkills = useMemo(() => {
    const q = search.toLowerCase().trim();
    return SKILLS.filter(s => {
      const matchesElement = elementFilter === 'All' || s.element === elementFilter;
      const matchesSearch = !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.element.toLowerCase().includes(q) ||
        s.upgrades.some(u => u.name.toLowerCase().includes(q));
      return matchesElement && matchesSearch;
    });
  }, [search, elementFilter]);

  // Group by element then tier
  const grouped = useMemo(() => {
    const map = {};
    filteredSkills.forEach(s => {
      if (!map[s.element]) map[s.element] = {};
      if (!map[s.element][s.tier]) map[s.element][s.tier] = [];
      map[s.element][s.tier].push(s);
    });
    return map;
  }, [filteredSkills]);

  const selectedSkills = SKILLS.filter(s => selectedIds.has(s.id));
  const totalUsed = selectedSkills.length + raceSlotCount;

  return (
    <div className="space-y-4">
      {/* Dev Note */}
      <div className="rounded p-3 text-xs" style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', color: '#ca8a04' }}>
        <span style={{ fontWeight: 700 }}>⚠ Dev Note: </span>
        There are skill interactions between certain elements that are not fully documented here. The list is also incomplete — the game is still adding more skills and interactions regularly.
      </div>
      {/* Selected skills summary */}
      <Card style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(200,200,208,0.15)' }}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-sm" style={{ fontFamily: 'Cinzel, serif' }}>
              Selected Skills
            </CardTitle>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              {totalUsed} / {MAX_SKILLS}
            </Badge>
          </div>
          {raceSkill && (
            <div className="flex items-center gap-2 mt-2 bg-zinc-800/50 border border-gray-700 rounded p-2">
              <Lock className="w-3 h-3 text-gray-500 flex-shrink-0" />
              <div>
                <span className="text-gray-400 text-xs">{raceSkill.name}</span>
                <span className="text-gray-600 text-xs ml-2">(Racial — auto)</span>
              </div>
            </div>
          )}
        </CardHeader>
        {selectedSkills.length > 0 && (
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-1.5">
              {selectedSkills.map(s => (
                <div key={s.id} className="flex items-center gap-1 bg-zinc-800 border border-gray-700 rounded px-2 py-1">
                  <span className="text-white text-xs">{s.name}</span>
                  <button onClick={() => handleToggle(s)} className="text-gray-500 hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Filters */}
      <Card style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(200,200,208,0.15)' }}>
        <CardContent className="pt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search skills..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-black/50 border-gray-700 text-white placeholder:text-gray-600"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['All', ...SKILL_ELEMENTS].map(el => (
              <button
                key={el}
                onClick={() => setElementFilter(el)}
                className={`text-xs px-2 py-1 rounded border transition-all ${
                  elementFilter === el
                    ? 'border-white/30 bg-white/10 text-white'
                    : 'border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
                }`}
                style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}
              >
                {el}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill list */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([element, tiers]) => (
          <div key={element}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-800" />
              <Badge className={`text-xs ${ELEMENT_COLORS[element] || 'bg-zinc-700 text-zinc-300'}`}>
                {element}
              </Badge>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-800" />
            </div>
            <div className="space-y-4">
              {TIER_ORDER.filter(t => tiers[t]).map(tier => (
                <div key={tier}>
                  <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-2 pl-1">
                    {tier}
                  </p>
                  <div className="space-y-2">
                    {tiers[tier].map(skill => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        isSelected={selectedIds.has(skill.id)}
                        onToggle={handleToggle}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {filteredSkills.length === 0 && (
          <p className="text-gray-600 text-center py-8 text-sm">No skills match your search.</p>
        )}
      </div>
    </div>
  );
}