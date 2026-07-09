import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const RELICS = [
  { id: "abyssal_charm", name: "Abyssal Charm", labels: ["Buff"], description: "Skill cooldowns are reduced by 22.5%. Taking damage has a 7% chance to teleport you away and stun you for 1.5s." },
  { id: "amorian_sigil", name: "Amorian Sigil", labels: ["Support"], description: "When slain, 75% chance to be instantly resurrected. Once every 8 dungeons." },
  { id: "antidote", name: "Antidote", labels: ["Buff"], description: "Immune to all Poison damage and Floral Rot. 20% resistance to Nature." },
  { id: "aranae_eye", name: "Aranae Eye", labels: ["Buff"], description: "Vendors sell for 25% less. 25% chance for duplicate item below Relic rarity." },
  { id: "artifact_chance", name: "Artifact of Chance", labels: ["Buff", "Self Debuff"], description: "Mythical +300%, Unique +200%, Rare +100%, Uncommon +50% more common. One less potential option." },
  { id: "artifact_chaos", name: "Artifact of Chaos", labels: ["Buff", "Debuff", "Self Debuff"], description: "All debuffs applied to you and by you are randomized." },
  { id: "artifact_desertion", name: "Artifact of Desertion", labels: ["Buff", "Self Debuff"], description: "Immune to Slows below 50% health. +2.5% critical strike chance." },
  { id: "artifact_gluttony", name: "Artifact of Gluttony", labels: ["Support", "Buff"], description: "No longer bite yourself when gluttony strikes. All consumables are 35% more effective." },
  { id: "artifact_greed", name: "Artifact of Greed", labels: ["Stat Boost", "Buff", "Self Debuff"], description: "More gold = more damage (up to 33% at 700 gold). Lose 1-15 gold when damaged." },
  { id: "artifact_judgement", name: "Artifact of Judgement", labels: ["Support", "Buff"], description: "See enemy health bars. Fully reverts Judgement Sin." },
  { id: "artifact_pride", name: "Artifact of Pride", labels: ["Stat Boost", "Buff"], description: "Perfect runs increase Max HP and Armor by 0.25% per dungeon. Failures destroy the artifact." },
  { id: "artifact_slaughtering", name: "Artifact of Slaughtering", labels: ["Buff", "Self Debuff"], description: "+7.5 Walkspeed, +7.5% damage if killed half the layer. Otherwise -5 Walkspeed, -5% damage." },
  { id: "artifact_sloth", name: "Artifact of Sloth", labels: ["Buff"], description: "Sleep out of combat for better regeneration. Become groggy on waking." },
  { id: "artifact_wrath", name: "Artifact of Wrath", labels: ["Buff"], description: "Being parried increases damage by 1.25% for 8s (5 stacks). At 5, next skill has hyperarmor and bypasses parry." },
  { id: "bloodsage_pact", name: "Bloodsage Pact", labels: ["Buff", "Healing", "Self Debuff"], description: "Increases leech by 12.5%. 15% more vulnerable to Holy and Fire." },
  { id: "bloodsage_vial", name: "Bloodsage Vial", labels: ["Stat Boost", "Self Debuff"], description: "Increases Max Health by 125%. Skills consume health instead of mana. -20% M1 damage." },
  { id: "calvar_skull", name: "Calvar Skull", labels: ["Buff", "Disease"], description: "Immune to Rot. 30% resistance to Disease." },
  { id: "cragg_rock", name: "Cragg Rock", labels: ["Buff", "Defensive"], description: "Reduces all self-damage by 75%." },
  { id: "cryptstalker_medallion", name: "Cryptstalker Medallion", labels: ["Buff", "Debuff"], description: "On room entry, mark all enemies for 30s. Killing marked enemy grants 3s stealth and refreshes marks. -20% dodge cooldown." },
  { id: "dewdrop_prism", name: "Dewdrop Prism", labels: ["Buff"], description: "Healing effects increase the lower your health (up to +33% bonus)." },
  { id: "ember_rune", name: "Ember Rune", labels: ["Buff", "Fire"], description: "Being on Fire no longer disables regeneration." },
  { id: "emberheart_stone", name: "Emberheart Stone", labels: ["Buff", "Fire", "DOT"], description: "Fire damage increases Walkspeed by 8% for 5s. Enemies that melee hit you are set on fire." },
  { id: "facadae_wraps", name: "Facadae Wraps", labels: ["Support"], description: "Standing still for 2s makes you invisible. 75% less likely to be detected." },
  { id: "fading_light", name: "Fading Light Token", labels: ["Support", "Buff", "Defensive"], description: "Below 30% health, gain invisibility for 5s and intangibility for 2s. +15% walkspeed." },
  { id: "feriun_horn", name: "Feriun Horn", labels: ["Buff", "Fire"], description: "Fire resistance +15%. 75% chance to extinguish burn stacks immediately." },
  { id: "gelidium_slime", name: "Gelidium Slime", labels: ["Self Debuff"], description: "Harder to control your movement. VERY FUN." },
  { id: "gilded_touch", name: "Gilded Touch", labels: ["Buff"], description: "Killing enemies drops 10-15 gold. Bosses always drop 50 gold." },
  { id: "grounding_rod", name: "Grounding Rod", labels: ["Buff"], description: "Immune to Magnetise. 30% resistance to Lightning." },
  { id: "gumption_amulet", name: "Gumption Amulet", labels: ["Posture", "Armor"], description: "Block with 2H weapons (posture scales 4% Max HP). +10% Armor is always active. Posture break lasts 2x and deals 2x damage." },
  { id: "iron_counterweight", name: "Iron Counterweight", labels: ["Buff"], description: "Successful parries make next M1 deal +15% damage (stacks 5x). Being hit removes stacks." },
  { id: "katiyr_claws", name: "Katiyr Claws", labels: ["Buff"], description: "-15% Roll Cooldown, +15% Roll Distance." },
  { id: "kixxm_branch", name: "Kix'xm Branch", labels: ["Buff"], description: "Standing still for 3s roots you, increasing HP and Mana regen by 11%." },
  { id: "lightning_charm", name: "Lightning Charm", labels: ["Mobility"], description: "Rolls teleport instead. Decreased iframes, increased cooldown. Dash distance scales off Walkspeed/1.5 and deals 7.15 lightning clash damage through enemies." },
  { id: "lucky_dice", name: "Lucky Dice", labels: ["Support", "Buff", "Defensive", "Healing", "Self Debuff"], description: "Roll a die on kill: stun, slow, lose mana, guaranteed crit, heal + iframes, or cooldown reset chance." },
  { id: "mana_orb", name: "Mana Orb", labels: ["Stat Boost", "Mana"], description: "Increases maximum mana by 55." },
  { id: "mark_retribution", name: "Mark of Retribution", labels: ["Buff"], description: "Each damage instance increases total damage by 1% (max 25%). Resets out of combat." },
  { id: "metal_arm", name: "Metal Arm", labels: ["Stat Boost", "Posture", "Physical"], description: "Fist M1 damage +2.5. Can block with fists (15% chip damage)." },
  { id: "oni_mask", name: "Oni Mask", labels: ["Buff", "Self Debuff"], description: "18% chance for skills to be mimicked. Demon periodically plays sounds and summons mock enemies." },
  { id: "raging_demon", name: "Raging Demon", labels: ["Buff"], description: "Completing combo teleports behind enemy, stuns 1.66s, and resets combo cooldown. 12s cooldown." },
  { id: "rosary", name: "Rosary", labels: ["Buff", "Defensive"], description: "When healing allies, 20% (-5% per ally) also heals you. Alone, healing spells grant hyperarmor." },
  { id: "runic_shard", name: "Runic Shard", labels: ["Shadow", "DOT"], description: "Casting spell leaves AoE dealing 8 Shadow damage/s for 5s. 15s cooldown." },
  { id: "sacred_rose", name: "Sacred Rose", labels: ["Nature", "Buff", "Healing"], description: "Taking damage has 10% chance to apply Bloom. 30s cooldown." },
  { id: "serpent_fang", name: "Serpent's Fang", labels: ["Buff"], description: "Dodging poisons nearby enemies in an extended range for 1.55 Poison damage/s for 12s. 10s cooldown." },
  { id: "shifting_sands", name: "Shifting Sands Hourglass", labels: ["Buff"], description: "All cooldowns 10% shorter (including Roll and Parry)." },
  { id: "stalwart_crest", name: "Stalwart Crest", labels: ["Buff"], description: "Losing 15% health within 5s grants 30% Armor for 6s. 12s cooldown." },
  { id: "stormcaller_eye", name: "Stormcaller's Eye", labels: ["Lightning", "Buff"], description: "Critical strikes summon lightning smiting nearby enemies for bonus lightning damage (1.25x). 10s cooldown." },
  { id: "suspicious_grimoire", name: "Suspicious Grimoire", labels: ["Buff", "Defensive", "Self Debuff"], description: "Spells 33% chance to cast 2x faster. Applies random debuff (1.8 damage/s for 1-5s)." },
  { id: "swordbreaker", name: "Swordbreaker", labels: ["Buff"], description: "Stun durations from parries increased by 15%." },
  { id: "thorns_discord", name: "Thorns of Discord", labels: ["Defensive", "Self Debuff"], description: "20% melee damage reflected. -7.5% Healing Received." },
  { id: "tidal_crest", name: "Tidal Crest", labels: ["Buff", "Self Debuff"], description: "+20% resistance to Fire, Nature, and Lightning." },
  { id: "tome_tranquility", name: "Tome of Tranquility", labels: ["Buff", "Self Debuff"], description: "Regeneration permanently scales on out-of-combat rate. -20% Regeneration Rate." },
  { id: "umbral_mirage", name: "Umbral Mirage", labels: ["Buff", "Shadow"], description: "Dodges summon umbral mark that detonates after 1s (12 Shadow damage). 15s cooldown." },
  { id: "vanguard_aegis", name: "Vanguard's Aegis", labels: ["Defensive"], description: "Parries grant shield reducing damage by 15% for 5s. Refreshed on parry." },
  { id: "voidtouched_necklace", name: "Voidtouched Necklace", labels: ["Buff", "Defensive"], description: "10% chance to automatically dodge any attack." },
  { id: "warden_brace", name: "Warden's Brace", labels: ["Buff", "Defensive", "Weapon Scaling"], description: "While blocking with shields, click to Shield Bash (75% of M1 scaling)." },
  { id: "windsprint_charm", name: "Windsprint Charm", labels: ["Stat Boost", "Buff", "Mobility"], description: "Build momentum over 5s to reach 150% speed. Immune to hitstun at max speed." },
  { id: "winter_mittens", name: "Winter Mittens", labels: ["Buff"], description: "Chill stacks are half effective. Protects specifically against the Frozen-tag freeze." },
  { id: "winterspeaker_amulet", name: "Winterspeaker's Amulet", labels: ["Buff"], description: "Chill stacks you apply are doubled." },
  { id: "zephyr_amulet", name: "Zephyr Amulet", labels: ["Buff"], description: "Attack speed +5% for 10s per M1 hit (stacks to 30%)." }
];

