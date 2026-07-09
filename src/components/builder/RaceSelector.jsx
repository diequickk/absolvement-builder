import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RACES = [
  {
    id: "aranae",
    name: "Aranae",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/4588dff50_image_2026-03-16_100328473.png",
    description: "Racial Skill: Spit out a congealed web, rooting an enemy for 5 seconds and dealing 3.5 damage.",
    bonuses: ["+10% Attack Speed", "+2.5% Critical Strike Chance", "Poison, Blood Plague, and Bleed effects deal 10% more damage", "Backstabs deal 5% more damage", "+5 Perception"],
    debuffs: ["Stuns last 25% longer", "+8% Damage Taken"],
  },
  {
    id: "calvar",
    name: "Calvar",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/222f2bd9a_image_2026-03-16_100351073.png",
    description: "Racial Skill: Self-destruct, dealing 18 damage to all nearby enemies, aggroing them to you during your windup.",
    bonuses: ["Cannot die from environmental effects, but can still be damaged by them", "Heal 10% max health on kill", "Hitstun applied to you is 10% shorter", "+33% starting health", "+15% maximum health"],
    debuffs: ["70% Less Healing", "No Health Regeneration"],
  },
  {
    id: "cragg",
    name: "Cragg",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/3292e0e18_image_2026-03-16_100358356.png",
    description: "Racial Skill: Charge forward, granting hyperarmor until hitting an enemy for 15 damage or crashing into an obstacle.",
    bonuses: ["Enrage on double stun within 10s removes temporary debuffs and grants +10% damage for 10s", "5% of all damage bypasses enemy shields", "+12.5% Max Health"],
    debuffs: ["-15 Max Mana", "-15% Walk Speed"],
  },
  {
    id: "facadae",
    name: "Facadae",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/b36d4ffca_image_2026-03-16_100405756.png",
    description: "Racial Skill: Imitate a random ally race buff (excluding racial skill/core); if no ally is present, the buff is randomized.",
    bonuses: ["Consecutive hits of the same element form resistance up to 50%", "+15% support buff durations", "+10 Max Mana", "+7.5% Healing Effectiveness"],
    debuffs: ["Taking damage from a new element causes 10% more damage taken", "-10% Max Health", "+10% Longer Cooldowns"],
  },
  {
    id: "feriun",
    name: "Feriun",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/09fef3161_image_2026-03-16_100412106.png",
    description: "Racial Skill: Rip off a horn, sacrificing one-third of current health to gain +30% total damage for 22 seconds.",
    bonuses: ["Note: Spells are skills with a casting hand animation (e.g., Cataclysm, Everwinter)", "Spell casts are up to 21% faster at lower health", "All spells cost 9% less (minimum 1 mana)", "All spells cast 9% faster", "All casted spells deal 9% more damage"],
    debuffs: ["-15% Non-Spell Damage"],
  },
  {
    id: "gelidium",
    name: "Gelidium",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/27807320b_image_2026-03-16_100419772.png",
    description: "Racial Skill: While slime is active, enemies that melee strike you are temporarily disarmed.",
    bonuses: ["Weapon hits make enemies take 5% more damage and move 15% slower for 2s", "Stuns applied to you are 25% shorter", "All DoT damage applied to you is reduced by 10%", "Potions and consumables last 20% longer", "Being critically struck increases your regeneration by 20% for 3s"],
    debuffs: ["+7.5% Fire/Frost Damage Taken", "-7.5% Damage Dealt"],
  },
  {
    id: "harmonite",
    name: "Harmonite",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/c82dad918_image_2026-03-16_100427573.png",
    description: "Racial Skill: None",
    bonuses: ["+25% Potential Choice", "+15% EXP Gain", "+15% Gold Gain"],
    debuffs: [],
  },
  {
    id: "katiyr",
    name: "Katiyr",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/a6e94ebbe_image_2026-03-16_100437539.png",
    description: "Racial Skill: Automatically dodge the next applicable attack; on success, gain all 3 dodge racial stacks.",
    bonuses: ["Successful dodges grant +1.5% crit chance for 6s, stacking up to 3", "+15% Walkspeed", "Roll cooldown decreased by 20%"],
    debuffs: ["+10% Damage Near 2+ Enemies", "+10% Water/Disease Damage Taken"],
  },
  {
    id: "kixxm",
    name: "Kix'xm",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/1dbea2aa0_image_2026-03-16_100447122.png",
    description: "Racial Skill: Summon a mana-rose, granting +18% mana regeneration to you and nearby allies for 10 seconds.",
    bonuses: ["Immune to ragdolls and knockback while standing still", "Nature/Wind/Water/Earth spells heal based on skill cost on successful cast", "+15% Mana Regeneration"],
    debuffs: ["-10% Health Regen", "+20% Debuff Duration", "+10% Debuff Damage"],
  },
  {
    id: "voidtouched",
    name: "Voidtouched",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/f55ea0426_image_2026-03-16_100457739.png",
    description: "Racial Skill: Create a nullification field for 12s that prevents enemy spell casting and doubles your mana leech while inside.",
    bonuses: ["All weapon attacks and parries steal 1 mana", "Deal 20% more damage when critically striking an enemy"],
    debuffs: ["-15% Max Health", "-20 Max Mana", "-25% Mana Regen"],
  },
  {
    id: "nespin",
    name: "Nespin",
    icon: "https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/2ec0911d9_color-replaced1.png",
    description: "Racial Skill: Emit a supersonic screech, highlighting enemies within 200 studs for 10s and dealing 1.5 physical damage within 25 studs.",
    bonuses: ["Can jump twice every 2s out of combat and every 5s in combat", "Dashes replace rolls and can evade while casting or using light attacks", "Leeches 2% of all damage dealt as health"],
    debuffs: ["-12.5% Dash i-frames", "+12.5% Dash Cooldown", "Cannot Cancel Dash"],
  }
];

export default function RaceSelector({ selected, onSelect }) {
  return (
    <div className="space-y-4">
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
                    loading="lazy"
                    decoding="async"
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
                        <div
                          className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                          style={{ color: '#991b1b' }}
                        >
                          Debuffs
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {race.debuffs.map((debuff, idx) => (
                            <Badge
                              key={`debuff-${idx}`}
                              variant="secondary"
                              className="text-xs"
                              style={{
                                border: '1px solid rgba(69, 10, 10, 0.9)',
                                background: '#1b0507',
                                color: '#f87171',
                                boxShadow: 'inset 0 0 0 1px rgba(69,10,10,0.65)',
                              }}
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