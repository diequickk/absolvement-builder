// Declarative Soul Tree graph
export const SOUL_TREE_NODES = [
  // Core Attributes (must be unlocked before any specializations under them)
  { id: 'venom_core', name: 'Venom Core', type: 'core' },
  { id: 'fire_core', name: 'Pyric Core', type: 'core' },
  { id: 'physical_core', name: 'Physical Core', type: 'core' },

  // Venom linear path
  { id: 'blooming_venom', name: 'Blooming Venom', type: 'ability', coreAttributeId: 'venom_core', prereqIds: [] },
  { id: 'mugen_toxins', name: 'Mugen Toxins', type: 'ability', coreAttributeId: 'venom_core', prereqIds: ['blooming_venom'] },
  { id: 'twisting_vines', name: 'Twisting Vines', type: 'ability', coreAttributeId: 'venom_core', prereqIds: ['mugen_toxins'] },

  // Venom specialization head (requires twisting_vines and core unlocked)
  { id: 'venom_specialization', name: 'Toxin Specialization', type: 'specialization', coreAttributeId: 'venom_core', prereqIds: ['twisting_vines'] },

  // Fire branch example
  { id: 'ember_touch', name: 'Ember Touch', type: 'ability', coreAttributeId: 'fire_core', prereqIds: [] },
  { id: 'infernal_flare', name: 'Infernal Flare', type: 'ability', coreAttributeId: 'fire_core', prereqIds: ['ember_touch'] },
  { id: 'pyre_exalt', name: 'Pyre Exalt', type: 'specialization', coreAttributeId: 'fire_core', prereqIds: ['infernal_flare'] },

  // Physical examples
  { id: 'iron_stride', name: 'Iron Stride', type: 'ability', coreAttributeId: 'physical_core', prereqIds: [] },
  { id: 'brutal_swing', name: 'Brutal Swing', type: 'ability', coreAttributeId: 'physical_core', prereqIds: ['iron_stride'] },

  // Example cross-branch ability (should still require its core)
  { id: 'catechistic_of_decay', name: 'Catechistic of Decay', type: 'ability', coreAttributeId: 'venom_core', prereqIds: ['mugen_toxins'] },

  // Add further nodes as required by game design
];
