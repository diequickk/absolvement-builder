export const SKILL_ELEMENTS = [
  "Physical", "Fire", "Frost", "Shadow", "Lightning",
  "Wind", "Water", "Nature", "Disease", "Holy", "Earth", "Arcane", "Hybrid"
];

export const SKILL_TIERS = ["Basic", "Intermediate", "Advanced", "Masterful", "Support", "Special", "Legendary"];

export const SKILL_PATHS = [
  {
    id: 'crit',
    category: 'Physical',
    name: 'Crit - Soulpiercer',
    color: '#ef4444',
    nodes: [
      { id: 'crit_1', name: "Eyes of the Predator", cost: 2, desc: "After successfully parrying, your Critical strike chance is increased by 3% for 3 seconds." },
      { id: 'crit_2', name: "Heartseeker", cost: 2, desc: "Critical strike effectiveness increased by 10% against enemies below 50% health." },
      { id: 'crit_3', name: "Precision's Edge", cost: 3, desc: "Consecutive non-critical hits increase your critical strike chance by 1%. (Stacks up to 5%)" },
      { id: 'crit_4', name: "Anatomical Insight", cost: 2, desc: "Landing 2 consecutive critical hits increases your critical damage by 50% for 4 seconds." },
      { id: 'crit_5', name: "Ruthless Strike", cost: 2, desc: "Your first attack on an enemy has a 5% increased chance to critically strike." },
      { id: 'crit_6', name: "Gory Finale", cost: 1, desc: "Killing an enemy with a critical hit increases your attack speed by 10% for 20 seconds." },
    ]
  },
  {
    id: 'speed',
    category: 'Physical',
    name: 'Speed - Bladewind Disciple',
    color: '#38bdf8',
    nodes: [
      { id: 'speed_1', name: "Bladed Momentum", cost: 1, desc: "After dodging, your next m1 is 10% faster." },
      { id: 'speed_2', name: "Dancing Blades", cost: 2, desc: "When landing 3 consecutives hit, your movement speed is increased by 5% for 2 seconds." },
      { id: 'speed_3', name: "Adrenaline Rush", cost: 1, desc: "Killing an enemy reduces your dodge cooldown by 1 second." },
      { id: 'speed_4', name: "Phantom Step", cost: 2, desc: "Dodging leaves an after-image behind, confusing enemies briefly." },
      { id: 'speed_5', name: "Fury's Edge", cost: 1, desc: "Critical strikes reduce your dodge cooldown by 1.5 seconds." },
      { id: 'speed_6', name: "Unrelenting Tempo", cost: 2, desc: "Missing an M1 increases your attack speed by 2% until you hit an enemy. (Stacks up to 10%.)" },
    ]
  },
  {
    id: 'healing',
    category: 'Support',
    name: 'Healing - Luminary Pact',
    color: '#f9a8d4',
    nodes: [
      { id: 'healing_1', name: "Radiant Boon", cost: 2, desc: "When successfully healing a target, their next attack deals 5% more damage." },
      { id: 'healing_2', name: "Shared Vitality", cost: 2, desc: "Healing abilities also restore 3% of your maximum health." },
      { id: 'healing_3', name: "Guiding Light", cost: 1, desc: "Buffs your apply to allies and yourself last 20% longer." },
      { id: 'healing_4', name: "Resonant Bond", cost: 1, desc: "Standing 5 studs near an ally increases your and their movement speed by 5%." },
      { id: 'healing_5', name: "Luminous Surge", cost: 1, desc: "Cleansing a negative effect grants a 10% Mana Regeneration buff for 3 seconds." },
      { id: 'healing_6', name: "Hope's Light", cost: 2, desc: "Healing or buffing an ally increases your parry window by 25% for 2 seconds." },
    ]
  },
  {
    id: 'defense',
    category: 'Defense',
    name: "Defense - Warden's Resolve",
    color: '#94a3b8',
    nodes: [
      { id: 'defense_1', name: "Unbroken Wall", cost: 1, desc: "Reduce all incoming damage by 5% when standing still for at least 1 second." },
      { id: 'defense_2', name: "Fortifying Clash", cost: 2, desc: "Parrying reduces damage taken by 10% for 2 seconds." },
      { id: 'defense_3', name: "Retribution Stance", cost: 2, desc: "Blocking an attack with a shield increases your next parry's window by 50%" },
      { id: 'defense_4', name: "Iron grip", cost: 2, desc: "Reduces the duration of roots and slows applied to you by 20%" },
      { id: 'defense_5', name: "Staltwart Soul", cost: 2, desc: "Gain a 5% armor boost when near 2 or more enemies." },
      { id: 'defense_6', name: "Counterforce", cost: 3, desc: "Successful parries push enemy back slightly, and parry stuns for 15% longer" },
    ]
  },
  {
    id: 'water',
    category: 'Water',
    name: 'Water - Tidesage',
    color: '#3b82f6',
    nodes: [
      { id: 'water_1', name: "Fluid Motion", cost: 1, desc: "Every 15 studs you move, gain a stack of Current for 7 seconds. Current increases your movement speed by 3% (Stacks up to 9%). Max Stacks of Current is 3." },
      { id: 'water_2', name: "Resonant Waters", cost: 1, desc: "Whenever you gain or lose a stack of Current, release Ripple around you dealing 3 Water Damage to nearby enemies." },
      { id: 'water_3', name: "Tidal Guard", cost: 2, desc: "Parrying an attack refunds 1 Mana and 1 stack of current. (0.75 second cooldown)" },
      { id: 'water_4', name: "Surge barrier", cost: 1, desc: "Dodging leaves behind a Puddle for 3 seconds. Standing in your own Puddle reduces damage taken by 8%." },
      { id: 'water_5', name: "Crest and Trough", cost: 3, desc: "At maximum Current Stacks, your next attack deals 10% additional damage and consumes all stacks." },
      { id: 'water_6', name: "Undertow Adaptation", cost: 2, desc: "Standing still for 3 seconds converts Current into Undertow. Undertow increases your parry and dodge window by 20% for 20 seconds." },
    ],
    subs: [
      {
        id: 'water_depthbinder',
        name: '1st Water Sub - Depthbinder',
        color: '#1e40af',
        nodes: [
          { id: 'water_sub1_1', name: "Stillwater Bastion", cost: 1, desc: "Undertow grants you 15% increased parry windows. Locks Out Waveform Strikes", locksOut: ['water_sub2_1'] },
          { id: 'water_sub1_2', name: "Bracing Depths", cost: 1, desc: "Standing in a Puddle while under Undertow heals you for 3 every seconds." },
          { id: 'water_sub1_3', name: "Calm Before the Storm", cost: 3, desc: "Every time you gain Undertow, you next attacks Stuns for 1 seconds. This effect has a 20 seconds cooldown" },
          { id: 'water_sub1_4', name: "Abyssal Anchor", cost: 2, desc: "Enemies who attack you while Undertow is active, movement speed is reduced by 10% for 3 seconds (Stacks up to 30%.)" },
          { id: 'water_sub1_5', name: "Drowning Presence", cost: 2, desc: "Activating Undertow creates a zone that slows all enemies inside of it by 20% while inside. This area will last for 7 seconds." },
          { id: 'water_sub1_6', name: "Echoing Abyss", cost: 2, desc: "When Undertow ends, release a burst that knocks enemies away from you and deals Water Damage based on how long you were stationary. Deals 1 Water Damage per second." },
        ]
      },
      {
        id: 'water_flowmaster',
        name: '2nd Water Sub - Flowmaster',
        color: '#0ea5e9',
        nodes: [
          { id: 'water_sub2_1', name: "Waveform Strikes", cost: 2, desc: "When reaching maximum Current Stacks, your next 2 attacks chain a wave to a nearby enemy for 50% of the original damage. Each wave consumes 1 stack of Current. Locks Out Stillwater Bastion", locksOut: ['water_sub1_1'] },
          { id: 'water_sub2_2', name: "Ebb and Blitz", cost: 2, desc: "Every time you gain a stack of Current, reduce your skill's cooldowns by 0.5 seconds." },
          { id: 'water_sub2_3', name: "Torrent Spiral", cost: 2, desc: "After consuming Current, gain 20% movement speed for 5 seconds. (Can only stack once.)" },
          { id: 'water_sub2_4', name: "Aquatic Vortex", cost: 2, desc: "Dodging an attack after reaching max Current pulls them slightly towards you and slows by 15% for 5 seconds. Consumes 1 stack of Current." },
          { id: 'water_sub2_5', name: "Crashing Waveform", cost: 3, desc: "After Successfully hitting an enemy with Waveform Strikes, a delayed Whirpool opens at their location. This whirpool will deal 3 Water Damage, but does not have a rip current pull." },
          { id: 'water_sub2_6', name: "Flow Unleashed", cost: 2, desc: "At maximum Current Stacks, dodging now triggers Resonant Waters twice and resets the cooldown of your next dodge. This effect has a 15 second cooldown." },
        ]
      }
    ]
  },
  {
    id: 'earth',
    category: 'Earth',
    name: 'Earth - Stoneblood Citadel',
    color: '#d97706',
    nodes: [
      { id: 'earth_1', name: "Petrified Endurance", cost: 1, desc: "While standing still for 3 seconds, gain a stack of Stoneblood. Stoneblood decreases your damage taken by 5%, stacking up to 3 times." },
      { id: 'earth_2', name: "Stoneheart Vitality", cost: 1, desc: "While at maximum health, take 10% less damage." },
      { id: 'earth_3', name: "Crack the Earth", cost: 2, desc: "Critical strikes causes small fissures to crack underneath the target's feet, dealing 4 Earth Damage per second for 4 seconds. (3 second cooldown)" },
      { id: 'earth_4', name: "Unyielding Aura", cost: 1, desc: "While a shield is equipped, enemies within 5 studs have their attack speed reduced by 5%" },
      { id: 'earth_5', name: "Earthen Resurgence", cost: 2, desc: "Every time you successfully parry an attack, heal for 0.4% of your maximum health over 1.5 seconds." },
      { id: 'earth_6', name: "Faultline Ward", cost: 2, desc: "After taking 3 consecutive hits within 5 seconds, your next parry has 30% longer window." },
    ],
    subs: [
      {
        id: 'earth_bastion',
        name: '1st Earth Sub - Living Bastion',
        color: '#92400e',
        nodes: [
          { id: 'earth_sub1_1', name: "Ironclad Stance", cost: 1, desc: "While holding a shield, all incoming damage is reduced by 5%, and successfully parrying an enemy will apply a 20% slow for 1 second. Locks out Shatterstrike", locksOut: ['earth_sub2_1'] },
          { id: 'earth_sub1_2', name: "Earthbound Fortitude", cost: 2, desc: "Standing still for 3 seconds summons a ring of stone spikes around you, dealing 6 Earth Damage to enemies that cross it." },
          { id: 'earth_sub1_3', name: "Crumbling Aegis", cost: 2, desc: "Successful parries causes a fragment of stone to break off, orbiting you and absorbing 10% of the next hit you take. (Stacks up to 2 times, 1.25 second cooldown)" },
          { id: 'earth_sub1_4', name: "Fortress of Stone", cost: 2, desc: "While at maximum Stonebleed stacks, gain immunity to knockback and roots." },
          { id: 'earth_sub1_5', name: "Shardstorm", cost: 3, desc: "When your Crumbling Aegis fragment is broken, it explodes, dealing 3 Earth Damage to all nearby enemies within 6 studs." },
          { id: 'earth_sub1_6', name: "Citadel's Will", cost: 1, desc: "For every enemy within your Earthbound Fortitude ring. you take 3% less damage." },
        ]
      },
      {
        id: 'earth_wrath',
        name: '2nd Earth Sub - Seismic Wrath',
        color: '#ea580c',
        nodes: [
          { id: 'earth_sub2_1', name: "ShatterStrike", cost: 1, desc: "Critical hits on rooted or slowed enemies deal 10% more damage as Earth Damage. Locks out Ironclad Stance", locksOut: ['earth_sub1_1'] },
          { id: 'earth_sub2_2', name: "Quaking Blows", cost: 1, desc: "Hitting an enemy standing atop a fissure will cause the fissure to expand, increasing in radius and dealing 5% Additional Earth Damage." },
          { id: 'earth_sub2_3', name: "Earthen Crush", cost: 2, desc: "Enemies standing still longer then 2 seconds around you are Crushed, reducing their armor by 10% for 5 seconds. If an enemy is affected by a root of stun, Crush is applied instantly and takes 10% Additional Earth Damage while Crushed." },
          { id: 'earth_sub2_4', name: "Boulderfall", cost: 2, desc: "Parrying while standing in a Crack the Earth fissure causes a chunk of stone to fall from above, dealing 10 Earth Damage to 1 enemy within range of the rock. (1.25 second cooldown)" },
          { id: 'earth_sub2_5', name: "Seismic Rupture", cost: 3, desc: "When an enemy dies on a fissure, it collapses. dealing 8 Earth Damage and stunning nearby enemies from 1 second." },
          { id: 'earth_sub2_6', name: "Echoing Quake", cost: 2, desc: "When critically striking with an Earth attack, cause a small quake that refreshes Crack the Earth's duration." },
        ]
      }
    ]
  },
  {
    id: 'frost',
    category: 'Frost',
    name: 'Frost - Heart of Winter',
    color: '#67e8f9',
    nodes: [
      { id: 'frost_1', name: "Cold-Blooded", cost: 2, desc: "Your attacks now have a 5% chance to apply Chill." },
      { id: 'frost_2', name: "Rimefang's Bite", cost: 1, desc: "Dealing Frost Damage to an enemy with existing Chill Stacks deals 5% more damage and refreshes the Chill duration." },
      { id: 'frost_3', name: "Frozen Resilience", cost: 2, desc: "While an enemy is Chilled, they deal 10% less damage to you." },
      { id: 'frost_4', name: "Cracking Point", cost: 2, desc: "If an enemy is hit with Chill 3 times within 6 seconds, they will become Brittle, increasing the damage they take from your next attack by 15%." },
      { id: 'frost_5', name: "Glacial Flow", cost: 2, desc: "Chill effects can spread to 1 additional enemy nearby when first applied." },
      { id: 'frost_5b', name: "Glacial Flow II", cost: 1, desc: "Chill effect now spreads to 2 enemies." },
      { id: 'frost_5c', name: "Deep Freeze", cost: 2, desc: "Chilled enemies have their movement speed reduced by an additional 10%." },
    ],
    subs: [
      {
        id: 'frost_shattermaster',
        name: '1st Frost Sub - Shattermaster',
        color: '#06b6d4',
        nodes: [
          { id: 'frost_sub1_1', name: "Ice Breaker", cost: 1, desc: "Attacking a Frozen enemy deals Additional Frost Damage equal to 1% of their missing health. Locks Out Winter's Grasp", locksOut: ['frost_sub2_1'] },
          { id: 'frost_sub1_2', name: "Glacial Surge", cost: 2, desc: "Striking a Frozen enemy twice breaks the ice and releases an ice shockwave, dealing Frost Damage equal to the damage dealt to them while frozen" },
          { id: 'frost_sub1_3', name: "Brittle Frost", cost: 2, desc: "Critical strikes against Chilled enemies has a 20% to freeze them instantly." },
          { id: 'frost_sub1_4', name: "Shattering Point", cost: 1, desc: "Damage dealt to Frozen enemies ignore 15% of their armor." },
          { id: 'frost_sub1_5', name: "Avalanche Strike", cost: 3, desc: "Attacking a Frozen enemy has a 25% chance to spread Chill to up to 3 nearby enemies." },
          { id: 'frost_sub1_6', name: "Fractured Heart", cost: 1, desc: "If an enemy dies while Frozen, they will explode into icy shards, dealing 6 Frost Damage to nearby enemies." },
        ]
      },
      {
        id: 'frost_control',
        name: '2nd Frost Sub - Glacial Control',
        color: '#0891b2',
        nodes: [
          { id: 'frost_sub2_1', name: "Winter's Grasp", cost: 3, desc: "Enemies Chilled for more then 12.5 seconds will become Frozen for 0.8 seconds. Locks Out Icebreaker", locksOut: ['frost_sub1_1'] },
          { id: 'frost_sub2_2', name: "Hoarfrost Aura", cost: 1, desc: "While near a Frozen enemy, you will emit a frost aura that slows all nearby enemies by 20%." },
          { id: 'frost_sub2_3', name: "Permafrost", cost: 3, desc: "Enemies no longer lose their Chill Stacks when freezing them." },
          { id: 'frost_sub2_4', name: "Frigid Shackles", cost: 2, desc: "Frozen enemies have their attack speed reduced by 20% for 4 seconds after thawing." },
          { id: 'frost_sub2_5', name: "Crystallize", cost: 3, desc: "When a Frozen enemy thaws, ice shards explode outward, applying Chill to nearby enemies." },
          { id: 'frost_sub2_6', name: "Endless Winter", cost: 1, desc: "Your Chill lasts 50% longer." },
        ]
      }
    ]
  },
  {
    id: 'disease',
    category: 'Disease',
    name: 'Disease - Plagueborn',
    color: '#84cc16',
    nodes: [
      { id: 'disease_1', name: "Virulent Strain", cost: 1, desc: "Disease damage has a 10% chance to apply Disease for 5 seconds." },
      { id: 'disease_2', name: "Septic Wounds", cost: 1, desc: "Enemies affected by Rot take 5% more damage from you." },
      { id: 'disease_3', name: "Blood Plague Infusion", cost: 3, desc: "Critical Strikes on enemies affected by Rot will apply Blood Plague for 4 seconds." },
      { id: 'disease_4', name: "Contagion", cost: 2, desc: "When an enemy affected by Rot dies, they will release a Rot Cloud, infecting nearby enemies with Rot." },
      { id: 'disease_5', name: "insidious Growth", cost: 2, desc: "Each tick of Rot and Disease has 5% chance to spread Rot to a nearby enemy." },
      { id: 'disease_6', name: "Plagued Vitality", cost: 2, desc: "While near an enemy affected by Rot, Disease, or Blood Plague, you regenerate an additional 1.25% of your maximum mana per second." },
    ],
    subs: [
      {
        id: 'disease_decay',
        name: '1st Disease Sub - Withering Decay',
        color: '#65a30d',
        nodes: [
          { id: 'disease_sub1_1', name: "Withering Soul", cost: 1, desc: "Enemies affected by Blood Plague now regenerate mana 15% slower. Locks Out Festering Blow", locksOut: ['disease_sub2_1'] },
          { id: 'disease_sub1_2', name: "Crippling Infection", cost: 2, desc: "Rot and Disease infected enemies now run 10% slower." },
          { id: 'disease_sub1_3', name: "Sapping Plague", cost: 2, desc: "Each tick of Blood Plague has a 12.5% chance to drain mana from the enemy, restoring 2% of your maximum mana." },
          { id: 'disease_sub1_4', name: "Erosion", cost: 2, desc: "Enemies suffering from Rot or Disease will now take 5% Increased Damage from ALL Elemental Sources. (Stacks up to 15%)" },
          { id: 'disease_sub1_5', name: "Virulent Suppression", cost: 2, desc: "When you apply Blood Plague to an enemy, their healing received is reduced by 10% for 5 seconds." },
          { id: 'disease_sub1_6', name: "Blighted Endurance", cost: 2, desc: "While within 15 studs of an enemy infected with Blood Plague you gain 5% damage resistance." },
          { id: 'disease_sub1_7', name: "Decay's Embrace", cost: 3, desc: "Your Disease ticks now have a 15% chance to consume 1% of the enemy's maximum mana. If the enemy's mana is above 30%, this effect is doubled." },
        ]
      },
      {
        id: 'disease_epidemic',
        name: '2nd Disease Sub - Corruptive Epidemic',
        color: '#a3e635',
        nodes: [
          { id: 'disease_sub2_1', name: "Festering Blow", cost: 1, desc: "Striking a Disease-affected enemy increases their Disease duration by 0.2 seconds. Locks Out Withering Soul", locksOut: ['disease_sub1_1'] },
          { id: 'disease_sub2_2', name: "Pathogenic Pulse", cost: 2, desc: "Every time Rot or Disease spreads to a new enemy, the new host will take 10% Increased Disease Damage for 10 seconds." },
          { id: 'disease_sub2_3', name: "Viral Cascade", cost: 3, desc: "When Rot spreads to 3 or more enemies at once. it will cause a Rot Explosion, dealing 10 Disease Damage and applying Blood Plague to nearby enemies. (very slight cooldown)" },
          { id: 'disease_sub2_4', name: "Pestilent Wave", cost: 2, desc: "Every time Blood Plague is applied, it increases your attack speed by 5% for 4 seconds. (Stacks up to 15%)" },
          { id: 'disease_sub2_5', name: "Carriers of Corruption", cost: 2, desc: "If an enemy afflicted by Rot, Disease, or Blood Plague die, they have a 20% chance to reanimate for 10 seconds, attacking nearby enemies before collapsing." },
          { id: 'disease_sub2_6', name: "Ravenous Outbreak", cost: 2, desc: "If the Rot Explosion affects at least 5 enemies, the effect will re-detonate after 2 seconds but deal half of the original damage." },
          { id: 'disease_sub2_6a', name: "Ravenous Outbreak IIB", cost: 1, desc: "Detonation now deals 75% of the original damage. Locks Out Ravenous Outbreak IIA", locksOut: ['disease_sub2_6b'] },
          { id: 'disease_sub2_6b', name: "Ravenous Outbreak IIA", cost: 1, desc: "Requirement reduced to 4 enemies. Locks Out Ravenous Outbreak IIB", locksOut: ['disease_sub2_6a'] },
          { id: 'disease_sub2_7', name: "Epidemic Catalyst", cost: 3, desc: "Your Rot can spread 25% further. Your chances of 'Insidious Growth' to trigger is now doubled." },
        ]
      }
    ]
  },
  {
    id: 'nature',
    category: 'Nature',
    name: 'Nature - Venomous Bloom',
    color: '#22c55e',
    nodes: [
      { id: 'nature_1', name: "Toxicity", cost: 1, desc: "Every application of Poison will cause enemies to take 1% Additional Poison Damage until they die." },
      { id: 'nature_2', name: "Adaptive Roots", cost: 1, desc: "Striking an enemy with Nature Damage will slow their movement speed by 5% for 5 seconds. (Stacks up to -15%)" },
      { id: 'nature_3', name: "Venom Infusion", cost: 2, desc: "Critical strikes apply Virulent Poison, dealing 20% more damage but reducing the duration by 20%" },
      { id: 'nature_4', name: "Lingering Spores", cost: 2, desc: "When a Poisoned enemy dies, they will release Spores. Spreading Poison to all nearby enemies that touch them. This Poison Application will deal 50% of the original damage." },
      { id: 'nature_5', name: "Serpent's Embrace", cost: 2, desc: "While enemies are moving, your Poisons will tick 15% Faster" },
      { id: 'nature_6', name: "Ivy Veins", cost: 2, desc: "Each stack of Poison has 10% chance of spreading to nearby enemy once the first tick has passed." },
    ],
    subs: [
      {
        id: 'nature_thicket',
        name: '1st Nature Sub - Corrupted Thicket',
        color: '#16a34a',
        nodes: [
          { id: 'nature_sub1_1', name: "Entangling Thorns", cost: 1, desc: "When you Poison an enemy, there is a 10% chance for thorns to sprout beneath them, rooting in place for 1 second. Locks Out Blooming Venom", locksOut: ['nature_sub2_1'] },
          { id: 'nature_sub1_1a', name: "Entangling Thorns II", cost: 1, desc: "Chance increased to 12%, and Root increased to 1.5 seconds, but add a 4 second cooldown." },
          { id: 'nature_sub1_2', name: "Venomous Ground", cost: 2, desc: "Killing a Poisoned enemy creates a Poison Patch for 7 seconds, dealing 4 Nature Damage to enemies standing in it." },
          { id: 'nature_sub1_3', name: "Briar Surge", cost: 3, desc: "Enemies standing in the Poison Patch take 15% increased Nature Damage from all sources." },
          { id: 'nature_sub1_4', name: "Creeping Decay", cost: 2, desc: "If an enemy stands in a Poison Patch consecutively for 2 seconds, they will gain a stack of Venomrot, dealing incremental Poison Damage over time for 4 seconds." },
          { id: 'nature_sub1_5', name: "Verdant Snare", cost: 2, desc: "Applying Poison to a rooted enemy causes other enemies within 10 studs to be slowed by 25% for 3 seconds." },
          { id: 'nature_sub1_6', name: "Suffocating Vines", cost: 3, desc: "Enemies standing in a Poison Patch for more then 2 consecutive seconds will also be unable to regenerate mana." },
          { id: 'nature_sub1_7', name: "Thorned Dominion", cost: 3, desc: "Standing in your OWN Poison Patch grants you 5% increased movement speed and 15% damage resistance." },
        ]
      },
      {
        id: 'nature_bloom',
        name: '2nd Nature Sub - Virulent Bloom',
        color: '#4ade80',
        nodes: [
          { id: 'nature_sub2_1', name: "Blooming Venom", cost: 1, desc: "When Critically striking an enemy with a Poison attack, it will deal 15% more damage but lasts 1 second less. Locks Out Entangling Thorns", locksOut: ['nature_sub1_1'] },
          { id: 'nature_sub2_2', name: "Mutagenic Toxins", cost: 2, desc: "If you apply Poison to an already Poisoned enemy, it will evolve into Blight Poison, dealing 15% more damage." },
          { id: 'nature_sub2_3', name: "Twisting Vines", cost: 3, desc: "Enemies afflicted with Blight Poison will now take 10% increased damage from all sources for 4 seconds." },
          { id: 'nature_sub2_4', name: "Venomous Renewal", cost: 2, desc: "When a Poison evolves into a Blight Poison, you regenerate 5% of your maximum mana." },
          { id: 'nature_sub2_5', name: "Adaptive Toxins", cost: 2, desc: "If an enemy afflicted with Blight Poison dies, their Poison will spread as Blight Poison to 2 nearby enemies instead of normal Poison." },
          { id: 'nature_sub2_6', name: "Catalyst of Decay", cost: 2, desc: "When you apply Blight Poison, the target's Nature Resistance is reduced by 15% for 5 seconds." },
        ]
      }
    ]
  },
  {
    id: 'fire',
    category: 'Fire',
    name: "Fire - Inferno's Dominion",
    color: '#ef4444',
    nodes: [
      { id: 'fire_1', name: "Kindling Fury", cost: 1, desc: "For every Burn Stack you apply to an enemy, gain 1% attack speed for 10 seconds (Stacks up to 5%)" },
      { id: 'fire_2', name: "Blazing Momentum", cost: 1, desc: "Dealing Fire Damage increases your movement speed by 5% for 2 seconds. (Stacks up to 10%)" },
      { id: 'fire_3', name: "Ignition Point", cost: 2, desc: "Your Burns will last an additional second, but will deal 10% less damage" },
      { id: 'fire_4', name: "Incendiary Strikes", cost: 2, desc: "Critical Strikes with Fire Damage spread a weaker Burn to nearby enemy, dealing 50% of the original Burn's damage." },
      { id: 'fire_5', name: "Combustion Surge", cost: 2, desc: "When an enemy takes damage from a Burn Stack there is a 10% chance to Ignite them further, causing the Burn to deal damage twice as fast for 3 seconds." },
    ],
    subs: [
      {
        id: 'fire_volcanic',
        name: '1st Fire Sub - Volcanic Rupture',
        color: '#dc2626',
        nodes: [
          { id: 'fire_sub1_1', name: "Flashpoint", cost: 1, desc: "When an enemy with a Burn drops below 30% health, all Burn Stacks tick 50% faster. Locks Out Everlasting Flame", locksOut: ['fire_sub2_1'] },
          { id: 'fire_sub1_2', name: "Ashen Eruption", cost: 2, desc: "When enemies die with active Burn Stacks they will combust, dealing 55% of the remaining Burn Damage to all nearby enemies." },
          { id: 'fire_sub1_3', name: "Volatile Flame", cost: 3, desc: "Every Burn Stack you apply has a 20% chance to instantly detonate, dealing 50% of it's full duration's damage and consuming the Burn Stack" },
          { id: 'fire_sub1_4', name: "Pyroclastic Burst", cost: 2, desc: "Critical strikes with Fire attacks now have a 20% chance to detonate all Burns on an enemy, instantly dealing all remaining fire damage and spreading a weaker Burn Stack to all nearby enemies." },
          { id: 'fire_sub1_5', name: "Molten Rebound", cost: 2, desc: "When an enemy explodes from Ashen Eruption, all other enemies with Burn Stacks have a 25% to cause a chain reaction and also detonate" },
          { id: 'fire_sub1_6', name: "Hellfire Cascade", cost: 2, desc: "Enemies hit by explosions become Burned by the explosion, applying a Burn Stack for 55% of the original explosion's damage." },
          { id: 'fire_sub1_7', name: "Infernal Detonation", cost: 3, desc: "When any Burn Stack is detonated, it will leave behind a Flame Vortex -- a swirling firestorm dealing 3.5 Fire Damage per second for 3 seconds." },
        ]
      },
      {
        id: 'fire_scorching',
        name: '2nd Fire Sub - Scorching Wrath',
        color: '#f97316',
        nodes: [
          { id: 'fire_sub2_1', name: "Everlasting Flame", cost: 1, desc: "Burns last 20% longer but tick 10% slower. Locks Out Flashpoint", locksOut: ['fire_sub1_1'] },
          { id: 'fire_sub2_2', name: "Blistering Heat", cost: 2, desc: "After Burning for 5 seconds, Burn Stacks will convert into a Searing Burn, dealing 15% More Fire Damage per tick." },
          { id: 'fire_sub2_3', name: "Flame Ascension", cost: 3, desc: "After Burning from a Searing Burn for 10 seconds, all Searing Burns will evolve into a Scorching Brand dealing 25% More Fire Damage per tick. Additionally, their Fire Resistance is reduced by 10%." },
          { id: 'fire_sub2_4', name: "Emberstorm", cost: 2, desc: "Everytime a Burn Stack is converted into a Searing Burn OR a Searing Burn is converted into a Scorching Brand, you deal 2% Additional Fire Damage for 10 seconds (stacking up to 10%)" },
          { id: 'fire_sub2_5', name: "Infernal Conviction", cost: 2, desc: "Searing Burns on enemies now pulse Radiant Heat every 2 seconds, dealing 3.5 Fire Damage around them." },
          { id: 'fire_sub2_6', name: "Living Ember", cost: 2, desc: "Each time a Burn Stack evolves into a Scorching Brand, a fire spirit will ignite and chase enemies, inflicting a Burn Stack on impact. Fire Spirits will only survive for 5 seconds" },
          { id: 'fire_sub2_7', name: "Brand of the Eternal Pyre", cost: 3, desc: "When a Scorching Brand expires, it will leave behind a lingering Flamezone that Burns enemies. This Burn will deal the same DPS Scorching Brand Dealt over 4 seconds. The Flamezone will last for 4 seconds" },
        ]
      }
    ]
  },
  {
    id: 'lightning',
    category: 'Lightning',
    name: 'Lightning - Thrones of the Tempest',
    color: '#facc15',
    nodes: [
      { id: 'lightning_1', name: "Crackling Essence", cost: 1, desc: "Hitting an enemy with a Lightning attack will generate one Spark. Critical Lightning attacks will generate three Sparks. Sparks increase your mana regeneration by 1% and your critical strike chance by 0.5%. You can have a maximum of 8 Sparks, and will discharge one Spark every 3 seconds while not using any Lightning Skills." },
      { id: 'lightning_2', name: "Jolted Reflex", cost: 1, desc: "Dodging while 5 Sparks are active will leave behind an active lightning wire, dealing 5 Lightning Damage to those who touch it. This wire will last 6 seconds before deactivating. Summoning a lightning wire will consume 1 Spark." },
      { id: 'lightning_3', name: "Live Wire", cost: 2, desc: "Critically striking with a Lightning attack will consume 2 Sparks to deal bonus damage equal to 5% of the enemy's missing mana. If it would deal less than 5 Damage, it will not consume Spark." },
      { id: 'lightning_4', name: "Overcurrent", cost: 2, desc: "If you generate a Spark while being at max Spark capacity, the spare Spark will arc to a nearby enemy, dealing 5 Lightning Damage." },
      { id: 'lightning_5', name: "Resonant Charge", cost: 2, desc: "Each Spark increases Lightning Damage by 3%. Losing a Spark will slow your movement speed by 10%." },
      { id: 'lightning_6', name: "Storm Engine", cost: 2, desc: "Whenever you gain or lose a Spark, increase your attack speed by 2% for 3 seconds, stacking up to a total of 10%." },
    ],
    subs: [
      {
        id: 'lightning_storm',
        name: '1st Lightning Sub - Living Storm',
        color: '#eab308',
        nodes: [
          { id: 'lightning_sub1_1', name: "Crackling Storm", cost: 1, desc: "When you exhuast all of your Sparks, you are no longer slowed and you release a Thunderclap that deals 10 Lightning Damage to all nearby enemies. Locks Out Arclash", locksOut: ['lightning_sub2_1'] },
          { id: 'lightning_sub1_2', name: "Voltaic Surge", cost: 2, desc: "Overcurrent now has an additional 10% chance to strike an additional target." },
          { id: 'lightning_sub1_3', name: "Stormpulse", cost: 3, desc: "If you lose 5 Sparks within 3 seconds, trigger a Stormpulse that deals 7 Lightning Damage to all enemies nearby and stuns for 0.5 seconds." },
          { id: 'lightning_sub1_4', name: "Spark Eruption", cost: 2, desc: "When you fall below 3 Sparks, release an electric burst that chains to a maximum of 2 additional enemies, dealing 4 Lightning Damage. This effect has a 20 second cooldown." },
          { id: 'lightning_sub1_5', name: "Electrified Chaos", cost: 2, desc: "Losing more than one Spark at a time will give Stormpulse 15% additional range, up to 50%." },
          { id: 'lightning_sub1_6', name: "Cataclysmic Discharge", cost: 3, desc: "Losing all Sparks within 5 seconds will unleash a Storm Vortex for 3 seconds, pulling in enemies and dealing 9 Lightning Damage. When the Storm Vortex disappears, your mana regeneration is reduced by 25% for 5 seconds. (10 second cooldown)" },
        ]
      },
      {
        id: 'lightning_piercer',
        name: '2nd Lightning Sub - Stormpiercer',
        color: '#fde047',
        nodes: [
          { id: 'lightning_sub2_1', name: "Arclash", cost: 1, desc: "Critical strikes will generate a Spark and briefly Disrupt an enemy, slowing their mana regeneration by 15% and stunning them for 0.15s. Locks Out Crackling Storm", locksOut: ['lightning_sub1_1'] },
          { id: 'lightning_sub2_2', name: "Sundered Conduit", cost: 2, desc: "Landing a Lightning critical strike on an enemy causes them to become Overloaded, stopping all mana regeneration and slowing them by 15% for 5 seconds." },
          { id: 'lightning_sub2_3', name: "Spark Reaper", cost: 2, desc: "Killing an Overloaded enemy grants you 3 Sparks." },
          { id: 'lightning_sub2_4', name: "Lightning Fang", cost: 3, desc: "Attacks against Overloaded enemies deal 10% Bonus Damage as Lightning Damage and ignore 20% of their armor." },
          { id: 'lightning_sub2_5', name: "Severed Currents", cost: 2, desc: "If an Overloaded enemy dies, consume their mana and cause a shockwave that stuns nearby enemies for 1 second and deals half of the enemy's mana as Lightning Damage" },
        ]
      }
    ]
  },
  {
    id: 'shadow',
    category: 'Shadow',
    name: 'Shadow - Embrace of the Void',
    color: '#a855f7',
    nodes: [
      { id: 'shadow_1', name: "Withering Touch", cost: 1, desc: "Shadow attacks have a 20% chance to apply Voidrot, reducing the enemy's mana by 10 per second for 5 seconds." },
      { id: 'shadow_2', name: "Essence Leech", cost: 2, desc: "Enemies affected by Voidrot have a 10% chance to fail spellcasts and 50% of the mana is granted to you." },
      { id: 'shadow_3', name: "Lingering Dusk", cost: 2, desc: "When an enemy affected with Voidrot dies, they will release an umbral pulse that distorts enemy vision, applies Voidrot, and temporarily blinding them. The blindness will last for 3 seconds unless attacked." },
      { id: 'shadow_4', name: "Darkened Mind", cost: 2, desc: "Critical strikes on enemies inflicted with Voidrot will push them to madness, causing them to be Stunned for 2 seconds." },
      { id: 'shadow_5', name: "Siphon Soul", cost: 2, desc: "Attacks against enemies with less than 50% mana will restore 2 Mana as you feed off their weakened state." },
      { id: 'shadow_6', name: "Unseen Agony", cost: 2, desc: "Every stack of Voidrot will reduce enemy attack speed by 2%, up to 10%." },
    ],
    subs: [
      {
        id: 'shadow_veil',
        name: '1st Shadow Sub - Veil of the Forgotten',
        color: '#9333ea',
        nodes: [
          { id: 'shadow_sub1_1', name: "Shrouded Steps", cost: 1, desc: "Killing an enemy affected by VoidRot grants Shadowmeld for 3 seconds, turning you invisible unless you attack. Locks Out Mana Fracture", locksOut: ['shadow_sub2_1'] },
          { id: 'shadow_sub1_1a', name: "Shrouded Steps II", cost: 1, desc: "Shadowmeld duration increased to 5 seconds." },
          { id: 'shadow_sub1_2', name: "Duskweaver", cost: 2, desc: "Successfully dodging an attack from an enemy affflicted with Voidrot will cause their vision to blur and they will be Stunned for 0.25 seconds." },
          { id: 'shadow_sub1_3', name: "Phantom's Touch", cost: 3, desc: "When Voidrot expires on an enemy, there is a 15% chance a phantasmal backlash occurs, inflicting shadow pins and reapplying Voidrot." },
          { id: 'shadow_sub1_4', name: "Silent Torment", cost: 3, desc: "Attacking a blinded enemy or an enemy afflicted with insanity with a Shadow attack increases its damage by 20%" },
          { id: 'shadow_sub1_5', name: "Nightfall's Embrace", cost: 1, desc: "Entering Shadowmeld will cause a Void Echo to appear at your last 'known' location for 3 seconds. Enemies will be drawn to the Void Echo instead of you, and if the Void Echo is hit, it will deal 8 Shadow Damage in retaliation." },
          { id: 'shadow_sub1_6', name: "Eternal Midnight", cost: 2, desc: "When an enemy afflicated with Voidrot dies, they will leave behind a Void Echo. The Void Echo will replicate the last move the enemy did before dying, now hitting other enemies with it." },
        ]
      },
      {
        id: 'shadow_corruption',
        name: '2nd Shadow Sub - Umbral Corruption',
        color: '#c084fc',
        nodes: [
          { id: 'shadow_sub2_1', name: "Mana Fracture", cost: 1, desc: "Enemies affected by Voidrot take increased Shadow Damage based on the percent of their missing mana. +50% Shadow Damage at 0% Mana. Locks Out Shrouded Steps", locksOut: ['shadow_sub1_1'] },
          { id: 'shadow_sub2_2', name: "Essence Collapse", cost: 2, desc: "If an enemy affected by Voidrot drops below 33% mana, a minor shockwave will trigger, spreading Voidrot to nearby enemies." },
          { id: 'shadow_sub2_3', name: "Oblivion Spike", cost: 3, desc: "Attacks against enemies under 25% Mana will cause void spikes to erupt from their body, dealing 12 Shadow Damage to nearby enemies. (8 second cooldown)" },
          { id: 'shadow_sub2_4', name: "Draining Pulse", cost: 2, desc: "Striking a mana-starved (below 25%) enemy boosts your mana and health regeneration by 10% for 3 seconds." },
          { id: 'shadow_sub2_5', name: "Corrupted Core", cost: 2, desc: "If any enemy afflicted with Voidrot runs out of mana, their Voidrot becomes Unstable Void, dealing 5 Shadow Damage every second until they reach 15% mana" },
          { id: 'shadow_sub2_6', name: "Void Rift", cost: 3, desc: "If a mana-starved enemy dies while afflicted with Voidrot, the rot unravels into a Voidrift, siphoning nearby enemies of their mana, draining at a rate of 2.5 mana per second. Enemies that have 10 mana drained from the Voidrift are inflicted with Voidrot and are disoriented for 2 seconds." },
        ]
      }
    ]
  },
  {
    id: 'holy',
    category: 'Holy',
    name: 'Holy - Light of Absolution',
    color: '#fde68a',
    nodes: [
      { id: 'holy_1', name: "Divine Wounds", cost: 1, desc: "Holy damage has a 10% chance to apply Radiance to enemies, dealing 3 Holy Damage every second for 5 seconds." },
      { id: 'holy_2', name: "Sacred Authority", cost: 1, desc: "Enemies affected by Radiance take 10% more Holy Damage." },
      { id: 'holy_3', name: "Blessed Strikes", cost: 2, desc: "Enemies affected by Radiance will grant you 1 Mana when hit by a melee attack." },
      { id: 'holy_4', name: "Purge the Wicked", cost: 2, desc: "Attacking an enemy with Blood Plague, Insanity, or Rot, will cause the debuffs to be purged off in a Holy burst, dealing 12 Holy Damage. (3 second cooldown, only m1s proc it)" },
      { id: 'holy_5', name: "Hallowed Ground", cost: 2, desc: "If an enemy dies while Radiance is active, leave behind a Hallowed Ground that heal you and allies for 5 Health. Hallowed Ground will last for 8 seconds and can only be summoned once every 20 seconds." },
      { id: 'holy_6', name: "Righteous Zeal", cost: 1, desc: "If a Holy Buff is applied to you, gain 3 Walkspeed for 8 seconds." },
    ],
    subs: [
      {
        id: 'holy_bastion',
        name: '1st Holy Sub - Divine Bastion',
        color: '#fbbf24',
        nodes: [
          { id: 'holy_sub1_1', name: "Shield of Faith", cost: 1, desc: "When reaching 40% health, gain a Holy barrier with 10 charges that absorbs 15% incoming damage each hit. You can only lose a charge every second. Locks Out Heavenly Wrath", locksOut: ['holy_sub2_1'] },
          { id: 'holy_sub1_2', name: "Sanctuary", cost: 2, desc: "Remaining still for 2 seconds will cause you to enter a meditative state, healing nearby allies for 4 Holy and increasing your armor by 25 while in this state." },
          { id: 'holy_sub1_3', name: "Aegis of the Righteous", cost: 3, desc: "If an enemy hits you while you are attempting to cast a Holy spell, you will be given I-frames for 1.5 seconds instead. (30 second cooldown)" },
          { id: 'holy_sub1_4', name: "Blessed Resilience", cost: 2, desc: "While any Holy Buff is active on you, all damage is reduced by 10%." },
          { id: 'holy_sub1_5', name: "Retribution Shield", cost: 2, desc: "When Holy Shield breaks, deal 15 Holy Damage to nearby enemies and knock them back." },
          { id: 'holy_sub1_6', name: "Divine Intervention", cost: 4, desc: "Upon taking fatal damage, heal to 20% Maximum Health instead. (3 dungeon cooldown)" },
          { id: 'holy_sub1_6a', name: "Divine Intervention II", cost: 1, desc: "Cooldown of Divine Intervention is now 2 dungeons." },
        ]
      },
      {
        id: 'holy_judgement',
        name: '2nd Holy Sub - Radiant Judgement',
        color: '#fef08a',
        nodes: [
          { id: 'holy_sub2_1', name: "Heavenly Wrath", cost: 2, desc: "If an enemy dies while Radiance is active, they will also explode in a Holy Nova dealing 10 Holy Damage to nearby enemies. Locks Out Shield of Faith", locksOut: ['holy_sub1_1'] },
          { id: 'holy_sub2_2', name: "Angelic Rebuke", cost: 3, desc: "If an enemy has Radiance and attacks you, they are knocked back and slowed by 25% for 5 seconds. Radiance is consumed when this occurs. (20 second cooldown)" },
          { id: 'holy_sub2_3', name: "Smite the Unworthy", cost: 1, desc: "Critical attacks now apply Radiance." },
          { id: 'holy_sub2_4', name: "Judgement of Light", cost: 2, desc: "Attacking an enemy while they are not in combat and have full health is a guaranteed critical strike and will apply an empowered Radiance. This effect is double the original duration of Radiance." },
          { id: 'holy_sub2_5', name: "Cleansing Blade", cost: 3, desc: "If an enemy has Blood Plague, Insanity, or Rot, all Holy attacks deal 20% more damage." },
        ]
      }
    ]
  },
  {
    id: 'physical',
    category: 'Physical',
    name: 'Physical - Unyielding Blood',
    color: '#dc2626',
    nodes: [
      { id: 'physical_1', name: "Crimson Rage", cost: 1, desc: "Bleed effects have a 10% chance to critically hit every tick." },
      { id: 'physical_2', name: "Razor Wounds", cost: 2, desc: "Enemies affected by your Bleed take 10% more damage from Physical attacks." },
      { id: 'physical_3', name: "Painful Memory", cost: 2, desc: "Bleeding enemies take 25% more hitstun when hit by another Physical attack." },
      { id: 'physical_4', name: "Unyielding Frenzy", cost: 2, desc: "If a target dies while Bleeding, heal 7.5% max health." },
      { id: 'physical_5', name: "Bloodthirsty", cost: 2, desc: "Critical hits on Bleeding enemies have a 50% chance to extend the duration of the Bleed by 2 seconds." },
    ],
    subs: [
      {
        id: 'physical_carnage',
        name: '1st Physical Sub - Carnage of the Slain',
        color: '#991b1b',
        nodes: [
          { id: 'physical_sub1_1', name: "Bloodforged Resilience", cost: 1, desc: "Enemy damage is reduced by 5% for every Bleed Stack they have, up to 15%. Locks Out Savage Lacerations", locksOut: ['physical_sub2_1'] },
          { id: 'physical_sub1_2', name: "Strengthened Flow", cost: 2, desc: "While below 50% Health, deal 18% More Physical Damage." },
          { id: 'physical_sub1_3', name: "Ravager's Charge", cost: 2, desc: "Bleeding enemies leave behind a puddle of blood, dealing 2 Physical Damage per second an enemy stands in them. These puddles will last for 6 seconds." },
          { id: 'physical_sub1_4', name: "Blood Link", cost: 3, desc: "When you are hit by a Bleeding enemy, reflect back 8% of the damage they deal to you." },
          { id: 'physical_sub1_5', name: "Vampiric Reaping", cost: 2, desc: "While an enemy is Bleeding, all critical hits will heal you for 9% of the damage." },
          { id: 'physical_sub1_6', name: "Scarred Resilience", cost: 2, desc: "Killing a Bleeding enemy will reinforce you with Scarred Resilience, reducing your damage taken by 5% for 10 seconds. This effect can stack up to 3 times." },
          { id: 'physical_sub1_7', name: "Sanguine Vengeance", cost: 3, desc: "When reaching below 5% Health, purge all Bleed Stacks from nearby enemies and heal 2% of your maximum health per stack." },
        ]
      },
      {
        id: 'physical_fury',
        name: '2nd Physical Sub - Bloodbound Fury',
        color: '#f87171',
        nodes: [
          { id: 'physical_sub2_1', name: "Savage Lacerations", cost: 1, desc: "Bleeds has a 15% chance to spread to nearby enemies upon application, dealing 50% of the original damage. (5 Second Cooldown). Locks Out Bloodforged Resilience", locksOut: ['physical_sub1_1'] },
          { id: 'physical_sub2_2', name: "Mortal Wound", cost: 3, desc: "Bleeding enemies' maximum health is temporarily reduced by 2% per bleed stack." },
          { id: 'physical_sub2_3', name: "Vicious Rend", cost: 3, desc: "Critical hits with Physical attacks cause the next Bleed Effect to deal DOUBLE damage." },
          { id: 'physical_sub2_4', name: "Gutting Slash", cost: 2, desc: "When a Bleeding enemy drops below 30% health, they will release a burst of blood dealing 10 Physical Damage to nearby enemies. Can only happen one time per enemy." },
          { id: 'physical_sub2_5', name: "Hemorrhaging", cost: 2, desc: "Your Bleeds now reduce enemy healing and regeneration effectiveness by 50%" },
        ]
      }
    ]
  },
  {
    id: 'wind',
    category: 'Wind',
    name: 'Wind - Edge of the Storm',
    color: '#86efac',
    nodes: [
      { id: 'wind_1', name: "Blade of Winds", cost: 1, desc: "Wind attacks increase attack speed by 5% and attack range by 2% for 5 seconds." },
      { id: 'wind_2', name: "Dancing Winds", cost: 1, desc: "Dealing Wind Damage 3 times within 5 seconds reduces mana cost by 8% for 7 seconds." },
      { id: 'wind_3', name: "Shearing Tempest", cost: 2, desc: "Critical Hits with Wind attacks create a small wind slash, dealing 8 bonus damage as an AoE attack. (3 second cooldown)" },
      { id: 'wind_4', name: "Stormborn Strikes", cost: 2, desc: "Dodging an attack briefly increases Wind Damage by 15% and movement speed by 10%. (10 Seconds Cooldown)" },
      { id: 'wind_5', name: "Tempest Fury", cost: 2, desc: "Wind attacks have a 15% chance to deal 10% bonus damage if the enemy is under 25% health." },
      { id: 'wind_6', name: "Cyclone Mastery", cost: 2, desc: "Increases the range and area of Wind-based AoE attacks by 15%." },
      { id: 'wind_6a', name: "Cyclone Mastery II", cost: 1, desc: "Increases range to 20%." },
    ],
    subs: [
      {
        id: 'wind_dancer',
        name: '1st Wind Sub - Storm Dancer',
        color: '#4ade80',
        nodes: [
          { id: 'wind_sub1_1', name: "Wind beneath Your Feet", cost: 1, desc: "Landing Wind attacks slightly boosts movement speed by 15% for 3 seconds. Locks Out Razor Winds", locksOut: ['wind_sub2_1'] },
          { id: 'wind_sub1_2', name: "Phantom Cutter", cost: 2, desc: "Dodging an enemy attack leaves behind a slicing aftershock that deals 5.75 Wind Damage. (3 second cooldown)" },
          { id: 'wind_sub1_3', name: "Precise Winds", cost: 3, desc: "After successfully dodging an attack, your next Wind-based attack is a guaranteed critical strike" },
          { id: 'wind_sub1_4', name: "Wind Surge", cost: 2, desc: "While sprinting and for 3 seconds after you stop. Wind attacks deal 15% more damage and grant 10% more movement speed to the player." },
          { id: 'wind_sub1_5', name: "Eye of the Storm", cost: 2, desc: "When landing a critical with wind attacks, generate a tornado around yourself which increases walkspeed by 5% slashes enemies in striking distance for 2 damage every 0.5 seconds. This effect can stack up to 3 times, lasting 10 seconds each stack increasing walkspeed by 5% and decreasing the damage tick by 0.1 seconds." },
        ]
      },
      {
        id: 'wind_currents',
        name: '2nd Wind Sub - Sharp Currents',
        color: '#a7f3d0',
        nodes: [
          { id: 'wind_sub2_1', name: "Razor Winds", cost: 2, desc: "Wind attacks have a 10% chance to apply a DoT effect that slices through the enemy over time, dealing 3.25 Wind Damage per second for 5 seconds. Locks Out Wind Beneath Your Feet", locksOut: ['wind_sub1_1'] },
          { id: 'wind_sub2_2', name: "Severing Wind", cost: 1, desc: "Wind attacks ignore 10% of enemy's defenses." },
          { id: 'wind_sub2_3', name: "Howling Edge", cost: 2, desc: "When taking damage you have a 10% chance to knock back enemies with a Wind burst." },
          { id: 'wind_sub2_4', name: "Crushing Gale", cost: 2, desc: "Wind attacks have a 15% chance to knock enemies back and stun them for .5 seconds. (7 Seconds Cooldown)" },
          { id: 'wind_sub2_4a', name: "Crushing Gale II", cost: 1, desc: "Crushing Gale's Stun Duration is increased to .75 seconds, but the cooldown is extended to 8 seconds." },
          { id: 'wind_sub2_5', name: "Tempest's Kiss", cost: 2, desc: "Wind attacks reduce enemy healing and regeneration effectiveness by 25% for 7 seconds" },
        ]
      }
    ]
  },
];