const MAX_RELICS = 3;

export default function RelicsSelector({ selected, onSelect }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return RELICS;
    return RELICS.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.labels.some(l => l.toLowerCase().includes(q))
    );
  }, [search]);

  const handleToggle = (relicId) => {
    if (selected.includes(relicId)) {
      onSelect(selected.filter(id => id !== relicId));
    } else if (selected.length < MAX_RELICS) {
      onSelect([...selected, relicId]);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search relics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-black/50 border-gray-700 text-white placeholder:text-gray-600"
          />
        </div>
        <div className="bg-zinc-900/50 border border-gray-700 rounded px-3 py-2 text-sm text-gray-400 whitespace-nowrap">
          <span className="text-white font-semibold">{selected.length}</span> / {MAX_RELICS} selected
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((relic) => {
          const isSelected = selected.includes(relic.id);
          const canSelect = selected.length < MAX_RELICS || isSelected;

          return (
            <Card
              key={relic.id}
              className={`cursor-pointer transition-all border ${
                isSelected
                  ? 'border-white bg-black/90 shadow-lg shadow-white/20'
                  : canSelect
                  ? 'border-gray-700 bg-zinc-900/50 hover:border-gray-600'
                  : 'border-gray-800 bg-zinc-900/30 opacity-50 cursor-not-allowed'
              }`}
              onClick={() => canSelect && handleToggle(relic.id)}
            >
              <CardContent className="p-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white mb-1">{relic.name}</h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {relic.labels.map((label, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="border-gray-700 text-gray-400 text-xs px-1.5 py-0"
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs leading-tight">{relic.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-3 text-gray-600 text-center py-8">No relics match your search.</p>
        )}
      </div>
    </div>
  );
}