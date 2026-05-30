import React from 'react';
import { User, Sword, Flame, Sparkles, Zap, GitBranch, Shield, BookOpen } from "lucide-react";
import { SKILL_PATHS } from './skillsData';
import { SKILLS } from './skillsData';

const RACE_LABELS = {
  aranae: 'Aranae', calvar: 'Calvar', cragg: 'Cragg', facadae: 'Facadae',
  feriun: 'Feriun', gelidium: 'Gelidium', harmonite: 'Harmonite',
  katiyr: 'Katiyr', kixxm: "Kix'xm", voidtouched: 'Voidtouched', nespin: 'Nespin',
};

const WEAPON_LABELS = {
  floral_rapier: 'Floral Rapier', rotspike: 'Rotspike', ethereal_kris: 'Ethereal Kris',
  sealed_sword: 'Sealed Sword', flamelash: 'Flamelash', dragonmaw_pike: 'Dragonmaw Pike',
  frostwake_spear: 'Frostwake Spear', worshipper_spear: "Worshipper's Spear",
  bloodletter_katana: "Bloodletter's Katana", stormweaver: 'Stormweaver',
  drowned_scythe: 'Drowned Scythe', gravetender_scythe: "Gravetender's Scythe",
  hand_justice: 'Hand of Justice', justicar_greatsword: "Justicar's Greatsword",
  headtaker_greatsword: "Headtaker's Greatsword", stonebleeder_axe: 'Stonebleeder Greataxe',
  divine_plume: 'Divine Plume Scythe', zephyr_glaive: 'Zephyr Fang Glaive',
  cinderheart_maul: 'Cinderheart Maul', crystallized_katana: 'Crystallized Katana',
  final_rites: 'Final Rites Greataxe', black_ice: 'Black Ice Ravager Axe',
  silkwing_bow: 'Silkwing Bow', tidebreaker: 'Tidebreaker Cutlass',
};

const Divider = () => (
  <div className="flex items-center gap-2 my-1">
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,200,208,0.15))' }} />
    <div className="w-1 h-1 rotate-45" style={{ background: 'rgba(200,200,208,0.3)' }} />
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(200,200,208,0.15), transparent)' }} />
  </div>
);

