Soul Tree Engine - README

Files added under `src/lib/`:
- `soulTreeGraph.js` - declarative node graph (id, name, type, coreAttributeId, prereqIds)
- `validation.js` - pure validation `canUnlockNode(nodeId, unlockedSet, nodes)`
- `state.js` - pure state helpers `createInitialState`, `attemptUnlock`, `reducer`, and serialization helpers
- `theme.js` - centralized color/theme mapping for elements & weapons
- `helpers.js` - small serialization helpers

Test script:
- `scripts/test-soulTree.js` - run with `node scripts/test-soulTree.js` to validate core gating and sequential progression logic.

Quick commands:

```bash
# from repo root
node scripts/test-soulTree.js
```

Migration notes:
- The modules are ESM-style and framework-agnostic. Use `attemptUnlock` from server-side validation or wire into a reducer (`reducer`) on the client.
- Persist `serializeState(state)` output to DB; hydrate with `hydrateState()`.

