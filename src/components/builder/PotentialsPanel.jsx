import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ARCHIVED_CORE_POTENTIALS, ARCHIVED_CORE_POTENTIAL_CATEGORIES } from "@/lib/ArchiveData";

const RARITY_STYLES = {
  Common: 'bg-zinc-800 text-gray-300 border-zinc-600',
  Uncommon: 'bg-green-950/60 text-green-300 border-green-800',
  Rare: 'bg-blue-950/60 text-blue-300 border-blue-800',
  Mythical: 'bg-purple-950/60 text-purple-300 border-purple-800',
  Unique: 'bg-yellow-950/60 text-yellow-300 border-yellow-800',
};

const CORE_POTENTIALS = ARCHIVED_CORE_POTENTIALS;

const CATEGORIES = ARCHIVED_CORE_POTENTIAL_CATEGORIES;

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