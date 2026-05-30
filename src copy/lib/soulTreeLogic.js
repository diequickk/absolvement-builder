/**
 * Soul Tree Progression Logic
 * ───────────────────────────
 * ARCHITECTURE NOTE (Web Migration):
 * This module is intentionally a pure JS file with zero React or UI imports.
 * All validation and state mutation functions are pure (no side effects),
 * making this layer trivially portable to any future web framework, API route,
 * or server-side runtime (Node/Deno/Edge) without modification.
 *
 * The dependency graph (NODE_PREREQUISITES) is the single source of truth.
 * The UI layer (SkillTree.jsx) is a thin consumer — it calls canUnlockNode()
 * and applyToggle() and renders the result. Business logic lives here only.
 */

/**
 * NODE_PREREQUISITES
 * Declarative dependency graph. Key = nodeId, Value = array of nodeIds
 * that must ALL be unlocked before this node can be selected.
 *
 * Rules:
 *  - Nodes not listed here have no prerequisites (freely unlockable subject to SP + sub-path rules).
 *  - Linear chains: each node lists only its direct parent.
 *  - Branching: a node may list multiple required parents.
 *  - Sub-path entry nodes (e.g. nature_sub1_1) require no parent here —
 *    they are gated by SP and mutual exclusivity (handled separately).
 */
