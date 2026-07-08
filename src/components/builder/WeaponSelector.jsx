import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Weapons with image support
const WEAPONS = [
  { id: "floral_rapier", name: "Floral Rapier", image: "/images/floral-rapier.webp", type: "Light", damage: 8.29, description: "Dash forward with a piercing thrust, leaving poisonous pollen" },
  { id: "rotspike", name: "Rotspike", image: "/images/image (3).png", type: "Medium", damage: 9.95, description: "Infect yourself to gain the power to inflict Rot" },
  { id: "ethereal_kris", name: "Ethereal Kris", image: "/images/image (4).png", type: "Light", damage: 9.55, description: "Void strikes nearby enemies with bleed damage" },
  { id: "sealed_sword", name: "Sealed Sword", image: "/images/image (5).png", type: "Medium", damage: 10.79, description: "Unleash rings of holy flame dealing ignite damage" },
  { id: "flamelash", name: "Flamelash", image: "/images/image (6).png", type: "Medium", damage: 11.18, description: "Lash like a flame whip for three devastating swings" },
  { id: "dragonmaw_pike", name: "Dragonmaw Pike", image: "/images/image (7).png", type: "Heavy", damage: 11.92, description: "Impale and slam enemies with galestrike damage" },
  { id: "frostwake_spear", name: "Frostwake Spear", image: "/images/image.jpeg", type: "Medium", damage: 11.55, description: "Slash and freeze targets with frost damage" },
  { id: "worshipper_spear", name: "Worshipper's Spear", image: "/images/Screenshot_2025-05-09_114954 (1).png", type: "Heavy", damage: 11.92, description: "Throw tethered spear causing deep bleed" },
  { id: "bloodletter_katana", name: "Bloodletter's Katana", image: "/images/image (8).png", type: "Medium", damage: 12.65, description: "Teleport behind targets for a devastating slash" },
  { id: "stormweaver", name: "Stormweaver", image: "/images/image (9).png", type: "Magic", damage: 13.56, description: "Bombard area with supersonic lightning beams" },
  { id: "drowned_scythe", name: "Drowned Scythe", image: "/images/image (10).png", type: "Heavy", damage: 13.9, description: "Form protective bubble with invincibility frames" },
  { id: "gravetender_scythe", name: "Gravetender's Scythe", image: "/images/image (11).png", type: "Heavy", damage: 13.9, description: "Spin and slam with shadowstrike damage" },
  { id: "hand_justice", name: "Hand of Justice", image: "/images/image (12).png", type: "Heavy", damage: 14.79, description: "Holy slam with irradiating area damage" },
  { id: "justicar_greatsword", name: "Justicar's Greatsword", image: "/images/Screenshot_2025-05-09_115117.png", type: "Heavy", damage: 15.64, description: "Sacrifice health to grant allies regeneration and armor" },
  { id: "headtaker_greatsword", name: "Headtaker's Greatsword", image: "/images/Screenshot_2025-05-09_115042.png", type: "Heavy", damage: 15.64, description: "Slam ground with shadow damage knockback" },
  { id: "stonebleeder_axe", name: "Stonebleeder Greataxe", image: "/images/image (13).png", type: "Heavy", damage: 16.54, description: "Rupture ground with earth eruptions" },
  { id: "divine_plume", name: "Divine Plume Scythe", image: "/images/image (14).png", type: "Heavy", damage: 14.15, description: "Cleanse debuffs and transfer them to enemies" },
  { id: "zephyr_glaive", name: "Zephyr Fang Glaive", image: "/images/image (10).webp", type: "Medium", damage: 13.17, description: "Vault into dropkick with wind vortex" },
  { id: "cinderheart_maul", name: "Cinderheart Maul", image: "/images/image (15).png", type: "Heavy", damage: 14.78, description: "Spin and erupt in magma dealing fire damage" },
  { id: "crystallized_katana", name: "Crystallized Katana", image: "/images/image (16).png", type: "Medium", damage: 12.65, description: "Build amethyst stages for crushing earth damage" },
  { id: "final_rites", name: "Final Rites Greataxe", image: "/images/image (17).png", type: "Heavy", damage: 12.24, description: "Drain enemies to steal health and increase damage" },
  { id: "black_ice", name: "Black Ice Ravager Axe", image: "/images/image (18).png", type: "Heavy", damage: 16.53, description: "Shift forms and empower M1s with frost damage" },
  { id: "silkwing_bow", name: "Silkwing Bow", image: "/images/image (19).png", type: "Magic", damage: 13.85, description: "Summon bloodbriars that stun enemies" },
  { id: "tidebreaker", name: "Tidebreaker Cutlass", image: "/images/image (11).webp", type: "Medium", damage: 10.62, description: "Summon growing whirlpool that pulls enemies" },
  { id: "Shockclaw", name: "Shockclaw", image: "/images/image (20).png", type: "Light", damage: 7.7, description: "Slam your claws into the ground to release an electric pulse, dealing 20 damage and magnetizing targets for 6 seconds" },
];

const TYPE_COLORS = {
  Light: 'bg-blue-900/40 text-blue-300 border-blue-800',
  Medium: 'bg-zinc-700/60 text-zinc-300 border-zinc-600',
  Heavy: 'bg-red-900/40 text-red-300 border-red-800',
  Magic: 'bg-purple-900/40 text-purple-300 border-purple-800',
};

function resolveWeaponImagePath(path) {
  if (!path) return '';

  // Support legacy "public/images/..." and root-relative "/images/..." entries.
  const cleanPath = path
    .trim()
    .replace(/^public\//, '')
    .replace(/^\/+/, '');

  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl}${cleanPath}`;
}

export default function WeaponSelector({ selected, onSelect, active }) {
  const [search, setSearch] = useState('');
  const currentSelection = selected ?? active;

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
          const isSelected = currentSelection === weapon.id;

          return (
            <Card
              key={weapon.id}
              className={`cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'border-yellow-500/80 bg-zinc-950/95 shadow-[0_0_0_1px_rgba(234,179,8,0.3),0_12px_30px_rgba(120,53,15,0.4)]'
                  : 'border-gray-600 bg-zinc-900/50 hover:border-gray-500'
              }`}
              onClick={() => onSelect?.(weapon.id)}
            >
              <CardContent className="p-0 flex flex-col">
                <div className="p-4 flex-1">
                  <h3 className="text-sm font-bold text-white mb-1">{weapon.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={`text-xs border ${TYPE_COLORS[weapon.type] || ''}`}>
                      {weapon.type}
                    </Badge>
                    <span className="text-white font-mono text-xs">{weapon.damage} dmg</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-tight">{weapon.description}</p>
                </div>
                {weapon.image && (
                  <>
                    <div className="h-px bg-gradient-to-r from-gray-700/20 via-gray-600/40 to-gray-700/20" />
                    <div className="p-4 pt-3">
                      <img
                        src={resolveWeaponImagePath(weapon.image)}
                        alt={weapon.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-32 object-cover rounded-md border border-gray-700/40"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </>
                )}
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