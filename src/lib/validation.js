// Pure validation functions for Soul Tree unlocking logic

/**
 * Build a map of nodes by id for fast lookup
 */
export function buildNodeMap(nodes) {
  return new Map((nodes || []).map(n => [n.id, n]));
}

/**
 * canUnlockNode(nodeId, unlockedSet, nodes)
 * - nodeId: string
 * - unlockedSet: Set<string> (or object with keys)
 * - nodes: array of node objects
 *
 * Returns: { canUnlock: boolean, reason?: string }
 */
export function canUnlockNode(nodeId, unlockedSet, nodes) {
  const nodeMap = buildNodeMap(nodes);
  const node = nodeMap.get(nodeId);
  if (!node) return { canUnlock: false, reason: 'unknown_node' };

  // normalize unlockedSet to Set
  const has = (id) => {
    if (!id) return false;
    if (unlockedSet instanceof Set) return unlockedSet.has(id);
    return Boolean(unlockedSet && unlockedSet[id]);
  };

  // Already unlocked
  if (has(nodeId)) return { canUnlock: false, reason: 'already_unlocked' };

  // All prereqs must be unlocked
  const prereqs = node.prereqIds || [];
  for (const pid of prereqs) {
    if (!has(pid)) return { canUnlock: false, reason: `prereq_missing:${pid}` };
  }

  // If node references a core attribute, ensure core is unlocked first (unless node itself is core)
  if (node.coreAttributeId && node.type !== 'core') {
    if (!has(node.coreAttributeId)) return { canUnlock: false, reason: `core_attribute_locked:${node.coreAttributeId}` };
  }

  // Passed all checks
  return { canUnlock: true };
}
