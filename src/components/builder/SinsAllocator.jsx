import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skull, AlertTriangle } from "lucide-react";

const BASE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69876c0ef4cd9311dba841d5/";

const SINS = [
  {
    id: 'abomination',
    name: 'Abomination',
    icon: BASE + "db4b9de3e_image_2026-03-09_132709476.png",
    description: 'Afflicted with all sins and all burden debuffs.',
    effect: '+40% Soul Fragments',
    warning: 'You will die, a lot.',
    burden: null
  },
  {
    id: 'chance',
    name: 'Chance',
    icon: BASE + "89af8933e_image_2026-03-09_132703693.png",
    description: 'Excessive gambling caught up to you.',
    effect: '+40% Common/Uncommon chance',
    burden: 'Commons are now twice as likely'
  },
  {
    id: 'deceit',
    name: 'Deceit',
    icon: BASE + "636a2752c_image_2026-03-09_132657276.png",
    description: 'Nothing more than fake smiles and empty promises.',
    effect: 'Some potentials are decoys, enemies may be illusions',
    burden: 'All deceit chances doubled'
  },
  {
    id: 'deserter',
    name: 'Deserter',
    icon: BASE + "f20272f5e_image_2026-03-09_132610509.png",
    description: 'Fleeing from battle as a coward.',
    effect: 'Walkspeed decreases as HP lowers (up to -25%)',
    burden: 'Max reduction at 50% HP instead of 0%'
  },
  {
    id: 'gluttony',
    name: 'Gluttony',
    icon: BASE + "3c227c227_image_2026-03-09_132555793.png",
    description: 'Frivolous consumption and waste.',
    effect: 'Forced to consume item every 5min or take 20 damage',
    burden: 'Must eat twice as often'
  },
  {
    id: 'greed',
    name: 'Greed',
    icon: BASE + "010240423_image_2026-03-09_132637926.png",
    description: 'Always wanting more, never appreciating what you had.',
    effect: 'Must select highest rarity or lose 2% damage/armor per stack',
    burden: 'One less potential option'
  },
  {
    id: 'judgement',
    name: 'Judgement',
    icon: BASE + "402b0633b_image_2026-03-09_132651060.png",
    description: 'Caused innocents to face undeserved punishments.',
    effect: 'Important potential details are obscured',
    burden: 'ALL relevant information obscured'
  },
  {
    id: 'pride',
    name: 'Pride',
    icon: BASE + "7aba24992_image_2026-03-09_132604262.png",
    description: 'Refuse help from others due to superiority complex.',
    effect: 'Healing over 60% max HP grants Fragility debuff',
    burden: 'Fragility considers additional healing forms'
  },
  {
    id: 'pseudoprophecy',
    name: 'Pseudoprophecy',
    icon: BASE + "db2b584d8_image_2026-03-09_132600461.png",
    description: 'False prophet facing damnation.',
    effect: 'Permanently locked to one life',
    burden: null
  },
  {
    id: 'slaughterer',
    name: 'Slaughterer',
    icon: BASE + "7957a7b4d_image_2026-03-09_132615643.png",
    description: 'Thrive on the thrill of the kill.',
    effect: '-25% Regen, -10% Damage, -10% Walkspeed | Kill grants buffs',
    burden: 'Debuffs worsened by 50%, buff duration halved'
  },
  {
    id: 'sloth',
    name: 'Sloth',
    icon: BASE + "164e6674c_image_2026-03-09_132620326.png",
    description: 'Sluggish and easily outpaced.',
    effect: '-20% Attack Speed, -10% Walkspeed',
    burden: 'All cooldowns recover 10% slower'
  },
  {
    id: 'theft',
    name: 'Theft',
    icon: BASE + "ad3783eb6_image_2026-03-09_132454810.png",
    description: 'Quick pocketing leads to distrust.',
    effect: 'Prices doubled, 10% chance to be robbed',
    burden: '-10% Gold gain'
  },
  {
    id: 'wrath',
    name: 'Wrath',
    icon: BASE + "6e704ac80_image_2026-03-09_132632494.png",
    description: 'Resolve everything through violence.',
    effect: '+25% Damage taken from all sources',
    burden: '+20% additional damage taken'
  }
];

