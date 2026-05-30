import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const RARITY_STYLES = {
  Common: 'bg-zinc-800 text-gray-300 border-zinc-600',
  Uncommon: 'bg-green-950/60 text-green-300 border-green-800',
  Rare: 'bg-blue-950/60 text-blue-300 border-blue-800',
  Mythical: 'bg-purple-950/60 text-purple-300 border-purple-800',
  Unique: 'bg-yellow-950/60 text-yellow-300 border-yellow-800',
};

const CORE_POTENTIALS = [
  // Weapon Damage
  { id: 'whetstone', name: 'Whetstone', rarity: 'Common', category: 'Weapon Damage', description: '+1.5% Weapon Damage' },
  { id: 'copper_stone', name: 'Copper Sharpening Stone', rarity: 'Uncommon', category: 'Weapon Damage', description: '+3% Weapon Damage' },
  { id: 'iron_stone', name: 'Iron Sharpening Stone', rarity: 'Rare', category: 'Weapon Damage', description: '+5.25% Weapon Damage. Permanent weapon damage increase.' },
  // Detection
  { id: 'detection', name: 'Detection', rarity: 'Common', category: 'Detection', description: '+3 studs minimap detection, +1 perception' },
  { id: 'echolocation', name: 'Echolocation', rarity: 'Uncommon', category: 'Detection', description: '+5 studs detection (Outdated)' },
  { id: 'esp', name: 'ESP', rarity: 'Rare', category: 'Detection', description: '+8 studs detection, +3 perception' },
  // Health
  { id: 'cardio', name: 'Cardio', rarity: 'Common', category: 'Health', description: '+10 Max Health' },
  { id: 'vigor', name: 'Vigor', rarity: 'Uncommon', category: 'Health', description: '+15 Max Health' },
  { id: 'vitality', name: 'Vitality', rarity: 'Rare', category: 'Health', description: '+25 Max Health' },
  { id: 'troublemaker', name: 'Troublemaker', rarity: null, category: 'Health', description: '+5% Max Health, -2.5% Global Damage Dealt' },
  { id: 'agitator', name: 'Agitator', rarity: null, category: 'Health', description: '+10% Max Health, -5% Global Damage Dealt' },
  { id: 'instigator', name: 'Instigator', rarity: null, category: 'Health', description: '+15% Max Health, -7.5% Global Damage Dealt' },
  // Posture
  { id: 'proper_footing', name: 'Proper Footing', rarity: null, category: 'Posture', description: '+3% Max Posture (Shield required to roll)' },
  { id: 'strong_back', name: 'Strong Back', rarity: null, category: 'Posture', description: '+7.5% Max Posture (Shield required to roll)' },
  { id: 'firm_stance', name: 'Firm Stance', rarity: null, category: 'Posture', description: '+10% Max Posture (Shield required to roll)' },
  { id: 'bastion', name: 'Bastion', rarity: null, category: 'Posture', description: 'Parry while Rooted removes root, pushes enemy back, 0.25s stun (0.5s maxed).' },
  // Combat
  { id: 'iron_spike', name: 'Iron Spike', rarity: null, category: 'Combat', description: '+1% Armor Penetration. If your Armor Pen > enemy Armor %, they take more damage.' },
  { id: 'weak_point', name: 'Weak Point', rarity: null, category: 'Combat', description: '+5% Critical Strike Damage' },
  { id: 'soft_spot', name: 'Soft Spot', rarity: null, category: 'Combat', description: '+1% Critical Strike Chance' },
  { id: 'garrote_vil', name: 'Garrote Vil', rarity: null, category: 'Combat', description: '+10% Backstab Damage' },
  { id: 'iron_soul', name: 'Iron Soul', rarity: null, category: 'Combat', description: '10% damage reduction when below 20% HP.' },
  { id: 'surprise_attack', name: 'Surprise Attack', rarity: null, category: 'Combat', description: 'Heavy attack during enemy attack → +5% damage + 0.15s stun. Up to 25% damage + 0.75s stun maxed.' },
  { id: 'chase', name: 'Chase', rarity: null, category: 'Combat', description: 'Running attack on recently dodged enemy → +2.5% crit chance (5s). Up to 12.5% maxed.' },
  { id: 'choreography', name: 'Choreography', rarity: null, category: 'Combat', description: 'M1 while fighting 2+ enemies → +5% armor, +10% attack speed (5s).' },
  { id: 'reaping_blow', name: 'Reaping Blow', rarity: null, category: 'Combat', description: 'Heavy kill = 10s invincibility. -10% permanent Max Health.' },
  { id: 'devil_pact', name: "Devil's Pact", rarity: null, category: 'Combat', description: '+15% damage to bosses, -7% damage to regular enemies.' },
  { id: 'elemental_leech', name: 'Elemental Leech', rarity: null, category: 'Combat', description: 'Heavy attack consumes debuffs → heal 0.2% max HP per stack.' },
  { id: 'intimidation', name: 'Intimidation', rarity: null, category: 'Combat', description: 'Fighting enemy for 20s → they deal 10% less, take 5% more, randomly attempt parries.' },
  // Mana
  { id: 'clashing_mana', name: 'Clashing Mana', rarity: null, category: 'Mana', description: 'Parrying gives +1 extra mana (base 2 → now 4 total).' },
  { id: 'arcana_absorption', name: 'Arcana Absorption', rarity: null, category: 'Mana', description: 'Killing an enemy grants 2.5 Mana.' },
  { id: 'mana_armor', name: 'Mana Armor', rarity: null, category: 'Mana', description: '15% damage reduction for 5 hits. Regens after 15s, costs 1 mana/sec.' },
  { id: 'aegis_plating', name: 'Aegis Plating', rarity: 'Mythical', category: 'Mana', description: 'Double hits required for Mana Armor, 20s regen.' },
  { id: 'reinforced_plating', name: 'Reinforced Plating', rarity: 'Unique', category: 'Mana', description: '50% reduction + absorbs 1 full hit on depletion.' },
  { id: 'mana_juggle', name: 'Mana Juggle', rarity: null, category: 'Mana', description: 'Parry within 0.75s of skill → refund 50% mana spent.' },
  { id: 'mana_stabilization', name: 'Mana Stabilization', rarity: null, category: 'Mana', description: 'Fatal blow above 75% mana → convert mana to HP (1% HP per 10% mana). No mana regen for 60s.' },
  { id: 'mana_leech', name: 'Mana Leech', rarity: null, category: 'Mana', description: 'Skill after parry costs 10% less mana. Up to 40% reduction maxed.' },
  { id: 'methods_magic', name: 'Methods of Magic', rarity: null, category: 'Mana', description: 'Share scaling between elements. -15% total elemental damage (-30% if sharing two).' },
  // Regeneration
  { id: 'vampirism', name: 'Vampirism', rarity: null, category: 'Regeneration', description: 'Heal for 2% of damage dealt.' },
  { id: 'mending', name: 'Mending', rarity: null, category: 'Regeneration', description: '+15% regeneration per tick.' },
  { id: 'recovery', name: 'Recovery', rarity: null, category: 'Regeneration', description: '+15% more regen (30% total).' },
  { id: 'recuperate', name: 'Recuperate', rarity: null, category: 'Regeneration', description: '+15% again (1.45x total regen).' },
  { id: 'well_fed', name: 'Well Fed', rarity: null, category: 'Regeneration', description: 'Eating food → +5% HP & mana regen (10s). Up to 20% maxed.' },
  { id: 'death_absorption', name: "Death's Absorption", rarity: null, category: 'Regeneration', description: 'Enemy slain nearby → extra regen (~0.125%) for 10s.' },
  { id: 'persist', name: 'Persist', rarity: null, category: 'Regeneration', description: 'Crit while below 50% HP → heal 1% (5s CD). Up to 3% maxed.' },
  // Survival
  { id: 'nerves_of_steel', name: 'Nerves of Steel', rarity: null, category: 'Survival', description: 'Stun duration reduced by 0.05s (up to 0.5s).' },
  { id: 'final_stand', name: 'Final Stand', rarity: null, category: 'Survival', description: 'At 5% HP → 5 seconds invincible. 1 dungeon cooldown.' },
  { id: 'hands_up', name: 'Hands Up', rarity: null, category: 'Survival', description: 'Parry on cooldown → -5% damage taken. Up to 20% maxed.' },
  { id: 'self_conductor', name: 'Self-Conductor', rarity: null, category: 'Survival', description: 'Starting a cast shocks nearby enemies (0.5s stun, ~10% M1 damage as Lightning).' },
  { id: 'phoenix_incarnate', name: 'Phoenix Incarnate', rarity: null, category: 'Survival', description: 'When slain, revive to 100% HP. Consumed on use. Only one instance allowed at a time.' },
  { id: 'phylactery', name: 'Phylactery', rarity: null, category: 'Survival', description: "Gain back one lost life. Can't roll at 3 lives or with one-life sin." },
  // Mobility
  { id: 'swift_strides', name: 'Swift Strides', rarity: null, category: 'Mobility', description: '+1 Walkspeed' },
  { id: 'swifter_strides', name: 'Swifter Strides', rarity: null, category: 'Mobility', description: '+1 Walkspeed, -2.5% Max Health. May require Swift Strides first.' },
  { id: 'acrobatics', name: 'Acrobatics', rarity: null, category: 'Mobility', description: 'Jump after roll → flip for extra distance. Timing inconsistent.' },
  { id: 'feather_dancer', name: 'Feather Dancer', rarity: null, category: 'Mobility', description: 'Successful dodge reduces roll cooldown by 1 second. Base roll CD: 4s.' },
  { id: 'terrifying_presence', name: 'Terrifying Presence', rarity: null, category: 'Mobility', description: 'Enemy detection radius reduced by 1 stud.' },
  // Utility
  { id: 'victory_celebration', name: 'Victory Celebration', rarity: null, category: 'Utility', description: 'Clearing a room: 50% CDR, +20% Armor for 30 seconds.' },
  { id: 'good_times', name: 'Good Times', rarity: null, category: 'Utility', description: 'Every 3 rooms cleared: +30% Mythical & Unique potential chance. Stacks, resets per layer.' },
  { id: 'mysterious_attractor', name: 'Mysterious Attractor', rarity: null, category: 'Utility', description: 'No Event Portal for 5 rooms → free one granted. (Currently bugged.)' },
  { id: 'relief', name: 'Relief', rarity: null, category: 'Utility', description: 'Room clear → +10% HP and +3 Mana.' },
  { id: 'to_take_give', name: 'To Take and Give', rarity: null, category: 'Utility', description: 'For each temporary buff active → +1% weapon damage, armor, mana regen.' },
  { id: 'arsenal', name: 'Arsenal', rarity: null, category: 'Utility', description: 'Weapon hit → next skill gives +1 Mana. Up to +5 maxed.' },
  // Casting
  { id: 'counter_art', name: 'Counter Art', rarity: null, category: 'Casting', description: 'Parry → +10% casting speed next spell. Up to 30% maxed.' },
  { id: 'physical_exertion', name: 'Physical Exertion', rarity: null, category: 'Casting', description: 'Cast without enough mana → cost paid in HP (1% per missing mana). 20s cooldown.' },
  { id: 'refund', name: 'Refund', rarity: null, category: 'Casting', description: 'Spell cancelled on windup → refund 10% mana. Up to 50% maxed.' },
  // Economy
  { id: 'negotiation', name: 'Negotiation', rarity: null, category: 'Economy', description: 'Items 5% cheaper (15% max). Locks out Bargain.' },
  { id: 'bargain', name: 'Bargain', rarity: null, category: 'Economy', description: 'Sell items for +15% gold. Locks out Negotiation.' },
  { id: 'bartering', name: 'Bartering', rarity: null, category: 'Economy', description: 'Selling item → next purchase 5% cheaper (up to 15%). Buying resets discount.' },
  // Defense
  { id: 'basics_defense', name: 'Basics of Defense', rarity: null, category: 'Defense', description: '2 parries in 5s → reduce Parry & Dodge cooldowns (5s).' },
  { id: 'methods_defense', name: 'Methods of Defense', rarity: null, category: 'Defense', description: 'Dodge after parry → procs all "On Dodge" effects.' },
  { id: 'mastery_defense', name: 'Mastery of Defense', rarity: null, category: 'Defense', description: 'Successful dodges count as parries. Can trigger parry-related effects.' },
];

