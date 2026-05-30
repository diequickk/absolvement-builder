import { canUnlockNode } from './validation.js';
import { SOUL_TREE_NODES } from './soulTreeGraph.js';

export function createInitialState() {
  return {
    unlocked: new Set(),
    points: 0,
    lastError: null,
  };
}

export function serializeState(state) {
  return {
    unlocked: Array.from(state.unlocked || []),
    points: state.points || 0,
  };
}

export function hydrateState(serialized) {
  return {
    unlocked: new Set(serialized?.unlocked || []),
    points: serialized?.points || 0,
  };
}

/**
 * attemptUnlock(nodeId, state, nodes)
 * - Pure: does not mutate input state. Returns { success, state, error }
 */
export function attemptUnlock(nodeId, state, nodes = SOUL_TREE_NODES) {
  const unlockedSet = new Set(state.unlocked);
  const validation = canUnlockNode(nodeId, unlockedSet, nodes);

  if (!validation.canUnlock) {
    return { success: false, state, error: validation.reason };
  }

  // Example hook point: check and deduct points/costs here
  // For now we allow unlock if validation passes

  const newUnlocked = new Set(unlockedSet);
  newUnlocked.add(nodeId);

  const newState = {
    ...state,
    unlocked: newUnlocked,
    lastError: null,
  };

  return { success: true, state: newState };
}

/**
 * Reducer-style helper for frameworks that want a pure reducer
 */
export function reducer(state, action) {
  switch (action.type) {
    case 'UNLOCK_NODE': {
      const res = attemptUnlock(action.payload.nodeId, state);
      if (!res.success) return { ...state, lastError: res.error };
      return res.state;
    }
    case 'SET_STATE':
      return action.payload.state;
    default:
      return state;
  }
}
