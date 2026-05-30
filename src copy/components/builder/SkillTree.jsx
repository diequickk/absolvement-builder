import React, { useState, useMemo } from 'react';
import { SKILL_PATHS } from './skillsData';
import { canUnlockNode, applyToggle } from '@/lib/soulTreeLogic';
import { Lock, AlertCircle } from 'lucide-react';

/**
 * Builds a flat id → node lookup, injecting color metadata from its parent path/sub.
 * Pure derivation — memoized.
 */
function buildNodeMap(paths) {
  const map = {};
  for (const path of paths) {
    for (const node of path.nodes) {
      map[node.id] = { ...node, color: path.color };
    }
    if (path.subs) {
      for (const sub of path.subs) {
        for (const node of sub.nodes) {
          map[node.id] = { ...node, color: sub.color ?? path.color };
        }
      }
    }
  }
  return map;
}

export default function SkillTree({ selected: skillTree = {}, onChange }) {
  const [openPath, setOpenPath] = useState(null);
  const [lastReason, setLastReason] = useState(null);

  const nodeMap = useMemo(() => buildNodeMap(SKILL_PATHS), []);

  const spSpent = useMemo(
    () => Object.keys(skillTree).reduce((total, id) => {
      if (!skillTree[id]) return total;
      return total + (nodeMap[id]?.cost ?? 0);
    }, 0),
    [skillTree, nodeMap]
  );

  const handleToggle = (nodeId) => {
    const { newState, changed, reason } = applyToggle(
      nodeId, skillTree, nodeMap, SKILL_PATHS, spSpent
    );
    if (changed) {
      onChange(newState);
      setLastReason(null);
    } else {
      setLastReason(reason);
      setTimeout(() => setLastReason(null), 3000);
    }
  };

  const isNodeLocked = (nodeId) => {
    if (skillTree[nodeId]) return false; // already selected, never "locked"
    const { allowed } = canUnlockNode(nodeId, skillTree, nodeMap, SKILL_PATHS, spSpent);
    return !allowed;
  };

  const getPathSp = (path) => {
    const all = [...path.nodes, ...(path.subs ? path.subs.flatMap(s => s.nodes) : [])];
    return all.reduce((t, n) => t + (skillTree[n.id] ? n.cost : 0), 0);
  };

  const renderNode = (node, color) => {
    const selected = !!skillTree[node.id];
    const locked = isNodeLocked(node.id);

    // Show prerequisite hint inline
    let lockHint = null;
    if (locked && !selected) {
      const { reason } = canUnlockNode(node.id, skillTree, nodeMap, SKILL_PATHS, spSpent);
      lockHint = reason;
    }

    return (
      <div
        key={node.id}
        onClick={() => handleToggle(node.id)}
        className={`p-3 rounded border transition-all select-none ${
          locked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:brightness-110'
        }`}
        style={{
          borderColor: selected ? color : locked ? 'rgba(60,60,60,0.5)' : 'rgba(80,80,80,0.4)',
          background: selected ? `${color}18` : 'rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-bold leading-tight" style={{
            color: selected ? color : locked ? '#555' : '#b0b0b8',
            fontFamily: 'Cinzel, serif',
          }}>
            {node.name}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
            {locked && <Lock size={9} className="text-gray-600" />}
            <span className="text-xs font-bold" style={{ color: selected ? color : '#555' }}>
              {node.cost} SP
            </span>
          </div>
        </div>
        <p className="text-xs leading-relaxed mt-1" style={{ color: '#6b7280' }}>{node.desc}</p>
        {lockHint && (
          <p className="text-xs mt-1.5 italic" style={{ color: '#6b4000' }}>
            🔒 {lockHint}
          </p>
        )}
        {node.locksOut?.length > 0 && (
          <p className="text-xs mt-1" style={{ color: '#78350f' }}>⚠ Locks out a conflicting node</p>
        )}
      </div>
    );
  };

  const activePath = openPath ? SKILL_PATHS.find(p => p.id === openPath) : null;
  const spRatio = Math.min(1, spSpent / 35);

  return (
    <div className="space-y-4">
      {/* Dev Note */}
      <div className="rounded p-3 text-xs" style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', color: '#ca8a04' }}>
        <span style={{ fontFamily: 'Cinzel, serif', fontWeight: 700 }}>⚠ Dev Note: </span>
        The soul tree is not fully accurate — in-game you can unlock certain nodes without taking prior ones in the path. This builder enforces strict sequential prerequisites for planning purposes.
      </div>

      {/* SP Header */}
      <div
        className="flex items-center justify-between p-3 rounded"
        style={{ border: '1px solid rgba(200,200,208,0.15)', background: 'rgba(0,0,0,0.6)' }}
      >
        <span style={{ fontFamily: 'Cinzel, serif', color: '#888898', letterSpacing: '0.12em', fontSize: '0.65rem' }}>
          SOUL POINTS ALLOCATED
        </span>
        <div className="flex items-center gap-3">
          <div className="relative h-1 rounded-full overflow-hidden" style={{ width: 100, background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all"
              style={{
                width: `${spRatio * 100}%`,
                background: spSpent >= 35
                  ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                  : 'linear-gradient(90deg, #888, #fff)',
              }}
            />
          </div>
          <span style={{ fontFamily: 'Cinzel, serif', color: spSpent >= 35 ? '#ef4444' : '#e8e8f0', fontSize: '0.8rem', fontWeight: 700 }}>
            {spSpent} / 35 SP
          </span>
        </div>
      </div>

      {/* Inline reason feedback */}
      {lastReason && (
        <div className="flex items-center gap-2 rounded p-2 text-xs" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
          <AlertCircle size={12} />
          {lastReason}
        </div>
      )}

      {/* Path Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
        {SKILL_PATHS.map(path => {
          const pathSp = getPathSp(path);
          const isOpen = openPath === path.id;
          return (
            <button
              key={path.id}
              onClick={() => setOpenPath(isOpen ? null : path.id)}
              className="p-2.5 rounded text-left transition-all"
              style={{
                border: `1px solid ${isOpen ? path.color : pathSp > 0 ? `${path.color}50` : 'rgba(80,80,80,0.3)'}`,
                background: isOpen ? `${path.color}1a` : pathSp > 0 ? `${path.color}0a` : 'rgba(0,0,0,0.4)',
              }}
            >
              <div className="text-xs font-bold" style={{ color: path.color, fontFamily: 'Cinzel, serif', letterSpacing: '0.04em' }}>
                {path.category}
              </div>
              <div className="text-xs mt-0.5 truncate" style={{ color: '#666' }}>{path.name}</div>
              {pathSp > 0 && (
                <div className="text-xs mt-1 font-bold" style={{ color: path.color }}>{pathSp} SP</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Expanded Path Detail */}
      {activePath && (
        <div
          className="rounded p-4 space-y-5"
          style={{ border: `1px solid ${activePath.color}30`, background: 'rgba(0,0,0,0.65)' }}
        >
          <div className="flex items-start justify-between pb-3" style={{ borderBottom: `1px solid ${activePath.color}20` }}>
            <div>
              <div className="text-xs" style={{ color: activePath.color, fontFamily: 'Cinzel, serif', letterSpacing: '0.12em' }}>
                {activePath.category.toUpperCase()}
              </div>
              <h3 className="text-base font-bold text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                {activePath.name}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-xs" style={{ color: '#555', fontFamily: 'Cinzel, serif' }}>SP in path</div>
              <div className="font-bold text-sm" style={{ color: activePath.color, fontFamily: 'Cinzel, serif' }}>
                {getPathSp(activePath)}
              </div>
            </div>
          </div>

          {/* Core nodes */}
          <div>
            <div className="text-xs mb-2" style={{ color: '#444', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}>
              CORE ABILITIES
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {activePath.nodes.map(node => renderNode(node, activePath.color))}
            </div>
          </div>

          {/* Sub-paths */}
          {activePath.subs && (
            <div>
              <div className="text-xs mb-3 text-center" style={{ color: '#444', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}>
                ── SPECIALIZATION PATHS ──
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {activePath.subs.map(sub => (
                  <div
                    key={sub.id}
                    className="rounded p-3 space-y-2"
                    style={{ border: `1px solid ${sub.color}25`, background: `${sub.color}06` }}
                  >
                    <h4
                      className="text-xs font-bold pb-2"
                      style={{ color: sub.color, fontFamily: 'Cinzel, serif', letterSpacing: '0.08em', borderBottom: `1px solid ${sub.color}20` }}
                    >
                      {sub.name}
                    </h4>
                    <div className="space-y-2">
                      {sub.nodes.map(node => renderNode(node, sub.color))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}