export default function SinsAllocator({ sins, onChange }) {
  const handleToggleSin = (sinId) => {
    const sin = SINS.find(s => s.id === sinId);

    if (sinId === 'abomination') {
      if (sins['abomination']?.active) {
        // Toggle off → clear everything
        onChange({});
      } else {
        // Toggle on → enable all sins with auto-burden
        const allSins = {};
        SINS.forEach(s => {
          allSins[s.id] = { active: true, burden: !!s.burden };
        });
        onChange(allSins);
      }
      return;
    }

    const newSins = { ...sins };
    if (newSins[sinId]?.active) {
      delete newSins[sinId];
    } else {
      // Auto-enable burden when picking a sin
      newSins[sinId] = { active: true, burden: !!sin?.burden };
    }
    onChange(newSins);
  };

  const activeSins = Object.keys(sins).filter(key => sins[key]?.active);
  const totalBonus = activeSins.length * 12;
  const hasAbomination = sins['abomination']?.active === true;

  return (
    <Card className="bg-zinc-900/50 border-gray-600">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700">
        <div>
          <CardTitle className="text-white flex items-center gap-2">
            <Skull className="w-5 h-5" />
            Sins Selection
          </CardTitle>
          <p className="text-gray-400 text-sm mt-1">
            Each sin adds +12% soul fragments on wipe. Picking a sin auto-enables its Burden.
          </p>
        </div>
        <div className="text-right">
          <div className="text-white font-bold text-lg">{activeSins.length} Active</div>
          <div className="text-gray-400 text-sm">+{totalBonus}% Fragments</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-6">
        {SINS.map((sin) => {
          const isActive = sins[sin.id]?.active === true;
          const hasBurden = sins[sin.id]?.burden === true;
          const isDisabled = hasAbomination && sin.id !== 'abomination';

          return (
            <div
              key={sin.id}
              className={`rounded-lg p-4 border-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-red-950/20 border-red-900/50 shadow-lg shadow-red-900/10'
                  : 'bg-black/50 border-gray-700 hover:border-gray-600'
              } ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
              onClick={() => !isDisabled && handleToggleSin(sin.id)}
            >
              <div className="flex items-start gap-3">
                {/* Sin icon */}
                {sin.icon && (
                  <img src={sin.icon} alt={sin.name} className="w-10 h-10 object-cover rounded flex-shrink-0" />
                )}
                {/* Custom checkbox */}
                <div className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  isActive ? 'bg-red-700 border-red-500' : 'bg-transparent border-gray-600'
                }`}>
                  {isActive && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-white font-bold">{sin.name}</h4>
                    <div className="flex gap-2">
                      {sin.id === 'abomination' && (
                        <Badge className="bg-red-950 text-red-300 border-red-900 text-xs">All Sins</Badge>
                      )}
                      {sin.warning && isActive && (
                        <Badge className="bg-red-950 text-red-300 border-red-900">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Warning
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{sin.description}</p>
                  <div className="bg-zinc-800/50 rounded px-3 py-1.5 text-xs text-gray-300 mb-2">
                    {sin.effect}
                  </div>
                  {sin.warning && (
                    <p className="text-red-400 text-xs mb-2 italic">{sin.warning}</p>
                  )}

                  {sin.burden && (
                    <div className={`mt-2 inline-flex items-center gap-2 rounded px-2.5 py-1 text-[11px] border ${isActive ? 'border-red-800/60 bg-red-950/30 text-red-300' : 'border-gray-700 bg-zinc-800/50 text-gray-400'}`}>
                      <span className="font-semibold uppercase tracking-[0.16em]">Burden</span>
                      <span>{sin.burden}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}