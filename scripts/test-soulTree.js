import { createInitialState, attemptUnlock, serializeState } from '../src/lib/state.js';
import { SOUL_TREE_NODES } from '../src/lib/soulTreeGraph.js';

function pretty(u) { return Array.from(u).join(', ') }

let state = createInitialState();
console.log('Initial unlocked:', pretty(state.unlocked));

// Try unlocking dependent ability before core -> should fail
let res = attemptUnlock('blooming_venom', state);
console.log('Attempt bloom before core:', res.success, res.error || 'ok');

// Unlock venom core first
res = attemptUnlock('venom_core', state);
console.log('Unlock venom_core:', res.success, res.error || 'ok');
if (res.success) state = res.state;

// Now unlock blooming_venom
res = attemptUnlock('blooming_venom', state);
console.log('Unlock blooming_venom after core:', res.success, res.error || 'ok');
if (res.success) state = res.state;

// Try to unlock twisting_vines directly (should fail because mugen_toxins missing)
res = attemptUnlock('twisting_vines', state);
console.log('Attempt twisting_vines without mugen:', res.success, res.error || 'ok');

// Unlock mugen_toxins
res = attemptUnlock('mugen_toxins', state);
console.log('Unlock mugen_toxins:', res.success, res.error || 'ok');
if (res.success) state = res.state;

// Now unlock twisting_vines
res = attemptUnlock('twisting_vines', state);
console.log('Unlock twisting_vines:', res.success, res.error || 'ok');
if (res.success) state = res.state;

console.log('Final unlocked:', pretty(state.unlocked));

// Serialize
console.log('Serialized state:', JSON.stringify(serializeState(state), null, 2));