export const NODE_PREREQUISITES = {

  // ── PHYSICAL / CRIT (Soulpiercer) ─────────────────────────────────────
  crit_2: ['crit_1'],
  crit_3: ['crit_2'],
  crit_4: ['crit_3'],
  crit_5: ['crit_4'],
  crit_6: ['crit_5'],

  // ── PHYSICAL / SPEED (Bladewind Disciple) ─────────────────────────────
  speed_2: ['speed_1'],
  speed_3: ['speed_2'],
  speed_4: ['speed_3'],
  speed_5: ['speed_4'],
  speed_6: ['speed_5'],

  // ── SUPPORT / HEALING (Luminary Pact) ─────────────────────────────────
  healing_2: ['healing_1'],
  healing_3: ['healing_2'],
  healing_4: ['healing_3'],
  healing_5: ['healing_4'],
  healing_6: ['healing_5'],

  // ── DEFENSE (Warden's Resolve) ─────────────────────────────────────────
  defense_2: ['defense_1'],
  defense_3: ['defense_2'],
  defense_4: ['defense_3'],
  defense_5: ['defense_4'],
  defense_6: ['defense_5'],

  // ── WATER (Tidesage) ───────────────────────────────────────────────────
  water_2: ['water_1'],
  water_3: ['water_2'],
  water_4: ['water_3'],
  water_5: ['water_4'],
  water_6: ['water_5'],

  // Water Sub 1 – Depthbinder
  water_sub1_2: ['water_sub1_1'],
  water_sub1_3: ['water_sub1_2'],
  water_sub1_4: ['water_sub1_3'],
  water_sub1_5: ['water_sub1_4'],
  water_sub1_6: ['water_sub1_5'],

  // Water Sub 2 – Flowmaster
  water_sub2_2: ['water_sub2_1'],
  water_sub2_3: ['water_sub2_2'],
  water_sub2_4: ['water_sub2_3'],
  water_sub2_5: ['water_sub2_4'],
  water_sub2_6: ['water_sub2_5'],

  // ── EARTH (Stoneblood Citadel) ─────────────────────────────────────────
  earth_2: ['earth_1'],
  earth_3: ['earth_2'],
  earth_4: ['earth_3'],
  earth_5: ['earth_4'],
  earth_6: ['earth_5'],

  // Earth Sub 1 – Living Bastion
  earth_sub1_2: ['earth_sub1_1'],
  earth_sub1_3: ['earth_sub1_2'],
  earth_sub1_4: ['earth_sub1_3'],
  earth_sub1_5: ['earth_sub1_4'],
  earth_sub1_6: ['earth_sub1_5'],

  // Earth Sub 2 – Seismic Wrath
  earth_sub2_2: ['earth_sub2_1'],
  earth_sub2_3: ['earth_sub2_2'],
  earth_sub2_4: ['earth_sub2_3'],
  earth_sub2_5: ['earth_sub2_4'],
  earth_sub2_6: ['earth_sub2_5'],

  // ── FROST (Heart of Winter) ────────────────────────────────────────────
  frost_2: ['frost_1'],
  frost_3: ['frost_2'],
  frost_4: ['frost_3'],
  frost_5: ['frost_4'],
  frost_5b: ['frost_5'],   // Glacial Flow II requires Glacial Flow
  frost_5c: ['frost_5b'],  // Deep Freeze requires Glacial Flow II

  // Frost Sub 1 – Shattermaster
  frost_sub1_2: ['frost_sub1_1'],
  frost_sub1_3: ['frost_sub1_2'],
  frost_sub1_4: ['frost_sub1_3'],
  frost_sub1_5: ['frost_sub1_4'],
  frost_sub1_6: ['frost_sub1_5'],

  // Frost Sub 2 – Glacial Control
  frost_sub2_2: ['frost_sub2_1'],
  frost_sub2_3: ['frost_sub2_2'],
  frost_sub2_4: ['frost_sub2_3'],
  frost_sub2_5: ['frost_sub2_4'],
  frost_sub2_6: ['frost_sub2_5'],

  // ── DISEASE (Plagueborn) ───────────────────────────────────────────────
  disease_2: ['disease_1'],
  disease_3: ['disease_2'],
  disease_4: ['disease_3'],
  disease_5: ['disease_4'],
  disease_6: ['disease_5'],

  // Disease Sub 1 – Withering Decay
  disease_sub1_2: ['disease_sub1_1'],
  disease_sub1_3: ['disease_sub1_2'],
  disease_sub1_4: ['disease_sub1_3'],
  disease_sub1_5: ['disease_sub1_4'],
  disease_sub1_6: ['disease_sub1_5'],
  disease_sub1_7: ['disease_sub1_6'],

  // Disease Sub 2 – Corruptive Epidemic
  disease_sub2_2: ['disease_sub2_1'],
  disease_sub2_3: ['disease_sub2_2'],
  disease_sub2_4: ['disease_sub2_3'],
  disease_sub2_5: ['disease_sub2_4'],
  disease_sub2_6: ['disease_sub2_5'],
  // Ravenous Outbreak IIA/IIB both require Ravenous Outbreak
  disease_sub2_6a: ['disease_sub2_6'],
  disease_sub2_6b: ['disease_sub2_6'],
  disease_sub2_7: ['disease_sub2_6'],

  // ── NATURE (Venomous Bloom) ────────────────────────────────────────────
  nature_2: ['nature_1'],
  nature_3: ['nature_2'],
  nature_4: ['nature_3'],
  nature_5: ['nature_4'],
  nature_6: ['nature_5'],

  // Nature Sub 1 – Corrupted Thicket
  nature_sub1_1a: ['nature_sub1_1'],  // Entangling Thorns II requires Entangling Thorns
  nature_sub1_2:  ['nature_sub1_1'],
  nature_sub1_3:  ['nature_sub1_2'],
  nature_sub1_4:  ['nature_sub1_3'],
  nature_sub1_5:  ['nature_sub1_4'],
  nature_sub1_6:  ['nature_sub1_5'],
  nature_sub1_7:  ['nature_sub1_6'],

  // Nature Sub 2 – Virulent Bloom  ← THE REPORTED BUG CASE
  // nature_sub2_1 = Blooming Venom    (no prereq within sub, freely selectable as sub entry)
  nature_sub2_2: ['nature_sub2_1'],   // Mutagenic Toxins requires Blooming Venom
  nature_sub2_3: ['nature_sub2_2'],   // Twisting Vines requires Mutagenic Toxins
  nature_sub2_4: ['nature_sub2_2'],   // Venomous Renewal requires Mutagenic Toxins
  nature_sub2_5: ['nature_sub2_3'],   // Adaptive Toxins requires Twisting Vines
  nature_sub2_6: ['nature_sub2_3'],   // Catalyst of Decay requires Twisting Vines

  // ── FIRE (Inferno's Dominion) ──────────────────────────────────────────
  fire_2: ['fire_1'],
  fire_3: ['fire_2'],
  fire_4: ['fire_3'],
  fire_5: ['fire_4'],

  // Fire Sub 1 – Volcanic Rupture
  fire_sub1_2: ['fire_sub1_1'],
  fire_sub1_3: ['fire_sub1_2'],
  fire_sub1_4: ['fire_sub1_3'],
  fire_sub1_5: ['fire_sub1_4'],
  fire_sub1_6: ['fire_sub1_5'],
  fire_sub1_7: ['fire_sub1_6'],

  // Fire Sub 2 – Scorching Wrath
  fire_sub2_2: ['fire_sub2_1'],
  fire_sub2_3: ['fire_sub2_2'],
  fire_sub2_4: ['fire_sub2_3'],
  fire_sub2_5: ['fire_sub2_4'],
  fire_sub2_6: ['fire_sub2_5'],
  fire_sub2_7: ['fire_sub2_6'],

  // ── LIGHTNING (Thrones of the Tempest) ────────────────────────────────
  lightning_2: ['lightning_1'],
  lightning_3: ['lightning_2'],
  lightning_4: ['lightning_3'],
  lightning_5: ['lightning_4'],
  lightning_6: ['lightning_5'],

  // Lightning Sub 1 – Living Storm
  lightning_sub1_2: ['lightning_sub1_1'],
  lightning_sub1_3: ['lightning_sub1_2'],
  lightning_sub1_4: ['lightning_sub1_3'],
  lightning_sub1_5: ['lightning_sub1_4'],
  lightning_sub1_6: ['lightning_sub1_5'],

  // Lightning Sub 2 – Stormpiercer
  lightning_sub2_2: ['lightning_sub2_1'],
  lightning_sub2_3: ['lightning_sub2_2'],
  lightning_sub2_4: ['lightning_sub2_3'],
  lightning_sub2_5: ['lightning_sub2_4'],

  // ── SHADOW (Embrace of the Void) ───────────────────────────────────────
  shadow_2: ['shadow_1'],
  shadow_3: ['shadow_2'],
  shadow_4: ['shadow_3'],
  shadow_5: ['shadow_4'],
  shadow_6: ['shadow_5'],

  // Shadow Sub 1 – Veil of the Forgotten
  shadow_sub1_1a: ['shadow_sub1_1'],  // Shrouded Steps II requires Shrouded Steps
  shadow_sub1_2:  ['shadow_sub1_1'],
  shadow_sub1_3:  ['shadow_sub1_2'],
  shadow_sub1_4:  ['shadow_sub1_3'],
  shadow_sub1_5:  ['shadow_sub1_4'],
  shadow_sub1_6:  ['shadow_sub1_5'],

  // Shadow Sub 2 – Umbral Corruption
  shadow_sub2_2: ['shadow_sub2_1'],
  shadow_sub2_3: ['shadow_sub2_2'],
  shadow_sub2_4: ['shadow_sub2_3'],
  shadow_sub2_5: ['shadow_sub2_4'],
  shadow_sub2_6: ['shadow_sub2_5'],

  // ── HOLY (Light of Absolution) ─────────────────────────────────────────
  holy_2: ['holy_1'],
  holy_3: ['holy_2'],
  holy_4: ['holy_3'],
  holy_5: ['holy_4'],
  holy_6: ['holy_5'],

  // Holy Sub 1 – Divine Bastion
  holy_sub1_2:  ['holy_sub1_1'],
  holy_sub1_3:  ['holy_sub1_2'],
  holy_sub1_4:  ['holy_sub1_3'],
  holy_sub1_5:  ['holy_sub1_4'],
  holy_sub1_6:  ['holy_sub1_5'],
  holy_sub1_6a: ['holy_sub1_6'],  // Divine Intervention II requires Divine Intervention

  // Holy Sub 2 – Radiant Judgement
  holy_sub2_2: ['holy_sub2_1'],
  holy_sub2_3: ['holy_sub2_2'],
  holy_sub2_4: ['holy_sub2_3'],
  holy_sub2_5: ['holy_sub2_4'],

  // ── PHYSICAL / BLEED (Unyielding Blood) ───────────────────────────────
  physical_2: ['physical_1'],
  physical_3: ['physical_2'],
  physical_4: ['physical_3'],
  physical_5: ['physical_4'],

  // Physical Sub 1 – Carnage of the Slain
  physical_sub1_2: ['physical_sub1_1'],
  physical_sub1_3: ['physical_sub1_2'],
  physical_sub1_4: ['physical_sub1_3'],
  physical_sub1_5: ['physical_sub1_4'],
  physical_sub1_6: ['physical_sub1_5'],
  physical_sub1_7: ['physical_sub1_6'],

  // Physical Sub 2 – Bloodbound Fury
  physical_sub2_2: ['physical_sub2_1'],
  physical_sub2_3: ['physical_sub2_2'],
  physical_sub2_4: ['physical_sub2_3'],
  physical_sub2_5: ['physical_sub2_4'],

  // ── WIND (Edge of the Storm) ───────────────────────────────────────────
  wind_2:  ['wind_1'],
  wind_3:  ['wind_2'],
  wind_4:  ['wind_3'],
  wind_5:  ['wind_4'],
  wind_6:  ['wind_5'],
  wind_6a: ['wind_6'],  // Cyclone Mastery II requires Cyclone Mastery

  // Wind Sub 1 – Storm Dancer
  wind_sub1_2: ['wind_sub1_1'],
  wind_sub1_3: ['wind_sub1_2'],
  wind_sub1_4: ['wind_sub1_3'],
  wind_sub1_5: ['wind_sub1_4'],

  // Wind Sub 2 – Sharp Currents
  wind_sub2_2:  ['wind_sub2_1'],
  wind_sub2_3:  ['wind_sub2_2'],
  wind_sub2_4:  ['wind_sub2_3'],
  wind_sub2_4a: ['wind_sub2_4'],  // Crushing Gale II requires Crushing Gale
  wind_sub2_5:  ['wind_sub2_4'],
};