const SectionLabel = ({ icon: Icon, label }) => (
  <p className="flex items-center gap-1.5 mb-2" style={{ color: '#888898', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Cinzel, serif' }}>
    <Icon className="w-3 h-3" />
    {label}
  </p>
);

const EmptyVal = ({ text = 'None' }) => (
  <span style={{ color: '#383838', fontStyle: 'italic', fontSize: '0.72rem' }}>{text}</span>
);

const Tag = ({ children, color }) => (
  <span
    className="inline-block px-1.5 py-0.5 text-xs"
    style={{
      background: color ? `${color}18` : 'rgba(200,200,208,0.07)',
      border: `1px solid ${color ? `${color}40` : 'rgba(200,200,208,0.18)'}`,
      color: color || '#c8c8d0',
      fontSize: '0.68rem',
    }}
  >
    {children}
  </span>
);

// Build a node map from SKILL_PATHS for SP lookup
const buildNodeMap = () => {
  const map = {};
  for (const path of SKILL_PATHS) {
    for (const node of path.nodes) map[node.id] = { ...node, pathName: path.name, pathColor: path.color };
    if (path.subs) {
      for (const sub of path.subs) {
        for (const node of sub.nodes) map[node.id] = { ...node, pathName: sub.name, pathColor: sub.color || path.color };
      }
    }
  }
  return map;
};
const NODE_MAP = buildNodeMap();

// Skill lookup
const SKILL_MAP = {};
for (const s of SKILLS) SKILL_MAP[s.id] = s;

export default function BuildSummary({ buildName, race, weapon, sins, relics, skillTree, skills, potentials }) {
  const activeSins = Object.keys(sins || {}).filter(k => sins[k]?.active);
  const totalSinPoints = activeSins.length;
  const fragmentBonus = totalSinPoints * 12;

  // Soul Tree
  const activeNodes = Object.keys(skillTree || {}).filter(k => skillTree[k]);
  const spUsed = activeNodes.reduce((acc, id) => acc + (NODE_MAP[id]?.cost || 0), 0);
  const activeSoulPaths = [...new Set(activeNodes.map(id => NODE_MAP[id]?.pathName).filter(Boolean))];

  // Skills
  const selectedSkills = (skills || []).map(id => SKILL_MAP[id]).filter(Boolean);
  const MAX_SKILLS = 9;

  // Sins display (first 5 names)
  const sinNames = activeSins.filter(s => s !== 'abomination').slice(0, 4);
  const sinOverflow = activeSins.filter(s => s !== 'abomination').length - 4;
  const hasAbomination = sins?.abomination?.active;

  return (
    <div
      className="sticky top-6"
      style={{
        background: 'rgba(0,0,0,0.78)',
        border: '1px solid rgba(200,200,208,0.15)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3" style={{ borderBottom: '1px solid rgba(200,200,208,0.1)' }}>
        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.2em', color: '#c8c8d0', textTransform: 'uppercase' }}>
          Build Summary
        </h3>
        <p style={{ color: buildName ? '#e8e8f0' : '#333', fontStyle: buildName ? 'normal' : 'italic', fontSize: '0.85rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em', marginTop: '4px' }}>
          {buildName || 'Unnamed Build'}
        </p>
      </div>

      <div className="px-5 py-4 space-y-3.5">

        {/* Race & Weapon */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <SectionLabel icon={User} label="Race" />
            {race ? <Tag>{RACE_LABELS[race] || race}</Tag> : <EmptyVal />}
          </div>
          <div>
            <SectionLabel icon={Sword} label="Weapon" />
            {weapon ? <Tag>{WEAPON_LABELS[weapon] || weapon.replace(/_/g, ' ')}</Tag> : <EmptyVal />}
          </div>
        </div>

        <Divider />

        {/* Sins */}
        <div>
          <SectionLabel icon={Flame} label="Sins" />
          {totalSinPoints === 0 ? (
            <EmptyVal text="No sins selected" />
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-0.5" style={{ background: '#111' }}>
                  <div className="h-full transition-all" style={{ width: `${Math.min((totalSinPoints / 13) * 100, 100)}%`, background: 'linear-gradient(90deg, #7f1d1d, #ef4444)' }} />
                </div>
                <span style={{ color: '#ef4444', fontSize: '0.7rem', fontFamily: 'Cinzel, serif' }}>
                  +{fragmentBonus}% frags
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {hasAbomination && <Tag color="#ef4444">Abomination</Tag>}
                {sinNames.map(s => (
                  <Tag key={s} color="#dc2626">{s.charAt(0).toUpperCase() + s.slice(1)}</Tag>
                ))}
                {sinOverflow > 0 && <Tag color="#dc2626">+{sinOverflow} more</Tag>}
              </div>
            </div>
          )}
        </div>

        {/* Relics */}
        <div>
          <SectionLabel icon={Sparkles} label="Relics" />
          <div className="flex gap-1 mb-1.5">
            {[0, 1, 2].map(i => (
              <div key={i} className="flex-1 h-1" style={{
                background: i < (relics?.length || 0) ? 'rgba(200,200,208,0.6)' : 'rgba(200,200,208,0.08)',
                boxShadow: i < (relics?.length || 0) ? '0 0 4px rgba(255,255,255,0.2)' : 'none',
              }} />
            ))}
          </div>
          <span style={{ color: (relics?.length || 0) > 0 ? '#a0a0b0' : '#383838', fontSize: '0.68rem' }}>
            {relics?.length || 0} / 3 relics equipped
          </span>
        </div>

        <Divider />

        {/* Soul Tree */}
        <div>
          <SectionLabel icon={GitBranch} label="Soul Tree" />
          {spUsed === 0 ? (
            <EmptyVal text="No points allocated" />
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span style={{ color: '#e8e8f0', fontSize: '0.72rem', fontFamily: 'Cinzel, serif' }}>{spUsed} SP allocated</span>
                <span style={{ color: '#555', fontSize: '0.65rem' }}>{activeSoulPaths.length} path{activeSoulPaths.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="h-0.5" style={{ background: '#111' }}>
                <div className="h-full transition-all" style={{ width: `${Math.min((spUsed / 80) * 100, 100)}%`, background: 'linear-gradient(90deg, #7c3aed, #db2777)' }} />
              </div>
              {activeSoulPaths.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {activeSoulPaths.slice(0, 3).map(p => (
                    <Tag key={p} color="#a78bfa">{p.split(' - ')[0]}</Tag>
                  ))}
                  {activeSoulPaths.length > 3 && <Tag color="#a78bfa">+{activeSoulPaths.length - 3}</Tag>}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Skills */}
        <div>
          <SectionLabel icon={BookOpen} label="Skills" />
          {selectedSkills.length === 0 ? (
            <EmptyVal text="No skills selected" />
          ) : (
            <div className="space-y-1">
              <span style={{ color: '#a0a0b0', fontSize: '0.68rem' }}>{selectedSkills.length} / {MAX_SKILLS} slots used</span>
              <div className="flex flex-wrap gap-1">
                {selectedSkills.slice(0, 6).map(s => (
                  <Tag key={s.id} color="#64748b">{s.name}</Tag>
                ))}
                {selectedSkills.length > 6 && <Tag color="#64748b">+{selectedSkills.length - 6}</Tag>}
              </div>
            </div>
          )}
        </div>

        {/* Potentials */}
        <div>
          <SectionLabel icon={Zap} label="Core Potentials" />
          {(!potentials || potentials.length === 0) ? (
            <EmptyVal text="None selected" />
          ) : (
            <span style={{ color: '#a0a0b0', fontSize: '0.72rem' }}>{potentials.length} potential{potentials.length !== 1 ? 's' : ''} chosen</span>
          )}
        </div>

      </div>
    </div>
  );
}