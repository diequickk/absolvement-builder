import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Weapon emoji based on weapon type/name
const WEAPONS = [
  { id: "floral_rapier", name: "Floral Rapier", emoji: "🌸🗡️", type: "Light", damage: 8.29, description: "Dash forward with a piercing thrust, leaving poisonous pollen" },
  { id: "rotspike", name: "Rotspike", emoji: "🗡️", type: "Medium", damage: 9.95, description: "Infect yourself to gain the power to inflict Rot" },
  { id: "ethereal_kris", name: "Ethereal Kris", emoji: "🌀🗡️", type: "Light", damage: 9.55, description: "Void strikes nearby enemies with bleed damage" },
  { id: "sealed_sword", name: "Sealed Sword", emoji: "⚔️", type: "Medium", damage: 10.79, description: "Unleash rings of holy flame dealing ignite damage" },
  { id: "flamelash", name: "Flamelash", emoji: "🔥⚔️", type: "Medium", damage: 11.18, description: "Lash like a flame whip for three devastating swings" },
  { id: "dragonmaw_pike", name: "Dragonmaw Pike", emoji: "🐉🔱", type: "Heavy", damage: 11.92, description: "Impale and slam enemies with galestrike damage" },
  { id: "frostwake_spear", name: "Frostwake Spear", emoji: "❄️🔱", type: "Medium", damage: 11.55, description: "Slash and freeze targets with frost damage" },
  { id: "worshipper_spear", name: "Worshipper's Spear", emoji: "🔱", type: "Heavy", damage: 11.92, description: "Throw tethered spear causing deep bleed" },
  { id: "bloodletter_katana", name: "Bloodletter's Katana", emoji: "🩸⚔️", type: "Medium", damage: 12.65, description: "Teleport behind targets for a devastating slash" },
  { id: "stormweaver", name: "Stormweaver", emoji: "⚡🪄", type: "Magic", damage: 13.56, description: "Bombard area with supersonic lightning beams" },
  { id: "drowned_scythe", name: "Drowned Scythe", emoji: "💧☽", type: "Heavy", damage: 13.9, description: "Form protective bubble with invincibility frames" },
  { id: "gravetender_scythe", name: "Gravetender's Scythe", emoji: "☽", type: "Heavy", damage: 13.9, description: "Spin and slam with shadowstrike damage" },
  { id: "hand_justice", name: "Hand of Justice", emoji: "⚖️🪓", type: "Heavy", damage: 14.79, description: "Holy slam with irradiating area damage" },
  { id: "justicar_greatsword", name: "Justicar's Greatsword", emoji: "✝️🗡️", type: "Heavy", damage: 15.64, description: "Sacrifice health to grant allies regeneration and armor" },
  { id: "headtaker_greatsword", name: "Headtaker's Greatsword", emoji: "💀🗡️", type: "Heavy", damage: 15.64, description: "Slam ground with shadow damage knockback" },
  { id: "stonebleeder_axe", name: "Stonebleeder Greataxe", emoji: "🪨🪓", type: "Heavy", damage: 16.54, description: "Rupture ground with earth eruptions" },
  { id: "divine_plume", name: "Divine Plume Scythe", emoji: "🪶☽", type: "Heavy", damage: 14.15, description: "Cleanse debuffs and transfer them to enemies" },
  { id: "zephyr_glaive", name: "Zephyr Fang Glaive", emoji: "💨🗡️", type: "Medium", damage: 13.17, description: "Vault into dropkick with wind vortex" },
  { id: "cinderheart_maul", name: "Cinderheart Maul", emoji: "🔥🔨", type: "Heavy", damage: 14.78, description: "Spin and erupt in magma dealing fire damage" },
  { id: "crystallized_katana", name: "Crystallized Katana", emoji: "💎⚔️", type: "Medium", damage: 12.65, description: "Build amethyst stages for crushing earth damage" },
  { id: "final_rites", name: "Final Rites Greataxe", emoji: "☠️🪓", type: "Heavy", damage: 12.24, description: "Drain enemies to steal health and increase damage" },
  { id: "black_ice", name: "Black Ice Ravager Axe", emoji: "🧊🪓", type: "Heavy", damage: 16.53, description: "Shift forms and empower M1s with frost damage" },
  { id: "silkwing_bow", name: "Silkwing Bow", emoji: "🏹", type: "Magic", damage: 13.85, description: "Summon bloodbriars that stun enemies" },
  { id: "tidebreaker", name: "Tidebreaker Cutlass", emoji: "🌊⚔️", type: "Medium", damage: 10.62, description: "Summon growing whirlpool that pulls enemies" }
];

const TYPE_COLORS = {
  Light: 'bg-blue-900/40 text-blue-300 border-blue-800',
  Medium: 'bg-zinc-700/60 text-zinc-300 border-zinc-600',
  Heavy: 'bg-red-900/40 text-red-300 border-red-800',
  Magic: 'bg-purple-900/40 text-purple-300 border-purple-800',
};

export default function WeaponSelector({ selected, onSelect }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return WEAPONS;
    return WEAPONS.filter(w =>
      w.name.toLowerCase().includes(q) ||
      w.type.toLowerCase().includes(q) ||
      w.description.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="space-y-4">
      <div className="rounded p-3 text-xs" style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', color: '#ca8a04' }}>
        <span style={{ fontWeight: 700 }}>⚠ Dev Note: </span>
        Only mythical-tier weapons are listed here. Weapons that deal no elemental damage are not included.
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input
          placeholder="Search weapons..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 bg-black/50 border-gray-700 text-white placeholder:text-gray-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{marginTop: '0'}}>
        {filtered.map((weapon) => {
          const isSelected = selected === weapon.id;

          return (
            <Card
              key={weapon.id}
              className={`cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'border-white bg-black/90 shadow-lg shadow-white/20'
                  : 'border-gray-600 bg-zinc-900/50 hover:border-gray-500'
              }`}
              onClick={() => onSelect(weapon.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-zinc-800 p-2 rounded-lg text-2xl flex items-center justify-center w-12 h-12 flex-shrink-0">
                    {weapon.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white mb-1 leading-tight">{weapon.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={`text-xs border ${TYPE_COLORS[weapon.type] || ''}`}>
                        {weapon.type}
                      </Badge>
                      <span className="text-white font-mono text-xs">{weapon.damage} dmg</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-tight">{weapon.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-3 text-gray-600 text-center py-8">No weapons match your search.</p>
        )}
      </div>
    </div>
  );
}