export const SKILLS = [
  // ─── PHYSICAL ───
  {
    id: "disarm", name: "Disarm", element: "Physical", tier: "Basic",
    description: "Move quickly toward your enemy and grab their weapon, disarming them for 10 seconds. If they were already using fists, their total damage is reduced by 15%.",
    upgrades: []
  },
  {
    id: "reverse_slice", name: "Reverse Slice", element: "Physical", tier: "Basic",
    description: "Swing around quickly, slicing downward and dealing 10 Physical Damage.",
    upgrades: [
      { name: "Gouging Slice", rarity: "Uncommon", desc: "Applies 2 Damage Bleed for 4 seconds." },
      { name: "Fatal Strike", rarity: "Unique", desc: "Deals 15% more damage to Stunned targets." },
      { name: "Reverberating Slash", rarity: "Unique", desc: "Your next landed attack recasts Reverse Slice for 30% of its original damage." },
    ]
  },
  {
    id: "multi_shot", name: "Multi-Shot", element: "Physical", tier: "Basic", tag: "Ranged",
    description: "Fire three arrows in a cone pattern, each dealing 4.65 Physical Damage. Summons a bow if you don't have one equipped.",
    upgrades: [
      { name: "Quickshot", rarity: "Uncommon", desc: "Windup reduced by 10%." },
      { name: "Broad Arrow", rarity: "Uncommon", desc: "Knocks back enemies on hit." },
      { name: "Arcing Arrows", rarity: "Rare", desc: "Fires 1 additional arrow." },
      { name: "Bodkin Point", rarity: "Rare", desc: "Pierces through 1 target." },
      { name: "Double Tap", rarity: "Unique", desc: "Fires twice." },
    ]
  },
  {
    id: "reckless_leap", name: "Reckless Leap", element: "Physical", tier: "Intermediate",
    description: "Leap into the air and slam down. Direct hit: 12 Physical Damage. Miss: You take 2.5% self-damage.",
    upgrades: [
      { name: "Compression", rarity: "Uncommon", desc: "Leaves miasma reducing enemy speed by 15%." },
      { name: "Crushing Stomp", rarity: "Uncommon", desc: "Knocks enemies down for 0.35s." },
    ]
  },
  {
    id: "tendon_slice", name: "Tendon Slice", element: "Physical", tier: "Intermediate",
    description: "Slash upward, dealing 10 Physical Damage and applying a 30% Slow for 5 seconds.",
    upgrades: [
      { name: "Arm and a Leg", rarity: "Common", desc: "Target deals 10% less damage during Slow." },
      { name: "Deep Cut", rarity: "Uncommon", desc: "Slow lasts 3 seconds longer." },
      { name: "Achilles Tendon", rarity: "Uncommon", desc: "Additional 10% Walkspeed reduction." },
      { name: "Arterial Tear", rarity: "Uncommon", desc: "Applies 5 Damage Bleed for 3 seconds." },
    ]
  },
  {
    id: "pierce", name: "Pierce", element: "Physical", tier: "Intermediate",
    description: "Thrust forward dealing 10 Physical Damage and applying Bleed: 2.5 Damage per second for 6 seconds.",
    upgrades: [
      { name: "Puncture", rarity: "Uncommon", desc: "Bleed deals 5% more damage." },
      { name: "Gore", rarity: "Rare", desc: "Bleed lasts 1 second longer." },
    ]
  },
  {
    id: "execute", name: "Execute", element: "Physical", tier: "Advanced",
    description: "Deal 16 Physical Damage. Instantly kills enemies below 7.5% Health. Does not work on bosses.",
    upgrades: [
      { name: "Improved Execute", rarity: "Common", desc: "Kill threshold increased to 15% (locks Giantslayer).", locks: ["Giantslayer"] },
      { name: "Giantslayer", rarity: "Unique", desc: "Now works on bosses (locks Improved Execute).", locks: ["Improved Execute"] },
      { name: "Slaughtering Ire", rarity: "Unique", desc: "On kill, cooldown reduced by half (locks Unbridled Rage).", locks: ["Unbridled Rage"] },
      { name: "Unbridled Rage", rarity: "Unique", desc: "On kill, refund 50% Mana (locks Slaughtering Ire).", locks: ["Slaughtering Ire"] },
      { name: "Sudden Death", rarity: "Mythical", desc: "All skills have 5% chance to fully reset Execute cooldown." },
    ]
  },
  {
    id: "focus_shot", name: "Focus Shot", element: "Physical", tier: "Advanced", tag: "Ranged",
    description: "Take careful aim and deal 14 Physical Damage. Summons a bow if needed.",
    upgrades: [
      { name: "Honed Pierce", rarity: "Uncommon", desc: "Pierces 1 additional target." },
      { name: "Keen Eye", rarity: "Unique", desc: "Guaranteed Critical Strike." },
    ]
  },
  {
    id: "bloodbath", name: "Bloodbath", element: "Physical", tier: "Advanced",
    description: "Strike rapidly, dealing 6 Physical Damage per hit and applying Bleed: 2.75 Damage per second for 7 seconds.",
    upgrades: [
      { name: "Deep Wound", rarity: "Uncommon", desc: "+1 Bleed stack." },
      { name: "Blood Frenzy", rarity: "Rare", desc: "Ignores Parry-Stun." },
      { name: "Sanguine Infusion", rarity: "Unique", desc: "Sacrifice 8% max HP to deal 35% more damage." },
    ]
  },
  {
    id: "rush", name: "Rush", element: "Physical", tier: "Advanced",
    description: "Charge forward, rooting for 0.5s, then stomp for 8 Physical Damage in an area.",
    upgrades: [
      { name: "Seismic Stomp", rarity: "Common", desc: "Increase AoE." },
      { name: "Shattered Earth", rarity: "Uncommon", desc: "+4% stomp damage." },
      { name: "Earthquake", rarity: "Rare", desc: "Leaves rubble dealing damage over time (locks Double Stomp).", locks: ["Double Stomp"] },
      { name: "Double Stomp", rarity: "Unique", desc: "Stomp twice (locks Earthquake).", locks: ["Earthquake"] },
      { name: "Blindside", rarity: "Mythical", desc: "Stuns instead of Roots." },
    ]
  },
  {
    id: "cleave", name: "Cleave", element: "Physical", tier: "Masterful",
    description: "Swing in a slow arc, dealing 7.8 Physical Damage and Stunning for 1.5s.",
    upgrades: [
      { name: "Wide Arc", rarity: "Common", desc: "Increase range." },
      { name: "Followup", rarity: "Mythical", desc: "Automatically stomps for 10+ bonus scaling damage." },
    ]
  },
  {
    id: "rapid_fire", name: "Rapid Fire", element: "Physical", tier: "Masterful", tag: "Ranged",
    description: "Rapidly fire arrows dealing 7.15 Physical Damage per arrow.",
    upgrades: [
      { name: "Everlasting Quiver", rarity: "Uncommon", desc: "+1 arrow." },
      { name: "Aggressive Stance", rarity: "Uncommon", desc: "10% faster windup." },
    ]
  },
  {
    id: "volley", name: "Volley", element: "Physical", tier: "Masterful", tag: "Ranged",
    description: "Rain arrows over an area. 1.25 Damage per arrow, hits 24 times over 6 seconds.",
    upgrades: [
      { name: "Bombardment", rarity: "Rare", desc: "Larger radius." },
      { name: "Arrow Rain", rarity: "Unique", desc: "+1 second duration." },
    ]
  },
  {
    id: "shoulder_slam", name: "Shoulder Slam", element: "Physical", tier: "Masterful",
    description: "Deal 14 Physical Damage with a direct slam.",
    upgrades: [
      { name: "Staggering Push", rarity: "Uncommon", desc: "Pushes enemy back." },
      { name: "Concussive Slam", rarity: "Unique", desc: "Stuns for 0.5s." },
    ]
  },
  {
    id: "beartrap", name: "Beartrap", element: "Physical", tier: "Masterful",
    description: "Place a trap that deals 5.85 Physical Damage and Stuns for 1.5s.",
    upgrades: [
      { name: "Barbed Teeth", rarity: "Common", desc: "Applies Bleed." },
      { name: "Steel Beartrap", rarity: "Rare", desc: "+1 second Stun." },
      { name: "Spring Loaded", rarity: "Unique", desc: "Triggers 15% faster." },
    ]
  },
  {
    id: "war_banner", name: "War Banner", element: "Physical", tier: "Support",
    description: "Place a banner for 20 seconds that increases Attack Speed +10%, Attack Damage +10%. Affects allies nearby.",
    upgrades: [
      { name: "Cooldown Reduction", rarity: "Common", desc: "Reduces cooldown." },
      { name: "Increased Damage Bonus", rarity: "Uncommon", desc: "Increased damage bonus." },
      { name: "Bonus Attack Speed", rarity: "Rare", desc: "Bonus attack speed." },
      { name: "Bonus Walkspeed", rarity: "Rare", desc: "Bonus walkspeed." },
      { name: "Passive Aura", rarity: "Mythical", desc: "Passive 40% effect when not deployed." },
    ]
  },
  {
    id: "rally", name: "Rally", element: "Physical", tier: "Support",
    description: "Increase allies' Max Health +10%, Armor +15% for 30 seconds.",
    upgrades: [
      { name: "Cooldown Reduction", rarity: "Common", desc: "Reduces cooldown." },
      { name: "Increased Range", rarity: "Uncommon", desc: "Increased range." },
      { name: "Mana Grant", rarity: "Mythical", desc: "Grants 20 Mana." },
    ]
  },
  {
    id: "chain_pull", name: "Chain Pull", element: "Physical", tier: "Special",
    description: "Launch a chain that pulls and Stuns for 1.3 seconds.",
    upgrades: [
      { name: "AoE Impact", rarity: "Uncommon", desc: "AoE damage on impact." },
      { name: "Speed Buff", rarity: "Rare", desc: "Temporary Walkspeed buff." },
      { name: "Self Pull", rarity: "Rare", desc: "Can pull yourself." },
      { name: "Multi Pull", rarity: "Unique", desc: "Pulls up to 3 enemies." },
      { name: "Chain Bleed", rarity: "Mythical", desc: "Applies scaling Bleed (locks Chain Gang).", locks: ["Chain Gang"] },
    ]
  },

  // ─── FIRE ───
  {
    id: "ash_stomp", name: "Ash Stomp", element: "Fire", tier: "Basic",
    description: "Stomp the ground, igniting it. 5 Fire Damage on impact. Leaves scorched ground for 5 seconds — enemies gain 1 Burn Stack/sec, take 1 Fire Damage/sec, and are Slowed.",
    upgrades: []
  },
  {
    id: "explosive_arrow", name: "Explosive Arrow", element: "Fire", tier: "Intermediate", tag: "Ranged",
    description: "Fire an explosive arrow. 8.22 Fire Damage to primary target, 5 Fire Damage to nearby enemies. Summons a bow if needed.",
    upgrades: []
  },
  {
    id: "gunpowder_barrel", name: "Gunpowder Barrel", element: "Fire", tier: "Intermediate",
    description: "Summon a volatile barrel that can be moved. Lasts 30 seconds idle. Ignites when hit by Burn — then deals +1.33 Fire Damage per Fire hit and explodes after 10 seconds.",
    upgrades: []
  },
  {
    id: "cataclysm", name: "Cataclysm", element: "Fire", tier: "Advanced",
    description: "Call down a meteor at cursor. 16 Fire Damage on impact. Applies burning: 1.65 Fire Damage/sec for 16 seconds.",
    upgrades: []
  },
  {
    id: "flame_smash", name: "Flame Smash", element: "Fire", tier: "Advanced",
    description: "Ignite your arms and slam your enemy. 9.55 Fire Damage.",
    upgrades: []
  },
  {
    id: "fire_blast", name: "Fire Blast", element: "Fire", tier: "Advanced",
    description: "Charge and project a blast of fire forward. 8 Fire Damage. Applies 1 Burn Stack (1.33 Fire Damage/sec for 10 seconds).",
    upgrades: []
  },
  {
    id: "ignition", name: "Ignition", element: "Fire", tier: "Masterful",
    description: "Detonate Burn Stacks on a target. 4 Fire Damage per Burn Stack. Explosion damages nearby enemies. Radius increases per Burn Stack. If no Burn Stacks → 0 damage.",
    upgrades: []
  },
  {
    id: "overheat", name: "Overheat", element: "Fire", tier: "Masterful",
    description: "Toggle: Set yourself ablaze. Each swing launches a fireball (3 Fire Damage, applies 1.5 Fire/sec burn for 15s). Grants +20% speed. You take % self-burn damage.",
    upgrades: []
  },

  // ─── FROST ───
  {
    id: "ice_blades", name: "Ice Blades", element: "Frost", tier: "Intermediate",
    description: "Channel frost to summon ice blades (max 3). Use again to fire them. Each blade: 6.45 Frost Damage, applies 1 Chill Stack.",
    upgrades: []
  },
  {
    id: "icicle_eruption", name: "Icicle Eruption", element: "Frost", tier: "Intermediate",
    description: "Cause ice crystals to erupt beneath nearby enemies. 10 Frost Damage.",
    upgrades: [
      { name: "Cold Start", rarity: "Uncommon", desc: "Erupts 33% slower but applies 1 Chill Stack and ignores 25% Armor." },
      { name: "Icicle Detonation", rarity: "Uncommon", desc: "Icicles explode after 3 seconds for 8.5 Frost Damage in an area." },
    ]
  },
  {
    id: "ice_clone", name: "Ice Clone", element: "Frost", tier: "Advanced",
    description: "Summon a frosty decoy. When struck, it shatters: 13 Frost Damage, applies 1 Chill Stack.",
    upgrades: [
      { name: "Polar Caps", rarity: "Common", desc: "Self-detonates after 5 seconds." },
      { name: "Frozen Copier", rarity: "Common", desc: "Cooldown reduced by 1 second." },
      { name: "Cryocompaction", rarity: "Uncommon", desc: "If detonated by Frost Nova: +18.4 bonus flat damage." },
      { name: "Glacial Melt", rarity: "Uncommon", desc: "If detonated by a Fire skill: leaves water puddle dealing 4 Water Damage/sec for 10s." },
      { name: "Biofrost", rarity: "Mythical", desc: "Clone becomes a summon — can fight, parry, and dodge. Spawns with a random weapon." },
    ]
  },
  {
    id: "preservation", name: "Preservation", element: "Frost", tier: "Advanced",
    description: "Freeze your body defensively. Reduce all damage taken by 35%, Walkspeed by 60%. Ends after 15s or 4 hits. After: take 15% more damage for 5s.",
    upgrades: [
      { name: "Cryopreservation", rarity: "Rare", desc: "100% damage reduction, frozen solid, 6s, unlimited hits. Locks Frozen Soul.", locks: ["Frozen Soul"] },
      { name: "Frozen Soul", rarity: "Uncommon", desc: "Increased reduction, reduced speed penalty, 7 hit limit, shorter duration/vulnerability. Locks Cryopreservation.", locks: ["Cryopreservation"] },
    ]
  },
  {
    id: "cold_breath", name: "Cold Breath", element: "Frost", tier: "Advanced",
    description: "Exhale icy winds in multiple ticks. Total: 30 Frost Damage. Each tick applies 1 Chill Stack.",
    upgrades: [
      { name: "Cold Front", rarity: "Uncommon", desc: "Duration increased slightly." },
      { name: "Frozen Expungement", rarity: "Unique", desc: "While off cooldown, damage increases by 1.25%/sec (up to +125%)." },
    ]
  },
  {
    id: "subzero_slam", name: "Subzero Slam", element: "Frost", tier: "Advanced",
    description: "Summon an ice maul and slam it down. 12.5 Frost Damage. Hits all enemies in front.",
    upgrades: [
      { name: "Icequake", rarity: "Uncommon", desc: "Knockdown + pushback. Locks Permafrost Slam.", locks: ["Permafrost Slam"] },
      { name: "Icy Leftover", rarity: "Rare", desc: "Leaves ice field: 3 Frost Damage/sec for 5 seconds." },
      { name: "Permafrost Slam", rarity: "Unique", desc: "Freezes enemies for 1.33 seconds. Locks Icequake.", locks: ["Icequake"] },
    ]
  },
  {
    id: "frost_nova", name: "Frost Nova", element: "Frost", tier: "Advanced",
    description: "Throw a frozen orb. 4 Frost Damage on direct hit, applies 1 Chill Stack. If target has Chill: Freeze for 1s + 1.75 Frost Damage per Chill Stack.",
    upgrades: [
      { name: "Deep Freeze", rarity: "Rare", desc: "Freeze lasts 1 second longer." },
      { name: "Deep Chill", rarity: "Unique", desc: "Applies 2 Chill Stacks." },
      { name: "Frostbite", rarity: "Unique", desc: "+15% damage per Chill Stack." },
      { name: "Subzero Temperatures", rarity: "Mythical", desc: "No Chill required to Freeze." },
    ]
  },
  {
    id: "frozen_uppercut", name: "Frozen Uppercut", element: "Frost", tier: "Masterful",
    description: "Strike upward with an ice blade. 17.5 Frost Damage. Knocks enemy away.",
    upgrades: [
      { name: "Ice Slam", rarity: "Common", desc: "+5% damage." },
      { name: "Defrost", rarity: "Uncommon", desc: "Removes windup." },
      { name: "Frozen Fist", rarity: "Rare", desc: "No blade required; now Stuns for 1 second." },
    ]
  },
  {
    id: "frost_femur_breaker", name: "Frost Femur Breaker", element: "Frost", tier: "Masterful",
    description: "Stomp an enemy's leg with frost-infused force. 18 Frost Damage. Knocks target down.",
    upgrades: [
      { name: "Chillblains", rarity: "Uncommon", desc: "Target takes +5% Fire Damage for 10 seconds." },
      { name: "Permafrost", rarity: "Uncommon", desc: "Applies +1 Chill Stack." },
      { name: "Frozen Shatter", rarity: "Unique", desc: "If target is Frozen: remove Freeze and deal +10 Frost Damage." },
    ]
  },
  {
    id: "everwinter", name: "Everwinter", element: "Frost", tier: "Masterful",
    description: "Conjure a snowstorm around yourself for 10 seconds. 3.22 Frost Damage/sec. Applies Chill Stacks. At 5+ Chill Stacks: Freeze for 2 seconds (Absolute Zero: +2.5 Frost Damage/sec).",
    upgrades: [
      { name: "Winter's Fury", rarity: "Rare", desc: "Increase AoE by 5 studs." },
      { name: "Warm Winter", rarity: "Rare", desc: "No longer Freezes, +2s duration. Locks Eternal Frost.", locks: ["Eternal Frost"] },
      { name: "Eternal Frost", rarity: "Unique", desc: "Extend Freeze duration by 0.25s per proc. Locks Warm Winter.", locks: ["Warm Winter"] },
    ]
  },

  // ─── SHADOW ───
  {
    id: "gouge", name: "Gouge", element: "Shadow", tier: "Basic",
    description: "Obscure your weapon and quickly jab your enemy. 6.55 Shadow Damage. Hard-to-react stab.",
    upgrades: [
      { name: "Mutilate", rarity: "Rare", desc: "+25% damage when backstabbing." },
    ]
  },
  {
    id: "distract", name: "Distract", element: "Shadow", tier: "Intermediate",
    description: "Throw an item to create noise and redirect enemy attention. Enemies investigate the impact location.",
    upgrades: [
      { name: "Smoke Bomb", rarity: "Rare", desc: "Creates smoke that heavily reduces enemy detection radius. Locks Flashspark Powder.", locks: ["Flashspark Powder"] },
      { name: "Flashspark Powder", rarity: "Rare", desc: "Temporarily disables enemy detection radius. Locks Smoke Bomb.", locks: ["Smoke Bomb"] },
    ]
  },
  {
    id: "shadowstep", name: "Shadowstep", element: "Shadow", tier: "Intermediate",
    description: "Teleport behind a target after a short windup.",
    upgrades: [
      { name: "Walk in Shadows", rarity: "Uncommon", desc: "+25% Walkspeed for 3 seconds after teleport." },
      { name: "Needles and Pins", rarity: "Unique", desc: "Stab target for 5.75 Shadow Damage." },
      { name: "Fearful Approach", rarity: "Unique", desc: "Root target for 1 second." },
    ]
  },
  {
    id: "darkness", name: "Darkness", element: "Shadow", tier: "Intermediate",
    description: "Surround yourself in umbral fog for 30 seconds. Applies Darkness: +15% Shadow Damage, -15% Holy Damage, -50% Enemy Detection Radius.",
    upgrades: [
      { name: "Evasive Killer", rarity: "Uncommon", desc: "Roll cooldown reduced while Darkness is active." },
      { name: "Stalker", rarity: "Unique", desc: "Enemies are highlighted within the fog." },
    ]
  },
  {
    id: "void_dagger", name: "Void Dagger", element: "Shadow", tier: "Intermediate",
    description: "Throw a dagger of shadow that corrupts the target. 2.12 Shadow Damage/sec for 10 seconds.",
    upgrades: [
      { name: "Null Agony", rarity: "Uncommon", desc: "Reduces enemy attack speed." },
      { name: "Consuming Maw", rarity: "Rare", desc: "Increases damage by 5%." },
    ]
  },
  {
    id: "shadow_dancer", name: "Shadow Dancer", element: "Shadow", tier: "Advanced",
    description: "Meld into shadows temporarily. If struck: Stun attacker for 1 second, teleport behind them (still take the damage).",
    upgrades: [
      { name: "Banshee", rarity: "Uncommon", desc: "Stun lasts 25% longer." },
      { name: "Strengthened Void", rarity: "Rare", desc: "Duration increased; triggers on successful parry." },
      { name: "Wraith", rarity: "Unique", desc: "Automatically casts Gouge when triggered." },
    ]
  },
  {
    id: "null", name: "Null", element: "Shadow", tier: "Advanced",
    description: "Nullifies next attack up to 15 Damage. Additional effects still apply. Excess damage carries through.",
    upgrades: [
      { name: "Void", rarity: "Rare", desc: "Also nullifies DoT if initial hit is absorbed." },
      { name: "Nothing", rarity: "Rare", desc: "Ignore hitstun, stun, and knockback while active. Locks Emptiness.", locks: ["Emptiness"] },
      { name: "Emptiness", rarity: "Rare", desc: "Nullifies one additional attack. Locks Nothing.", locks: ["Nothing"] },
    ]
  },
  {
    id: "enfeeble", name: "Enfeeble", element: "Shadow", tier: "Advanced",
    description: "Target deals -20% damage for 15 seconds.",
    upgrades: [
      { name: "Greater Enfeeble", rarity: "Common", desc: "Further reduces enemy damage." },
      { name: "Repurposed Strength", rarity: "Mythical", desc: "AoE buff to you/allies: ~15–18% global damage bonus. Locks Mass Enfeeblement.", locks: ["Mass Enfeeblement"] },
      { name: "Mass Enfeeblement", rarity: "Mythical", desc: "Applies Enfeeble in an AoE. Locks Repurposed Strength.", locks: ["Repurposed Strength"] },
    ]
  },
  {
    id: "stealth", name: "Stealth", element: "Shadow", tier: "Advanced",
    description: "Meld into shadows. Breaks upon dealing or taking damage.",
    upgrades: [
      { name: "Nightstalker", rarity: "Common", desc: "+5 Walkspeed while active." },
      { name: "Ambush", rarity: "Rare", desc: "Breaking Stealth with Shadow attack guarantees Critical Strike." },
      { name: "Improved Ambush", rarity: "Unique", desc: "+15% Critical Damage when breaking Stealth." },
    ]
  },
  {
    id: "shackle", name: "Shackle", element: "Shadow", tier: "Advanced",
    description: "Create a dark miasma zone. Enemies inside are bound — cannot move beyond 12 studs.",
    upgrades: [
      { name: "Sorrowful Ties", rarity: "Uncommon", desc: "Reduce movement radius further." },
      { name: "Darksteel Wraps", rarity: "Rare", desc: "Duration increased." },
      { name: "Oppressive Binding", rarity: "Rare", desc: "Pulls enemies toward center." },
    ]
  },
  {
    id: "hunt", name: "Hunt", element: "Shadow", tier: "Advanced",
    description: "Mark a target for pursuit. Target cannot perceive you properly. After 10 seconds, they become aware.",
    upgrades: [
      { name: "Lurker", rarity: "Uncommon", desc: "While in Stealth near target: siphon 1 mana/sec. Locks Paranoia.", locks: ["Paranoia"] },
      { name: "Paranoia", rarity: "Rare", desc: "Target becomes passive during Hunt (not bosses/monsters). Locks Lurker.", locks: ["Lurker"] },
    ]
  },
  {
    id: "haunt", name: "Haunt", element: "Shadow", tier: "Masterful",
    description: "Haunt a target for 12 seconds. 13% of damage you deal to others is mirrored as Shadow Damage to the haunted target.",
    upgrades: [
      { name: "Lingering Scare", rarity: "Rare", desc: "After Haunt expires: reapplies 5% of total damage over 6 seconds." },
      { name: "Mass Hysteria", rarity: "Unique", desc: "Nearby enemies receive weaker Haunt (shorter duration, reduced damage)." },
    ]
  },
  {
    id: "night_slash", name: "Night Slash", element: "Shadow", tier: "Masterful",
    description: "Empower your weapon with shadow. 9 Shadow Damage. Backstab: 3 shadow pins each dealing 5.5 Shadow Damage.",
    upgrades: [
      { name: "Umbral Pin", rarity: "Unique", desc: "Adds an additional shadow needle on backstab." },
    ]
  },
  {
    id: "reap", name: "Reap", element: "Shadow", tier: "Masterful",
    description: "Strike at an enemy's soul. Initial hit: 14.5 Shadow Damage. Follow-up stab (if connected): 14.5 Shadow Damage. Missing costs 5% Max Health.",
    upgrades: [
      { name: "Soulbind", rarity: "Mythical", desc: "Silences target for 4 seconds." },
    ]
  },
  {
    id: "regicide", name: "Regicide", element: "Shadow", tier: "Masterful",
    description: "Form twin void blades to execute a powerful strike. 30 Shadow Damage.",
    upgrades: [
      { name: "Pilfer", rarity: "Uncommon", desc: "Gain gold on kill." },
      { name: "Kingsbane", rarity: "Rare", desc: "Cooldown reduced if target survives." },
      { name: "Serial Kingslayer", rarity: "Rare", desc: "Faster windup, reduced damage." },
    ]
  },

  // ─── LIGHTNING ───
  {
    id: "static_shock", name: "Static Shock", element: "Lightning", tier: "Basic",
    description: "Imbue your arm with static electricity. Your next attack deals +11% additional Lightning Damage and Stuns for 1 second.",
    upgrades: [
      { name: "Jolt", rarity: "Uncommon", desc: "Increases Static Shock damage by 10%." },
      { name: "Electrolysis", rarity: "Rare", desc: "Static Shock leaps to a target within 15 studs for 66% damage." },
    ]
  },
  {
    id: "short_out", name: "Short Out", element: "Lightning", tier: "Intermediate",
    description: "Overcharge your body for 10 seconds. If struck: shock attacker for 3 Lightning Damage.",
    upgrades: [
      { name: "Defibrillation", rarity: "Rare", desc: "Short Out shocks you to cancel stun effects. Locks Synapse.", locks: ["Synapse"] },
      { name: "Synapse", rarity: "Rare", desc: "Striking enemies become afflicted with Magnetise. Locks Defibrillation.", locks: ["Defibrillation"] },
    ]
  },
  {
    id: "thunder_strike", name: "Thunder Strike", element: "Lightning", tier: "Intermediate",
    description: "Summon a storm cloud at cursor. After 2 seconds, lightning strikes for 10 Lightning Damage.",
    upgrades: [
      { name: "Negative Reaction", rarity: "Uncommon", desc: "Cast time reduced by 50%." },
      { name: "Song of Storms", rarity: "Rare", desc: "Summons an additional bolt; each deals 15% less damage." },
      { name: "Positive Reinforcement", rarity: "Mythical", desc: "Applies 0.5-second stun." },
    ]
  },
  {
    id: "magnetic_pulse", name: "Magnetic Pulse", element: "Lightning", tier: "Intermediate",
    description: "Summon a pulsating magnetic field at your location. Lasts 12 seconds, pulses every 3s, grows with each pulse. 5 Lightning Damage per pulse. Applies Magnetise.",
    upgrades: [
      { name: "Electrocution", rarity: "Uncommon", desc: "+3% damage per level." },
      { name: "Charge Pulse", rarity: "Uncommon", desc: "Starts at second-stage size, adds an extra pulse at the end." },
      { name: "Grounding", rarity: "Rare", desc: "Increases Magnetise duration by 2 seconds." },
    ]
  },
  {
    id: "static_orb", name: "Static Orb", element: "Lightning", tier: "Advanced",
    description: "Create an unstable orb of electricity. Orbs gravitate toward nearby enemies, dealing 3 Lightning Damage/sec.",
    upgrades: [
      { name: "Electrogravitate", rarity: "Uncommon", desc: "Orbs track enemies more aggressively; discharges occur faster." },
    ]
  },
  {
    id: "open_circuit", name: "Open Circuit", element: "Lightning", tier: "Advanced",
    description: "Force an unstable circuit into an enemy. If they cast the same element twice consecutively: locked from that element for 5 seconds and take 3 Lightning Damage/sec.",
    upgrades: [
      { name: "Muscle Spasm", rarity: "Uncommon", desc: "Low chance for skills to backfire." },
      { name: "Core Shock", rarity: "Uncommon", desc: "If they attempt to use locked element: shock for 3 Lightning Damage." },
    ]
  },
  {
    id: "shock_grenade", name: "Shock Grenade", element: "Lightning", tier: "Advanced",
    description: "Throw a grenade that detonates after 3 seconds. Deals 9.25 Lightning Damage.",
    upgrades: [
      { name: "Arcs", rarity: "Uncommon", desc: "Throws an additional grenade; each deals 25% less damage." },
      { name: "Scattering Arcs", rarity: "Uncommon", desc: "Explosion releases 3 smaller grenades, each dealing 2 Lightning Damage." },
    ]
  },
  {
    id: "chain_lightning", name: "Chain Lightning", element: "Lightning", tier: "Advanced",
    description: "Strike a nearby enemy with arcing current. 6.17 Lightning Damage. Chains to another target for the same damage.",
    upgrades: [
      { name: "Chain Current", rarity: "Rare", desc: "Chains to 1 additional target." },
      { name: "Lightning Link", rarity: "Unique", desc: "Can re-shock the same target once." },
      { name: "Lightning Rod", rarity: "Unique", desc: "If target has Magnetise: consume debuff, Stun for 2s, deal +20 Lightning Damage." },
    ]
  },
  {
    id: "shock_sweep", name: "Shock Sweep", element: "Lightning", tier: "Masterful",
    description: "Electrify your leg and perform a sweeping kick. 10 Lightning Damage. Ragdolls enemies.",
    upgrades: [
      { name: "Lightning Reflexes", rarity: "Common", desc: "Reduced endlag." },
      { name: "Paralysis", rarity: "Rare", desc: "Increased ragdoll duration." },
      { name: "Convulse", rarity: "Unique", desc: "Applies Magnetise dealing 3 Lightning Damage every 3 seconds (9s total) with brief stun per proc." },
    ]
  },
  {
    id: "electric_barrage", name: "Electric Barrage", element: "Lightning", tier: "Masterful",
    description: "Blitz an enemy with ~8 rapid lightning-infused strikes at 4.44 Lightning Damage each. Final grab + slam: +9 Lightning Damage.",
    upgrades: [
      { name: "Quick Charge", rarity: "Rare", desc: "Reduce cooldown by 0.5 seconds per Lightning skill used during cooldown." },
      { name: "Crushing Smite", rarity: "Unique", desc: "Slam summons a Thunder Strike dealing +7 additional Lightning Damage." },
    ]
  },

  // ─── WIND ───
  {
    id: "updraft", name: "Updraft", element: "Wind", tier: "Basic",
    description: "Create a swirling gale at your location for 9 seconds. Enemies take 1.5 Wind Damage/sec. After 9s: violent updraft launches enemies for 6.15 additional Wind Damage.",
    upgrades: [
      { name: "Extensive Winds", rarity: "Uncommon", desc: "+1 second duration per level." },
      { name: "Tempest's Wrath", rarity: "Unique", desc: "Pull enemies toward the center whenever they take damage." },
      { name: "Endless Tempest", rarity: "Unique", desc: "Cooldown reduced by 10% per enemy launched." },
    ]
  },
  {
    id: "wind_blast", name: "Wind Blast", element: "Wind", tier: "Intermediate",
    description: "Cast a forceful gale toward an enemy. 12 Wind Damage. Knocks enemies back.",
    upgrades: [
      { name: "Wind Cannon", rarity: "Common", desc: "Increased knockback." },
      { name: "Wind Crush", rarity: "Unique", desc: "If target hits a wall: deals 11 additional Wind Damage." },
    ]
  },
  {
    id: "sweet_symphony", name: "Sweet Symphony", element: "Wind", tier: "Intermediate",
    description: "Manifest a gentle breeze for 8 seconds. You and allies gain +17.5% Mana Regen, +10% Armor.",
    upgrades: [
      { name: "Hymn Knowledge: Borealis", rarity: "Common", desc: "Reduces environmental damage/effects by 25%." },
      { name: "Hymn Knowledge: Harmonia", rarity: "Uncommon", desc: "Grants 2 Health/sec (scales with Wind)." },
    ]
  },
  {
    id: "disorient", name: "Disorient", element: "Wind", tier: "Intermediate",
    description: "Clap your hands, sending a resonating shockwave. 13 Wind Damage. Stuns for 1 second.",
    upgrades: [
      { name: "120dB", rarity: "Common", desc: "+0.15 seconds stun duration." },
      { name: "Sonic Boom", rarity: "Common", desc: "+3 studs range." },
    ]
  },
  {
    id: "pressure", name: "Pressure", element: "Wind", tier: "Intermediate",
    description: "Increase air pressure around you. Enemies you parry are pushed back.",
    upgrades: [
      { name: "Air Jet", rarity: "Rare", desc: "Running attacks against you cause enemies to fall over." },
      { name: "Winds of Misguidance", rarity: "Common", desc: "Enemies who dodge while active roll much farther than intended." },
    ]
  },
  {
    id: "windreaver", name: "Windreaver", element: "Wind", tier: "Advanced",
    description: "Summon a sentient wind wisp. +15% Walkspeed for 10 seconds. Stops in combat.",
    upgrades: [
      { name: "Gale Freedom", rarity: "Uncommon", desc: "Grants immunity to slows." },
      { name: "Hasty Winds", rarity: "Rare", desc: "+5% Attack Speed." },
      { name: "Combative Winds", rarity: "Rare", desc: "Works during combat (effectiveness -50%)." },
    ]
  },
  {
    id: "slicing_winds", name: "Slicing Winds", element: "Wind", tier: "Advanced",
    description: "Charge wind energy to generate slicing wisps that hover around you. Reactivating launches one at a target for 4.75 Wind Damage (twice).",
    upgrades: []
  },
  {
    id: "vortex", name: "Vortex", element: "Wind", tier: "Advanced",
    description: "Summon a slow-moving tornado. Pulls nearby enemies. 3.11 Wind Damage/sec for 8 seconds. Ends early if it hits a wall.",
    upgrades: [
      { name: "Wind Implosion", rarity: "Unique", desc: "On wall collision: emits sonic burst dealing AoE Wind Damage." },
      { name: "Never-Ending Tempest", rarity: "Unique", desc: "+3 seconds duration." },
      { name: "Flaming Tempest", rarity: "Mythical", desc: "If Vortex collides with Ash Stomp: becomes stationary, swirls embers, deals EmberWind Damage every 2s." },
    ]
  },
  {
    id: "palm_strike", name: "Palm Strike", element: "Wind", tier: "Masterful",
    description: "Channel gale chi into your palm. First hit: 7 Wind Damage. Follow-up sonic kick: 4 Wind Damage + Knockback.",
    upgrades: [
      { name: "Tiger Palm", rarity: "Uncommon", desc: "Increased knockback distance." },
      { name: "Double-Palm", rarity: "Rare", desc: "Hits twice before knockback." },
    ]
  },
  {
    id: "wind_vortex", name: "Wind Vortex", element: "Wind", tier: "Masterful",
    description: "Envelop a target in wind energy. 6.5 Wind Damage/sec. After 2.5 seconds (if not escaped): erupts for 10 Wind Damage with knockback.",
    upgrades: []
  },
  {
    id: "hypoxia", name: "Hypoxia", element: "Wind", tier: "Masterful",
    description: "Suffocate a target with gale magic. 14.75 Wind Damage.",
    upgrades: [
      { name: "Wind Crack", rarity: "Uncommon", desc: "Slows enemies by 5% per level." },
      { name: "Air Trap", rarity: "Unique", desc: "If target attempts to cast: skill cancelled, that element locked for 3 seconds." },
      { name: "Strangulation", rarity: "Mythical", desc: "Air Trap lockout increased by 1 second." },
    ]
  },
  {
    id: "suffocation", name: "Suffocation", element: "Wind", tier: "Masterful",
    description: "Drain air from a large area. Locks Mana Regen, -20% Cooldown Recovery, 5 Wind Damage/sec for 12 seconds.",
    upgrades: [
      { name: "Cracked Windpipe", rarity: "Uncommon", desc: "Debuffs persist 4 seconds after leaving area." },
      { name: "Pressure Jump", rarity: "Rare", desc: "When field ends: air rebounds dealing +13 Wind Damage." },
    ]
  },

  // ─── WATER ───
  {
    id: "scald", name: "Scald", element: "Water", tier: "Basic",
    description: "Channel an orb of boiling water to douse a target. 7.8 Water Damage.",
    upgrades: [
      { name: "Thermal Shock", rarity: "Common", desc: "Target takes 10% more Frost and Fire damage for 7 seconds." },
      { name: "Splash", rarity: "Uncommon", desc: "Splash effect hits nearby enemies for additional damage." },
      { name: "Flamespout", rarity: "Unique", desc: "Applies burning: 1 Fire Damage/sec for 7 seconds." },
    ]
  },
  {
    id: "trident_throw", name: "Trident Throw", element: "Water", tier: "Intermediate",
    description: "Shape water into a trident and throw it. 12 Water Damage on hit.",
    upgrades: [
      { name: "Neptunic Puddle", rarity: "Uncommon", desc: "Splash damage: 2.88 Water Damage to nearby enemies." },
    ]
  },
  {
    id: "aqua_prison", name: "Aqua Prison", element: "Water", tier: "Intermediate",
    description: "Trap enemies in a watery prison. 10 Water Damage. Stuns for 1 second if target steps in.",
    upgrades: [
      { name: "Resurgence", rarity: "Common", desc: "If unused, cooldown reduced by 2 seconds." },
      { name: "Aquapop", rarity: "Rare", desc: "Prison explodes early, dealing +8 Water Damage." },
    ]
  },
  {
    id: "healing_waters", name: "Healing Waters", element: "Water", tier: "Intermediate",
    description: "Create a rejuvenating puddle. Heals 6 Health/sec to allies in radius (scales with Water).",
    upgrades: [
      { name: "Acid Rain", rarity: "Uncommon", desc: "Enemies take 1 Nature Damage/sec + Poison (2 Damage/sec for 10s). Locks Cleansing Rain.", locks: ["Cleansing Rain"] },
      { name: "Cleansing Rain", rarity: "Uncommon", desc: "Chance to dispel random debuffs on each tick. Locks Acid Rain.", locks: ["Acid Rain"] },
    ]
  },
  {
    id: "riptide", name: "Riptide", element: "Water", tier: "Advanced",
    description: "Flow into a riptide to strike enemies. 9 Water Damage on hit.",
    upgrades: [
      { name: "Surging Tides", rarity: "Uncommon", desc: "Activates a tide surge dealing 3 Water Damage/sec to nearby enemies." },
      { name: "Aquatic Upheaval", rarity: "Rare", desc: "Pierces at least one enemy before stopping." },
    ]
  },
  {
    id: "crushing_depths", name: "Crushing Depths", element: "Water", tier: "Advanced",
    description: "Place a bubble on an enemy's head, drowning them. 2.65 Water Damage over 8 seconds.",
    upgrades: [
      { name: "Abyss", rarity: "Rare", desc: "Darkens enemy visibility. Scales with Abyss Damage." },
      { name: "Lung Collapse", rarity: "Unique", desc: "Applies hitstun (duration halved)." },
    ]
  },
  {
    id: "crashing_wave", name: "Crashing Wave", element: "Water", tier: "Advanced",
    description: "Guide a rip-current to trap enemies. 6.27 Water Damage/sec. Hold to grow wave size and damage (up to 12.54).",
    upgrades: [
      { name: "Tsunami", rarity: "Uncommon", desc: "+15% size." },
      { name: "Rushing Waters", rarity: "Rare", desc: "+50% speed." },
      { name: "Backwash", rarity: "Unique", desc: "Colliding with wall returns a smaller wave (65% damage)." },
    ]
  },
  {
    id: "geyser", name: "Geyser", element: "Water", tier: "Advanced",
    description: "Erupt a geyser at cursor. 10 Water Damage. Launches enemies upward. Persists 5 seconds. Knocks back and deals +10 Water Damage on proximity.",
    upgrades: []
  },
  {
    id: "hydrolance", name: "Hydrolance", element: "Water", tier: "Masterful",
    description: "Channel a high-pressure water beam. 2.25 Water Damage/sec.",
    upgrades: [
      { name: "Hydropush", rarity: "Uncommon", desc: "Applies minor knockback." },
    ]
  },
  {
    id: "flood", name: "Flood", element: "Water", tier: "Masterful",
    description: "Engulf surroundings in an aquatic dome for 30 seconds. Flood Status: +20% Water Damage, -20% Fire Damage to all in dome.",
    upgrades: [
      { name: "Suffocate", rarity: "Rare", desc: "Drowning effect: 0.66 Water Damage/sec to enemies." },
      { name: "Extinguisher", rarity: "Unique", desc: "+20% Water Damage, -20% Fire Damage (stacking boost)." },
      { name: "Marshwalker", rarity: "Mythical", desc: "+10% Walkspeed while Flood is active." },
    ]
  },
  {
    id: "whirlpool", name: "Whirlpool", element: "Water", tier: "Masterful",
    description: "Summon a stationary whirlpool. 3.25 Water Damage/sec. Pulls enemies toward center. Lasts 10 seconds.",
    upgrades: []
  },
  {
    id: "broadside", name: "Broadside", element: "Water", tier: "Masterful",
    description: "Command a cannon barrage. Each cannonball deals 5 Water Damage near impact.",
    upgrades: [
      { name: "Damaged Hull", rarity: "Rare", desc: "Leaves puddles: 1.5 Water Damage/tick near impact." },
      { name: "Davy Jones' Locker", rarity: "Unique", desc: "Cannonballs stun enemies on impact." },
    ]
  },

  // ─── NATURE ───
  {
    id: "bulb_sprout", name: "Bulb Sprout", element: "Nature", tier: "Basic",
    description: "Convoke a floral bulb that spews pollen. 1.5 Nature Damage to nearby enemies over 8 seconds.",
    upgrades: [
      { name: "Spore Surf", rarity: "Uncommon", desc: "Bulb Sprout reaches 1.5 studs further." },
      { name: "Spore Spew", rarity: "Unique", desc: "Spews spores twice as fast." },
    ]
  },
  {
    id: "poison_arrow", name: "Poison Arrow", element: "Nature", tier: "Basic", tag: "Ranged",
    description: "Fire a poison-tipped arrow. 8 Nature Damage on hit + 18.62 Poison Damage over 15 seconds.",
    upgrades: [
      { name: "Toxic Infusion", rarity: "Common", desc: "+6% Nature Damage." },
      { name: "Venomous Suppression", rarity: "Mythical", desc: "Reduces enemy healing effectiveness by 25% for duration of Poison." },
    ]
  },
  {
    id: "swarm", name: "Swarm", element: "Nature", tier: "Intermediate",
    description: "Send insects to bite and sting an enemy. 2 Nature Damage/sec for 10 seconds.",
    upgrades: [
      { name: "Hornet Swarm", rarity: "Uncommon", desc: "+1.3 Nature Damage, -3 sec duration." },
      { name: "Venomous Stings", rarity: "Rare", desc: "Applies Poison (2 Damage/sec for 10s). Locks Strong Jaws.", locks: ["Strong Jaws"] },
      { name: "Strong Jaws", rarity: "Rare", desc: "Causes Bleed (4.5 Physical Damage/sec for 4s). Locks Venomous Stings.", locks: ["Venomous Stings"] },
    ]
  },
  {
    id: "bloom", name: "Bloom", element: "Nature", tier: "Intermediate",
    description: "Heal an ally or self over time. 4 Health/sec for 5 seconds.",
    upgrades: [
      { name: "Chlorophyll", rarity: "Uncommon", desc: "+10% healing." },
      { name: "Genesis", rarity: "Rare", desc: "Final pulse heals nearby allies. Locks Crown of Thorns.", locks: ["Crown of Thorns"] },
      { name: "Crown of Thorns", rarity: "Rare", desc: "Final pulse damages nearby enemies. Locks Genesis.", locks: ["Genesis"] },
    ]
  },
  {
    id: "envenom", name: "Envenom", element: "Nature", tier: "Intermediate",
    description: "Strike with a venom-coated attack. 11 Nature Damage + 1.5 Poison Damage/sec for 12 seconds.",
    upgrades: [
      { name: "Corrosive Touch", rarity: "Uncommon", desc: "Reduces enemy armor by 10%." },
      { name: "Contagious Venom", rarity: "Rare", desc: "Poison spreads in 10 stud radius." },
    ]
  },
  {
    id: "root_burst", name: "Root Burst", element: "Nature", tier: "Intermediate",
    description: "Summon roots to burst from the ground. 14 Nature Damage. Knocks back nearby enemies.",
    upgrades: [
      { name: "Weeping Roots", rarity: "Uncommon", desc: "Leaves Bog Water puddle dealing 4 Bog Damage." },
      { name: "Rootball", rarity: "Uncommon", desc: "+4% damage, increased knockback." },
    ]
  },
  {
    id: "symbiosis", name: "Symbiosis", element: "Nature", tier: "Advanced",
    description: "Form a bond with an ally or self. Transfers 5% damage/healing. If alone: +5% Armor, slight health regen boost.",
    upgrades: [
      { name: "Neutralism", rarity: "Rare", desc: "Effects doubled when alone. Locks Symbiotic Relationship.", locks: ["Symbiotic Relationship"] },
      { name: "Symbiotic Relationship", rarity: "Rare", desc: "Overflow regeneration to ally or self. Locks Neutralism.", locks: ["Neutralism"] },
    ]
  },
  {
    id: "sporeblossom", name: "Sporeblossom", element: "Nature", tier: "Advanced",
    description: "Contaminate an area with mushrooms and spores. 3 Nature Damage + Poison (2 Damage/sec for 3s) when stepped on.",
    upgrades: [
      { name: "Shroom Colony", rarity: "Common", desc: "Produces an extra mushroom. Locks Altering Spores.", locks: ["Altering Spores"] },
      { name: "Altering Spores", rarity: "Rare", desc: "Causes enemy confusion. Locks Shroom Colony.", locks: ["Shroom Colony"] },
    ]
  },
  {
    id: "encroaching_vines", name: "Encroaching Vines", element: "Nature", tier: "Advanced",
    description: "Summon tangling vines in an area. 4.33 Nature Damage, slows enemies. Weak poison: 1.25 Damage/sec for 12 seconds.",
    upgrades: [
      { name: "Dense Flora", rarity: "Uncommon", desc: "+10% slow." },
      { name: "Vinewrap", rarity: "Unique", desc: "10% chance/sec to wrap enemy ankles and knock them down." },
    ]
  },
  {
    id: "ironbark", name: "Ironbark", element: "Nature", tier: "Advanced",
    description: "Wrap an ally or self with protective bark. Reduces damage taken 15% for 15 seconds.",
    upgrades: [
      { name: "Ivybark", rarity: "Common", desc: "Striking enemies get Poison. Locks Thorned Bark.", locks: ["Thorned Bark"] },
      { name: "Thorned Bark", rarity: "Common", desc: "Enemy takes 15% Nature Damage of what they deal. Locks Ivybark.", locks: ["Ivybark"] },
      { name: "Steelbark", rarity: "Uncommon", desc: "Additional 2.5% damage reduction." },
    ]
  },
  {
    id: "briarlash", name: "Briarlash", element: "Nature", tier: "Masterful",
    description: "Whip a thorned vine into the ground. 18 Nature Damage + weak Poison (1.2 Damage/sec for 9s). Knockback.",
    upgrades: [
      { name: "Vine Extension", rarity: "Uncommon", desc: "+3 studs hitbox." },
      { name: "Grandbriar", rarity: "Unique", desc: "+6 Nature Damage, +30% knockback, ragdolls." },
      { name: "Rapid Bramble", rarity: "Uncommon", desc: "Reduce cooldown by 2 seconds." },
    ]
  },
  {
    id: "natures_embrace", name: "Nature's Embrace", element: "Nature", tier: "Masterful",
    description: "Channel a healing ring for yourself and party. 22.5-67.5 Nature Healing based on channel duration, scales with Nature scaling, and no longer has a max heal cap.",
    upgrades: [
      { name: "Concentrated Matter", rarity: "Uncommon", desc: "0.25s faster max efficiency." },
      { name: "Life Unbound", rarity: "Unique", desc: "+50% heal, costs 10 more mana. Locks Blooming Seed.", locks: ["Blooming Seed"] },
      { name: "Blooming Seed", rarity: "Mythical", desc: "Applies Bloom to all targets. Locks Life Unbound.", locks: ["Life Unbound"] },
    ]
  },

  // ─── DISEASE ───
  {
    id: "decaying_slice", name: "Decaying Slice", element: "Disease", tier: "Basic",
    description: "Slash your enemy with decay-infused power. 7.22 Disease Damage on hit.",
    upgrades: [
      { name: "Infection", rarity: "Uncommon", desc: "Reduces enemy healing by 10%." },
      { name: "Rabid Slash", rarity: "Uncommon", desc: "Applies Rabies (Disease debuff) instead of Bleed." },
      { name: "Rust", rarity: "Unique", desc: "Parried Decaying Slice prevents enemy cooldown reset." },
    ]
  },
  {
    id: "fetid_strike", name: "Fetid Strike", element: "Disease", tier: "Intermediate",
    description: "Imbue your arm with disease and strike. 7.5 Disease Damage + 2.2 Disease Damage/sec for 10 seconds.",
    upgrades: [
      { name: "Fevergash", rarity: "Common", desc: "Applies Fever (Disease debuff) instead of Bleed." },
    ]
  },
  {
    id: "pestilence", name: "Pestilence", element: "Disease", tier: "Intermediate",
    description: "Unleash a wave of plague around you. 1.25 Disease Damage/sec for 15 seconds.",
    upgrades: [
      { name: "Pandemic", rarity: "Uncommon", desc: "+4 studs AoE." },
      { name: "Necrotic Pestilence", rarity: "Rare", desc: "Now affects enemies without 'Rot'." },
      { name: "Black Death", rarity: "Mythical", desc: "+3 Disease Damage/sec for 5 seconds." },
    ]
  },
  {
    id: "ad_mortum", name: "Ad Mortum", element: "Disease", tier: "Intermediate",
    description: "Grab your enemy and spew rot into their face. 16.02 Disease Damage initial + 1.5 periodic Damage over 15 seconds.",
    upgrades: [
      { name: "Pneumonia", rarity: "Rare", desc: "Forces coughing water, scales with Scourgetide, +1.5 Damage." },
      { name: "Dyspnea", rarity: "Mythical", desc: "Enemies cough when dodging." },
    ]
  },
  {
    id: "blood_plague", name: "Blood Plague", element: "Disease", tier: "Advanced",
    description: "Slash with a plague-infused blade. 11 Disease Damage + 8 Disease Damage/sec for 5s if enemy is bleeding.",
    upgrades: [
      { name: "Acute Suffering", rarity: "Uncommon", desc: "+15% DoT." },
      { name: "Chronic Plague", rarity: "Rare", desc: "+1 sec DoT duration." },
      { name: "Patient Three", rarity: "Mythical", desc: "Can apply even if enemy not bleeding." },
      { name: "Epidemic", rarity: "Mythical", desc: "Explodes dead enemies, infects nearby." },
    ]
  },
  {
    id: "necrotic_rot", name: "Necrotic Rot", element: "Disease", tier: "Advanced",
    description: "Throw a rot globe that festers the area. 5 Disease Damage on impact, 1.77 Disease Damage/sec in area. Reduces armor by 20, slows by 3 for 7 seconds.",
    upgrades: [
      { name: "Fervid Infection", rarity: "Uncommon", desc: "+10% damage." },
    ]
  },
  {
    id: "black_death_skill", name: "Black Death", element: "Disease", tier: "Advanced",
    description: "Harvest disease stacks from enemies. Heals you 1 Disease Healing per stack. Applies Soul Decay for 8 seconds.",
    upgrades: [
      { name: "Gangrene", rarity: "Rare", desc: "Reapplies Rot + weak Disease Stack (1 Damage/sec for 10s)." },
    ]
  },
  {
    id: "famine", name: "Famine", element: "Disease", tier: "Masterful",
    description: "Drain health from a target passively. Siphon can be interrupted by stun or range.",
    upgrades: [
      { name: "Soul Shackle", rarity: "Uncommon", desc: "Prevents enemy mana regeneration." },
      { name: "Befoulment", rarity: "Rare", desc: "50% less health drain, also restores your mana." },
    ]
  },
  {
    id: "necropolis", name: "Necropolis", element: "Disease", tier: "Masterful",
    description: "Raise a corpse as your undead minion. Fights until killed or 45 seconds. Strength scales with layer difficulty.",
    upgrades: [
      { name: "Unholy Stitching", rarity: "Unique", desc: "+10% Health, +33% duration." },
      { name: "Rotter Rotter", rarity: "Unique", desc: "No corpse needed, -15% damage & health, 66% duration." },
      { name: "Festering Ghoul", rarity: "Unique", desc: "10% chance per hit to apply Bleed or Disease (2 Damage/sec for 6s)." },
      { name: "Army of the Dead", rarity: "Mythical", desc: "Summons extra ghoul, cooldown -30 seconds." },
    ]
  },
  {
    id: "apocalypse", name: "Apocalypse", element: "Disease", tier: "Legendary",
    description: "Become one with Death, spreading Rot. Increases Disease Damage 1.25% per Rot-afflicted target for 10 seconds.",
    upgrades: [
      { name: "Rotbind", rarity: "Rare", desc: "Allies gain +20 Armor, +3 Walkspeed for 10s. Locks Accelerated Rot.", locks: ["Accelerated Rot"] },
      { name: "Accelerated Rot", rarity: "Rare", desc: "Enemies suffer -20% Armor, -15% Walkspeed. Locks Rotbind & Quietus.", locks: ["Rotbind", "Quietus"] },
      { name: "Quietus", rarity: "Mythical", desc: "Rot also applies Blood Plague. Locks Accelerated Rot.", locks: ["Accelerated Rot"] },
    ]
  },
  {
    id: "desecrate", name: "Desecrate", element: "Disease", tier: "Legendary",
    description: "Slash enemies twice with festering magic, defiling the ground. 12 Disease Damage per slice + 2 Disease Damage/sec on defiled ground (3s duration).",
    upgrades: [
      { name: "Spread of Contamination", rarity: "Uncommon", desc: "+1 stud range for final wave." },
      { name: "Strengthened Rot", rarity: "Unique", desc: "+5% damage on final wave." },
    ]
  },

  // ─── HOLY ───
  {
    id: "light_steps", name: "Light Steps", element: "Holy", tier: "Basic",
    description: "Quick dash and charge Holy Energy in your arms. The next swing fires a Holy Projectile. 11 Holy Damage per projectile.",
    upgrades: [
      { name: "Expel Light", rarity: "Uncommon", desc: "Casts 2 bolts." },
      { name: "Transcendence", rarity: "Unique", desc: "Dash distance increased 15%." },
    ]
  },
  {
    id: "lesser_heal", name: "Lesser Heal", element: "Holy", tier: "Basic",
    description: "Cast a healing seal on the floor, healing 5 Health/sec for 10 seconds. Heals allies.",
    upgrades: [
      { name: "Fortitude", rarity: "Uncommon", desc: "+5% healing." },
      { name: "Panic Button", rarity: "Rare", desc: "Cooldown reduced by 2.5s below 25% health." },
      { name: "Sacred Field", rarity: "Rare", desc: "Allies take 5% less damage within seal." },
      { name: "Lesser Cleanse", rarity: "Unique", desc: "Healing pulses reduce debuff durations by 10%." },
    ]
  },
  {
    id: "seraphim", name: "Seraphim", element: "Holy", tier: "Intermediate",
    description: "Commune with an Amorian Seraphim for +10% Additional Healing and +50% faster Mana Regen for 13 seconds.",
    upgrades: [
      { name: "Apotheosis", rarity: "Uncommon", desc: "+25% healing & mana regen, +4s, +10s cooldown. Locks Cherubim.", locks: ["Cherubim"] },
      { name: "Cherubim", rarity: "Uncommon", desc: "-25% healing & mana regen, -4s, -10s cooldown. Locks Apotheosis.", locks: ["Apotheosis"] },
    ]
  },
  {
    id: "smite", name: "Smite", element: "Holy", tier: "Intermediate",
    description: "Expel a surge of holy power, dealing 14 Holy Damage to enemies in front.",
    upgrades: [
      { name: "Chastise", rarity: "Rare", desc: "Stuns target for 1.25 seconds." },
      { name: "Expungement", rarity: "Rare", desc: "Spread Sinner and Radiance to nearby enemies, 40% increased damage on primary target." },
    ]
  },
  {
    id: "crusading_strike", name: "Crusading Strike", element: "Holy", tier: "Intermediate",
    description: "Empower your blade with Holy Magic. 12 Holy Damage to primary target.",
    upgrades: [
      { name: "Condemn", rarity: "Rare", desc: "Enemy takes 5% more damage from Fire, Physical, Holy for 8s. Locks Preserve.", locks: ["Preserve"] },
      { name: "Sacred Slash", rarity: "Rare", desc: "Hits all enemies in range." },
      { name: "Preserve", rarity: "Unique", desc: "Encapsulates you in a Holy Bubble (absorbs 10 + scaling). Locks Condemn.", locks: ["Condemn"] },
    ]
  },
  {
    id: "zeal", name: "Zeal", element: "Holy", tier: "Advanced",
    description: "Puncture enemy for 8 Holy Damage, then inflict wound: 2 Holy Damage/sec for 6 seconds.",
    upgrades: [
      { name: "Smitten Balance", rarity: "Uncommon", desc: "Target lays on ground for 1.5 seconds." },
      { name: "Flaming Persecution", rarity: "Uncommon", desc: "Sets enemy on fire with Holy Flames." },
    ]
  },
  {
    id: "persecution", name: "Persecution", element: "Holy", tier: "Advanced",
    description: "Challenge nearby enemies to target you for 7 seconds. Gain 15% Armor while active.",
    upgrades: [
      { name: "Sanctified Resolve", rarity: "Common", desc: "+3s, +10% additional Armor. Locks Righteous Fury.", locks: ["Righteous Fury"] },
      { name: "Righteous Fury", rarity: "Rare", desc: "Enemies enraged: +Run speed, +Damage dealt, +Damage taken. Locks Sanctified Resolve.", locks: ["Sanctified Resolve"] },
    ]
  },
  {
    id: "enlightenment", name: "Enlightenment", element: "Holy", tier: "Advanced",
    description: "Heal beam for 2.15 Health/sec in a 28 range and heals multiple times per second. Holds on allies or self.",
    upgrades: [
      { name: "Zen Energy", rarity: "Rare", desc: "+20% healing." },
      { name: "Inner Peace", rarity: "Unique", desc: "Heals 1 additional target, split healing, +15% more. Locks One's Inner Eye.", locks: ["One's Inner Eye"] },
      { name: "One's Inner Eye", rarity: "Mythical", desc: "Debuffs removed 500% faster. Locks Inner Peace.", locks: ["Inner Peace"] },
    ]
  },
  {
    id: "reflection", name: "Reflection", element: "Holy", tier: "Advanced",
    description: "Counter attack and reflect damage back as Holy Damage.",
    upgrades: [
      { name: "Rebound", rarity: "Rare", desc: "+10% counter damage." },
      { name: "Everlasting Echo", rarity: "Rare", desc: "+25% counter window." },
      { name: "Twin Mirage", rarity: "Rare", desc: "Counter 2 attacks." },
    ]
  },
  {
    id: "judgement", name: "Judgement", element: "Holy", tier: "Advanced",
    description: "Summon a sword of Holy magic to pierce the enemy's soul. 12 Holy Damage + 2 per recent Holy spell over 9 seconds.",
    upgrades: [
      { name: "Crusader", rarity: "Unique", desc: "Kills reset cooldown. Locks Martyr.", locks: ["Martyr"] },
      { name: "Martyr", rarity: "Mythical", desc: "Cannot be slain by conventional means. Locks Crusader.", locks: ["Crusader"] },
      { name: "Stay of Execution", rarity: "Unique", desc: "+3s to pierce, +0.5 Holy Damage per stack. Locks Execution Sentence.", locks: ["Execution Sentence"] },
      { name: "Execution Sentence", rarity: "Unique", desc: "Auto-pierce at 5 Holy stacks. Locks Stay of Execution.", locks: ["Stay of Execution"] },
    ]
  },
  {
    id: "holy_wrath", name: "Holy Wrath", element: "Holy", tier: "Masterful",
    description: "Conjure a sphere of holy energy following your gaze. 2.75 Holy Damage/sec to primary and nearby enemies.",
    upgrades: [
      { name: "Solarsulk", rarity: "Rare", desc: "Applies Radiance to struck enemies." },
      { name: "Sun God's Domain", rarity: "Rare", desc: "Rapidly applies weak burn stacks." },
    ]
  },
  {
    id: "rapture", name: "Rapture", element: "Holy", tier: "Masterful",
    description: "Purges debuffs from enemies, dealing 6.15 Holy Damage per debuff.",
    upgrades: [
      { name: "False Prophet", rarity: "Unique", desc: "50% Shadow / 50% Holy damage." },
      { name: "Absolvement", rarity: "Mythical", desc: "+50% damage, applies Sinner (4 Holy Damage/sec for 6s)." },
    ]
  },
  {
    id: "radiant_light", name: "Radiant Light", element: "Holy", tier: "Masterful",
    description: "Large hovering orb smiting nearby enemies for 4.5 Holy Damage/sec for 7 seconds.",
    upgrades: [
      { name: "Eternal Radiance", rarity: "Rare", desc: "Lasts +20% longer." },
      { name: "Dawnglory", rarity: "Unique", desc: "+10 studs radius." },
      { name: "Long Arm of the Law", rarity: "Unique", desc: "Applies hitstun, can be parried, damage -33%." },
    ]
  },
  {
    id: "bless", name: "Bless", element: "Holy", tier: "Masterful",
    description: "Imbue all Non-Holy skills with Holy-Hybrid effect for 13 seconds.",
    upgrades: [
      { name: "Light in the Dark", rarity: "Rare", desc: "+20% Shadow Resistance." },
      { name: "Renew", rarity: "Mythical", desc: "Heals 20 Health on expiry (max 10% total health)." },
    ]
  },
  {
    id: "rune_of_protection", name: "Rune of Protection", element: "Holy", tier: "Masterful",
    description: "Find inner peace, reducing damage taken by 25% for 15 seconds.",
    upgrades: []
  },

  // ─── EARTH ───
  {
    id: "earthen_wall", name: "Earthen Wall", element: "Earth", tier: "Basic",
    description: "Conjure a plane of earthen wall in front of you and kick it into enemies, dealing 13 Earth Damage.",
    upgrades: [
      { name: "Stone Wall", rarity: "Uncommon", desc: "+1% base health." },
      { name: "Crumble", rarity: "Rare", desc: "Wall crumbles, dealing 3 Earth Damage to nearby enemies, loses 1% health/sec." },
    ]
  },
  {
    id: "stone_spike", name: "Stone Spike", element: "Earth", tier: "Intermediate",
    description: "Stomp the ground to summon 1 Earth Spike toward the nearest target. 8 Earth Damage.",
    upgrades: [
      { name: "Rock Gash", rarity: "Uncommon", desc: "Applies weak bleed (1 Physical Damage/sec for 6s)." },
      { name: "Terraforming", rarity: "Rare", desc: "Summons an additional spike, deals 25% less damage." },
    ]
  },
  {
    id: "earth_headbutt", name: "Earth Headbutt", element: "Earth", tier: "Intermediate",
    description: "Headbutt your enemy for 13 Earth Damage (5 Earth Damage to self). Stuns enemy for 1 second.",
    upgrades: [
      { name: "Stone Skull", rarity: "Uncommon", desc: "10% less self-damage." },
      { name: "Titan's Force", rarity: "Rare", desc: "Stun lasts +0.25 seconds." },
    ]
  },
  {
    id: "stoneskin", name: "Stoneskin", element: "Earth", tier: "Advanced",
    description: "Turn your skin to stone, reducing damage from the next 10 attacks by 8 (scales with Earth) for 15 seconds.",
    upgrades: [
      { name: "Stoneman", rarity: "Uncommon", desc: "+8 damage reduction per hit, 60% reduced walkspeed, cannot roll." },
      { name: "Crystal Mirror", rarity: "Mythical", desc: "25% chance to reflect certain spells/skills." },
    ]
  },
  {
    id: "shatter", name: "Shatter", element: "Earth", tier: "Advanced",
    description: "Strike the ground for 18 Earth Damage.",
    upgrades: [
      { name: "Like Iron", rarity: "Rare", desc: "Stuns targets for 1 second." },
      { name: "Strike While Hot", rarity: "Unique", desc: "If striking Burning enemies: erupt a Flame Ring for 9 Fire Damage, spreading burn stacks." },
    ]
  },
  {
    id: "curse_of_stone", name: "Curse of Stone", element: "Earth", tier: "Advanced",
    description: "Turn enemy's legs brittle. 2 Earth Damage/sec, slowing 10% for 10 seconds.",
    upgrades: [
      { name: "Granite", rarity: "Uncommon", desc: "Walk 15% slower. Locks Slate & Concrete.", locks: ["Slate", "Concrete"] },
      { name: "Slate", rarity: "Rare", desc: "+10% Earth Damage/sec. Locks Granite & Concrete.", locks: ["Granite", "Concrete"] },
      { name: "Concrete", rarity: "Rare", desc: "Legs locked for 4s, -30% damage taken. Locks Granite & Slate.", locks: ["Granite", "Slate"] },
    ]
  },
  {
    id: "crystalline_eruption", name: "Crystalline Eruption", element: "Earth", tier: "Masterful",
    description: "Summon a crystal from the ground (20 health), explodes after 10s for 15 Earth Damage.",
    upgrades: [
      { name: "Molten Core", rarity: "Rare", desc: "Leaves lava pool for 10s, 2 Fire Damage/sec." },
      { name: "Obsidian Particulate", rarity: "Unique", desc: "Explodes obsidian shards, applying bleed (3 Physical Damage/sec for 5s)." },
    ]
  },
  {
    id: "quicksand", name: "Quicksand", element: "Earth", tier: "Masterful",
    description: "Engulf area around cursor in quicksand for 7 seconds. 6 Earth Damage/sec, slows enemies.",
    upgrades: [
      { name: "Sinking Depths", rarity: "Uncommon", desc: "+10% slow." },
      { name: "Sand Expansion", rarity: "Rare", desc: "+3 studs AoE." },
      { name: "Endless Mire", rarity: "Rare", desc: "+2 second duration." },
    ]
  },
  {
    id: "uproot", name: "Uproot", element: "Earth", tier: "Masterful",
    description: "Plunge fists into the ground. After 5 seconds, seismic force erupts for 15 Earth Damage + ragdoll & knockback.",
    upgrades: [
      { name: "Dust Storm", rarity: "Rare", desc: "Leaves smog/dirt cloud, 3 Earth Damage/sec for 5s." },
      { name: "Shockwave", rarity: "Unique", desc: "Cast 2s faster, erupts 20% faster." },
    ]
  },

  // ─── ARCANE ───
  {
    id: "arcane_arrow", name: "Arcane Arrow", element: "Arcane", tier: "Basic", tag: "Ranged",
    description: "Fire an Arcane Arrow dealing 16 Arcane Damage. Scales on the average of all your elemental % boosts. Summons a bow automatically.",
    upgrades: [
      { name: "Elemental Bypass", rarity: "Mythical", desc: "Arcane Arrow now pierces through elemental defenses and resistances." },
    ]
  },
  {
    id: "soul_burst", name: "Soul Burst", element: "Arcane", tier: "Intermediate",
    description: "Transforms all Damage Over Time effects on the enemy into Pure Arcane Damage, bypassing all resistances. Damage = Base DoT × stacks × remaining lifetime.",
    upgrades: [
      { name: "Soulslag", rarity: "Mythical", desc: "Adds 20% extra duration to all consumed debuffs." },
    ]
  },
  {
    id: "arcane_gateway", name: "Arcane Gateway", element: "Arcane", tier: "Advanced",
    description: "Set up a one-way portal to teleport yourself to a selected location.",
    upgrades: [
      { name: "Stabilizers", rarity: "Unique", desc: "Reduces Arcane Gateway cooldown by 50%." },
      { name: "Telemancy", rarity: "Mythical", desc: "Teleports allies as well." },
    ]
  },

  // ─── HYBRID ───
  {
    id: "holy_mirror", name: "Holy Mirror", element: "Hybrid", tier: "Basic",
    description: "Summon a blessed earthen mirror that strikes enemies attempting to harm you, dealing 4 Sunsoil Damage. Duration: 7 seconds.",
    upgrades: [
      { name: "Diligent Defender", rarity: "Unique", desc: "Mirror will proc automatically if enemies get too close while you heal." },
      { name: "Righteous Conjecture", rarity: "Rare", desc: "Mirror will proc if enemies attempt to heal themselves in front of it." },
    ]
  },
  {
    id: "whirling_blades", name: "Whirling Blades", element: "Hybrid", tier: "Intermediate",
    description: "Summon two swirling sets of blades. Initial spin: 9 Shadowstrike Damage. Secondary spin: 8 Shadow Damage, Stuns 1.25s.",
    upgrades: [
      { name: "Plan A", rarity: "Rare", desc: "+100% initial damage, secondary -25% & Stun halved. Locks Plan B & Pulse.", locks: ["Plan B", "Pulse"] },
      { name: "Plan B", rarity: "Rare", desc: "+50% secondary damage, Stun +0.25s, initial -50%. Locks Plan A & Pulse.", locks: ["Plan A", "Pulse"] },
      { name: "Pulse", rarity: "Unique", desc: "+1 extra initial spin, initial spin -15%. Locks Plan A & Plan B.", locks: ["Plan A", "Plan B"] },
    ]
  },
  {
    id: "sorrow", name: "Sorrow", element: "Hybrid", tier: "Intermediate",
    description: "Cast a depressive storm dealing 1 Water Damage/sec and applying Depression (-15% action speed & cooldown recovery). Thunderstorm Trigger: if target hit by 3 Lightning instances, erupts for 4 Lightning Damage per strike. 15 seconds.",
    upgrades: [
      { name: "Deluge", rarity: "Unique", desc: "+25% duration, +0.75 Water Damage/sec. Locks Manic Storm.", locks: ["Manic Storm"] },
      { name: "Manic Storm", rarity: "Unique", desc: "Upgrades instantly into Thunderstorm if ≥2 enemies affected. Locks Deluge.", locks: ["Deluge"] },
    ]
  },
  {
    id: "holy_flame_charge", name: "Holy Flame Charge", element: "Hybrid", tier: "Intermediate",
    description: "Shove your blade to erupt 3 pillars of Holy Fire, dealing 10.1 Holy-Fire Damage per pillar and applying Burn Stack.",
    upgrades: [
      { name: "Righteous Flames", rarity: "Uncommon", desc: "+7% Holy Damage, -3.5% Fire Damage. Locks Burning Judgement.", locks: ["Burning Judgement"] },
      { name: "Burning Judgement", rarity: "Uncommon", desc: "+7% Fire Damage, -3.5% Holy Damage. Locks Righteous Flames.", locks: ["Righteous Flames"] },
      { name: "Flame-Bathe", rarity: "Rare", desc: "Burn duration +1s." },
    ]
  },
  {
    id: "glacial_rot", name: "Glacial Rot", element: "Hybrid", tier: "Advanced",
    description: "Deals 4 Feverfrost Damage, chance to apply Chill & Rot.",
    upgrades: [
      { name: "Diseased Mist", rarity: "Uncommon", desc: "Increases Rot potency." },
      { name: "Colder Mist", rarity: "Uncommon", desc: "Increases Chill stack chance." },
      { name: "Entropic Convergence", rarity: "Rare", desc: "Both Chill and Rot applied simultaneously." },
    ]
  },
  {
    id: "rotshade_bolt", name: "Rotshade Bolt", element: "Hybrid", tier: "Masterful",
    description: "Deals 10 Rotshade Damage, applies Insanity & Rot.",
    upgrades: [
      { name: "Clashing Rot", rarity: "Uncommon", desc: "Rot duration increased." },
      { name: "Piercing Psyche", rarity: "Uncommon", desc: "Insanity effect amplified." },
      { name: "Mind-Crumbling Infestation", rarity: "Rare", desc: "If target has both Insanity and Rot: combined explosion." },
    ]
  },
  {
    id: "plasma_line", name: "Plasma Line", element: "Hybrid", tier: "Advanced",
    description: "Creates a fire path that triggers lightning after 2 seconds.",
    upgrades: [
      { name: "Overstimulation", rarity: "Unique", desc: "Applies Magnetise to enemies for 6 seconds." },
    ]
  },
  {
    id: "shadowflame_eruption", name: "Shadowflame Eruption", element: "Hybrid", tier: "Advanced",
    description: "Deals 12.5 Shadowflame Damage and applies Burn Stack (2/s).",
    upgrades: [
      { name: "Abyssal Lunacy", rarity: "Uncommon", desc: "Applies Insanity." },
      { name: "Abyssal Grasp", rarity: "Unique", desc: "Roots enemies for 1 second." },
      { name: "Soul Siphon", rarity: "Mythical", desc: "Heals for 10% of damage dealt." },
    ]
  },
  {
    id: "thunderclap", name: "Thunderclap (Shockquake)", element: "Hybrid", tier: "Advanced",
    description: "Earth + Lightning AoE. Earth hitbox: 12 Earth Damage. Thunder hitbox: 6 Lightning Damage.",
    upgrades: [
      { name: "Thundering Grasp", rarity: "Unique", desc: "Roots Lightning hitbox 1s. Locks Rumbling Halt.", locks: ["Rumbling Halt"] },
      { name: "Rumbling Halt", rarity: "Unique", desc: "Knockdown Earth hitbox. Locks Thundering Grasp.", locks: ["Thundering Grasp"] },
      { name: "Gaea's Wrath", rarity: "Mythical", desc: "Combines into single Lightning hitbox, adds Earth scaling, +25% damage." },
    ]
  },
  {
    id: "obsidian_obelisk", name: "Obsidian Obelisk", element: "Hybrid", tier: "Masterful",
    description: "Erupts massive obsidian, granting seasonal buffs to self/allies for 10s. Spring: Cooldowns 25% faster. Summer: Weak Burn per hit. Fall: Buffs +30% longer. Winter: 20% damage → Frost.",
    upgrades: [
      { name: "Seasonal Shift", rarity: "Rare", desc: "Change or fix specific season effects." },
      { name: "Seasonal Empowerment", rarity: "Rare", desc: "Boost specific season effects." },
    ]
  },
  {
    id: "ground_bullet", name: "Ground Bullet", element: "Hybrid", tier: "Advanced",
    description: "Slide across the ground, firing debris bullets, each dealing 6.5 Rockbreeze Damage.",
    upgrades: [
      { name: "Kick Up", rarity: "Mythical", desc: "+2 bullets." },
      { name: "Orespray", rarity: "Unique", desc: "Debris now varies by metal type (Lead/Iron/Silver)." },
      { name: "Meteorite", rarity: "Uncommon", desc: "Larger bullets (reduced speed)." },
      { name: "Whiplash", rarity: "Common", desc: "Adds 2.5 Wind Damage AoE." },
    ]
  },
  {
    id: "frozen_dry_pierce", name: "Frozen Dry Pierce", element: "Hybrid", tier: "Masterful",
    description: "Lunge with ice javelin for 10 Frostrend Damage, retrieve javelin for 13.5 Frostrend Damage. Consumes half Bleed Stacks but doubles duration.",
    upgrades: [
      { name: "Intracellular", rarity: "Rare", desc: "Converts Bleed Stacks into 2 Chill Stacks." },
      { name: "Barbed Ice Harpoon", rarity: "Uncommon", desc: "Reduces Bleed Stack consumption by 5%, increases current Bleed Damage by 1.5." },
    ]
  },
];