// ─── PURE VALIDATION FUNCTIONS ──────────────────────────────────────────────

/**
 * canUnlockNode
 * Pure function — no side effects.
 * Returns { allowed: boolean, reason: string | null }
 *
 * Checks, in order:
 *  1. All prerequisite nodes are unlocked.
 *  2. No existing selection locks out this node (explicit locksOut).
 *  3. No conflicting sub-path selection exists (mutual exclusivity).
 *  4. SP budget not exceeded (requires nodeMap for cost lookup).
 *
 * @param {string} nodeId - The node the player wants to unlock.
 * @param {Record<string, boolean>} unlockedState - Current tree state.
 * @param {Record<string, object>} nodeMap - Flat map of id → node data (built in component).
 * @param {Array} skillPaths - Full SKILL_PATHS array (needed for sub-path resolution).
 * @param {number} spSpent - Current total SP spent.
 * @param {number} spBudget - Max allowed SP (35).
 */
export function canUnlockNode(nodeId, unlockedState, nodeMap, skillPaths, spSpent, spBudget = 35) {
  const node = nodeMap[nodeId];
  if (!node) return { allowed: false, reason: 'Unknown node' };

  // 1. Prerequisite check
  const prereqs = NODE_PREREQUISITES[nodeId] ?? [];
  for (const reqId of prereqs) {
    if (!unlockedState[reqId]) {
      const reqNode = nodeMap[reqId];
      return {
        allowed: false,
        reason: `Requires "${reqNode?.name ?? reqId}" first`,
      };
    }
  }

  // 2. Explicit locksOut check (bidirectional)
  for (const otherId of Object.keys(unlockedState)) {
    if (!unlockedState[otherId]) continue;
    const otherNode = nodeMap[otherId];
    if (otherNode?.locksOut?.includes(nodeId)) {
      return { allowed: false, reason: `Locked out by "${otherNode.name}"` };
    }
  }
  if (node.locksOut) {
    for (const lockedId of node.locksOut) {
      if (unlockedState[lockedId]) {
        return { allowed: false, reason: `Would conflict with "${nodeMap[lockedId]?.name ?? lockedId}"` };
      }
    }
  }

  // 3. Sub-path mutual exclusivity
  for (const path of skillPaths) {
    if (!path.subs?.length) continue;
    for (const sub of path.subs) {
      if (!sub.nodes.some(n => n.id === nodeId)) continue;
      // This node belongs to `sub`. Check siblings.
      for (const otherSub of path.subs) {
        if (otherSub.id === sub.id) continue;
        if (otherSub.nodes.some(n => unlockedState[n.id])) {
          return { allowed: false, reason: `Conflicts with "${otherSub.name}" specialization` };
        }
      }
    }
  }

  // 4. SP budget
  if (spSpent + (node.cost ?? 0) > spBudget) {
    return { allowed: false, reason: `Not enough SP (${spBudget - spSpent} remaining)` };
  }

  return { allowed: true, reason: null };
}

