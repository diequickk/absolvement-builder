import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RACES = [
  {
    id: "aranae",
    name: "Aranae",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/4588dff50_image_2026-03-16_100328473.png",
    description: "Agile ambushers with web abilities and poison mastery",
    bonuses: ["+10% Attack Speed", "+2.5% Crit Chance", "+10% Poison/Bleed Damage", "+5% Backstab Damage"],
    debuffs: ["Stuns last 25% longer", "+8% Damage Taken"],
  },
  {
    id: "calvar",
    name: "Calvar",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/222f2bd9a_image_2026-03-16_100351073.png",
    description: "Explosive constructs with massive health pools",
    bonuses: ["+33% Starting Health", "+15% Max Health", "10% HP on Kill", "10% Shorter Hitstun"],
    debuffs: ["70% Less Healing", "No Health Regeneration"],
  },
  {
    id: "cragg",
    name: "Cragg",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/3292e0e18_image_2026-03-16_100358356.png",
    description: "Charging behemoths with shield penetration",
    bonuses: ["+12.5% Max Health", "5% Shield Bypass", "Enrage on Double Stun"],
    debuffs: ["-15 Max Mana", "-15% Walk Speed"],
  },
  {
    id: "facadae",
    name: "Facadae",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/b36d4ffca_image_2026-03-16_100405756.png",
    description: "Adaptive mimics with support capabilities",
    bonuses: ["+15% Support Duration", "+10 Max Mana", "+7.5% Healing Effectiveness", "Elemental Resistance"],
    debuffs: ["-10% Max Health", "+10% Longer Cooldowns"],
  },
  {
    id: "feriun",
    name: "Feriun",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/09fef3161_image_2026-03-16_100412106.png",
    description: "Spell-focused casters with sacrifice mechanics",
    bonuses: ["-9% Spell Cost", "+9% Cast Speed", "+9% Spell Damage"],
    debuffs: ["-15% Non-Spell Damage"],
  },
  {
    id: "gelidium",
    name: "Gelidium",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/27807320b_image_2026-03-16_100419772.png",
    description: "Slime creatures with disarm and debuff capabilities",
    bonuses: ["-25% Stun Duration", "-10% DoT Damage", "+20% Potion Duration", "+20% Regen When Crit"],
    debuffs: ["+7.5% Fire/Frost Damage Taken", "-7.5% Damage Dealt"],
  },
  {
    id: "harmonite",
    name: "Harmonite",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/c82dad918_image_2026-03-16_100427573.png",
    description: "Balanced race with potential and resource bonuses",
    bonuses: ["+25% Potential Choice", "+15% EXP Gain", "+15% Gold Gain"],
    debuffs: ["No Racial Skill"],
  },
  {
    id: "katiyr",
    name: "Katiyr",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/a6e94ebbe_image_2026-03-16_100437539.png",
    description: "Swift dodgers with mobility focus",
    bonuses: ["+15% Walk Speed", "-20% Roll Cooldown", "+1.5% Crit per Dodge Stack"],
    debuffs: ["+10% Damage Near 2+ Enemies", "+10% Water/Disease Damage Taken"],
  },
  {
    id: "kixxm",
    name: "Kix'xm",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/1dbea2aa0_image_2026-03-16_100447122.png",
    description: "Nature mages with mana regeneration",
    bonuses: ["+15% Mana Regen", "Immune to Ragdoll When Still", "Heal from Nature Spells"],
    debuffs: ["-10% Health Regen", "+20% Debuff Duration", "+10% Debuff Damage"],
  },
  {
    id: "voidtouched",
    name: "Voidtouched",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/f55ea0426_image_2026-03-16_100457739.png",
    description: "Void-corrupted beings with mana stealing",
    bonuses: ["1 Mana on Weapon Attacks", "+20% Crit Damage", "Nullification Field"],
    debuffs: ["-15% Max Health", "-20 Max Mana", "-25% Mana Regen"],
  },
  {
    id: "nespin",
    name: "Nespin",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/2ec0911d9_color-replaced1.png",
    description: "Agile dashers with lifesteal and mobility",
    bonuses: ["Double Jump", "Dash Instead of Roll", "2% Lifesteal"],
    debuffs: ["-12.5% Dash i-frames", "+12.5% Dash Cooldown", "Cannot Cancel Dash"],
  }
];

export default function RaceSelector({ selected, onSelect }) {
  return (
    <div className="space-y-4">
      <div className="rounded p-3 text-xs" style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', color: '#ca8a04' }}>
        <span style={{ fontWeight: 700 }}>⚠ Dev Note: </span>
        Not all race information shown here is fully accurate. Some stats and descriptions may be outdated or incomplete.
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {RACES.map((race) => {
        const isSelected = selected === race.id;

        return (
          <Card
            key={race.id}
            className={`cursor-pointer transition-all border-2 ${
              isSelected
                ? 'border-red-500/80 bg-zinc-950/95 shadow-[0_0_0_1px_rgba(248,113,113,0.25),0_12px_30px_rgba(127,29,29,0.35)]'
                : 'border-gray-600 bg-zinc-900/50 hover:border-gray-500'
            }`}
            onClick={() => onSelect(race.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-900 rounded-lg flex-shrink-0 flex items-center justify-center w-14 h-14 overflow-hidden border border-gray-700">
                  <img 
                    src={race.icon} 
                    alt={race.name} 
                    className="w-full h-full object-cover" 
                    style={{ filter: 'brightness(0.9) contrast(1.05)' }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{race.name}</h3>
                  <p className="text-slate-400 text-sm mb-3">{race.description}</p>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {race.bonuses.map((bonus, idx) => (
                        <Badge
                          key={`bonus-${idx}`}
                          variant="secondary"
                          className="bg-zinc-800/50 text-gray-200 text-xs"
                        >
                          {bonus}
                        </Badge>
                      ))}
                    </div>
                    {race.debuffs && race.debuffs.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-400/90">
                          Debuffs
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {race.debuffs.map((debuff, idx) => (
                            <Badge
                              key={`debuff-${idx}`}
                              variant="secondary"
                              className="border border-red-700/70 bg-red-950/80 text-red-200 text-xs shadow-[inset_0_0_0_1px_rgba(248,113,113,0.15)]"
                            >
                              {debuff}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
    </div>
  );
}