const CATEGORIES = [...new Set(CORE_POTENTIALS.map(p => p.category))];

export default function PotentialsPanel({ selected, onSelect }) {
  const [search, setSearch] = useState('');

  const handleToggle = (id) => {
    if (selected.includes(id)) {
      onSelect(selected.filter(s => s !== id));
    } else {
      onSelect([...selected, id]);
    }
  };

  const filtered = search.trim()
    ? CORE_POTENTIALS.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  const displayCategories = filtered
    ? [...new Set(filtered.map(p => p.category))]
    : CATEGORIES;

  const getPotentials = (cat) =>
    (filtered || CORE_POTENTIALS).filter(p => p.category === cat);

  return (
    <Card className="bg-zinc-900/50 border-gray-700">
      <CardHeader className="border-b border-gray-700">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Core Potentials</CardTitle>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            {selected.length} Selected
          </Badge>
        </div>
        <div className="mt-3 rounded p-3 text-xs" style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', color: '#ca8a04' }}>
          <span style={{ fontWeight: 700 }}>⚠ Dev Note: </span>
          Core Potentials are not required for the build planner — the dev hasn't gotten around to it yet. Feel free to skip this section entirely.
        </div>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search potentials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-black/50 border-gray-700 text-white placeholder:text-gray-600 pl-9"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-5 space-y-6">
        {displayCategories.map(cat => {
          const potentials = getPotentials(cat);
          if (!potentials.length) return null;
          return (
            <div key={cat}>
              <h3 className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
                <div className="w-4 h-px bg-gray-700" />
                {cat}
                <div className="flex-1 h-px bg-gray-700" />
              </h3>
              <div className="space-y-1.5">
                {potentials.map(p => {
                  const isSelected = selected.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      className={`rounded-lg px-4 py-3 border transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-white/5 border-gray-500'
                          : 'bg-black/30 border-gray-800 hover:border-gray-600'
                      }`}
                      onClick={() => handleToggle(p.id)}
                    >
                      {/* Custom checkbox */}
                      <div className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected ? 'bg-white border-white' : 'bg-transparent border-gray-600'
                      }`}>
                        {isSelected && (
                          <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white text-sm font-medium">{p.name}</span>
                          {p.rarity && (
                            <Badge className={`text-xs border ${RARITY_STYLES[p.rarity]}`}>
                              {p.rarity}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{p.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {filtered && filtered.length === 0 && (
          <p className="text-gray-600 text-sm text-center py-8">No potentials found.</p>
        )}
      </CardContent>
    </Card>
  );
}