/**
 * getDescendants
 * Returns all nodeIds in the prerequisite graph that directly or transitively
 * depend on `nodeId`. Used when deselecting a node to also deselect children.
 *
 * Pure function — safe to call anywhere.
 */
export function getDescendants(nodeId) {
  const result = new Set();
  for (const [id, prereqs] of Object.entries(NODE_PREREQUISITES)) {
    if (prereqs.includes(nodeId)) {
      result.add(id);
      // recurse
      for (const descendant of getDescendants(id)) {
        result.add(descendant);
      }
    }
  }
  return result;
}

/**
 * applyToggle
 * Safe state mutation — returns a NEW state object (never mutates input).
 *
 * If deselecting: also deselects all downstream dependents.
 * If selecting:   validates via canUnlockNode first, returns unchanged state on failure.
 *
 * @returns {{ newState: Record<string, boolean>, changed: boolean, reason: string | null }}
 */
export function applyToggle(nodeId, currentState, nodeMap, skillPaths, spSpent, spBudget = 35) {
  const isSelected = !!currentState[nodeId];

  if (isSelected) {
    // Deselect: remove node + all dependents
    const toRemove = new Set([nodeId, ...getDescendants(nodeId)]);
    const newState = { ...currentState };
    for (const id of toRemove) delete newState[id];
    return { newState, changed: true, reason: null };
  }

  // Select: validate first
  const { allowed, reason } = canUnlockNode(
    nodeId, currentState, nodeMap, skillPaths, spSpent, spBudget
  );
  if (!allowed) {
    return { newState: currentState, changed: false, reason };
  }

  return {
    newState: { ...currentState, [nodeId]: true },
    changed: true,
    reason: null,
  };
}