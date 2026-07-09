import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const ORIGIN_CARDS = [
  {
    id: 'aranae',
    name: 'Aranae',
    image: 'https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/4588dff50_image_2026-03-16_100328473.png',
    tagline: 'Racial Skill: Root an enemy for 5s with congealed web and deal 3.5 damage.',
    buffs: ['+10% Attack Speed', '+2.5% Critical Strike Chance', 'Poison, Blood Plague, and Bleed deal 10% more damage', 'Backstabs deal 5% more damage', '+5 Perception'],
    debuffs: ['Stuns last 25% longer', '+8% Damage Taken'],
  },
  {
    id: 'calvar',
    name: 'Calvar',
    image: 'https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/222f2bd9a_image_2026-03-16_100351073.png',
    tagline: 'Racial Skill: Self-destruct for 18 damage to nearby enemies and aggro them during windup.',
    buffs: ['Cannot die from environmental effects, but can still be damaged by them', 'Heal 10% max health on kill', 'Hitstun applied to you is 10% shorter', '+33% starting health', '+15% maximum health'],
    debuffs: ['70% Less Healing', 'No Health Regeneration'],
  },
  {
    id: 'cragg',
    name: 'Cragg',
    image: 'https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/3292e0e18_image_2026-03-16_100358356.png',
    tagline: 'Racial Skill: Charge with hyperarmor until impact, dealing 15 damage on enemy contact.',
    buffs: ['Enrage on double stun within 10s removes temporary debuffs and grants +10% damage for 10s', '5% of all damage bypasses enemy shields', '+12.5% Max Health'],
    debuffs: ['-15 Max Mana', '-15% Walk Speed'],
  },
  {
    id: 'facadae',
    name: 'Facadae',
    image: 'https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/b36d4ffca_image_2026-03-16_100405756.png',
    tagline: 'Racial Skill: Mimic a random ally race buff (excluding racial skill/core).',
    buffs: ['Consecutive hits of the same element form resistance up to 50%', '+15% support buff durations', '+10 Max Mana', '+7.5% Healing Effectiveness'],
    debuffs: ['Taking damage from a new element causes 10% more damage taken', '-10% Max Health', '+10% Longer Cooldowns'],
  },
  {
    id: 'feriun',
    name: 'Feriun',
    image: 'https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/09fef3161_image_2026-03-16_100412106.png',
    tagline: 'Racial Skill: Sacrifice one-third of current health to gain +30% total damage for 22s.',
    buffs: ['Note: Spells are skills with a casting hand animation (e.g., Cataclysm, Everwinter)', 'Spell casts are up to 21% faster at lower health', 'All spells cost 9% less (minimum 1 mana)', 'All spells cast 9% faster', 'All casted spells deal 9% more damage'],
    debuffs: ['-15% Non-Spell Damage'],
  },
  {
    id: 'gelidium',
    name: 'Gelidium',
    image: 'https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/27807320b_image_2026-03-16_100419772.png',
    tagline: 'Racial Skill: While slime is active, enemies that melee strike you are temporarily disarmed.',
    buffs: ['Weapon hits make enemies take 5% more damage and move 15% slower for 2s', 'Stuns applied to you are 25% shorter', 'All DoT damage applied to you is reduced by 10%', 'Potions and consumables last 20% longer', 'Being critically struck increases your regeneration by 20% for 3s'],
    debuffs: ['+7.5% Fire/Frost Damage Taken', '-7.5% Damage Dealt'],
  },
  {
    id: 'harmonite',
    name: 'Harmonite',
    image: 'https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/c82dad918_image_2026-03-16_100427573.png',
    tagline: 'Racial Skill: None.',
    buffs: ['+25% Potential Choice', '+15% EXP Gain', '+15% Gold Gain'],
    debuffs: [],
  },
  {
    id: 'katiyr',
    name: 'Katiyr',
    image: 'https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/a6e94ebbe_image_2026-03-16_100437539.png',
    tagline: 'Racial Skill: Auto-dodge the next applicable attack, then grant all 3 dodge racial stacks.',
    buffs: ['Successful dodges grant +1.5% crit chance for 6s, stacking up to 3', '+15% Walkspeed', 'Roll cooldown decreased by 20%'],
    debuffs: ['+10% Damage Near 2+ Enemies', '+10% Water/Disease Damage Taken'],
  },
  {
    id: 'kixxm',
    name: "Kix'xm",
    image: 'https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/1dbea2aa0_image_2026-03-16_100447122.png',
    tagline: 'Racial Skill: Summon a mana-rose giving +18% mana regen to you and nearby allies for 10s.',
    buffs: ['Immune to ragdolls and knockback while standing still', 'Nature/Wind/Water/Earth spells heal based on skill cost on successful cast', '+15% Mana Regeneration'],
    debuffs: ['-10% Health Regen', '+20% Debuff Duration', '+10% Debuff Damage'],
  },
  {
    id: 'voidtouched',
    name: 'Voidtouched',
    image: 'https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/f55ea0426_image_2026-03-16_100457739.png',
    tagline: 'Racial Skill: Nullification field for 12s that blocks enemy spell casts and doubles your mana leech inside.',
    buffs: ['All weapon attacks and parries steal 1 mana', 'Deal 20% more damage when critically striking an enemy'],
    debuffs: ['-15% Max Health', '-20 Max Mana', '-25% Mana Regen'],
  },
  {
    id: 'nespin',
    name: 'Nespin',
    image: 'https://media.base44.com/images/public/69876c0ef4cd9311dba841d5/2ec0911d9_color-replaced1.png',
    tagline: 'Racial Skill: Supersonic screech reveals enemies within 200 studs for 10s and deals 1.5 physical damage within 25 studs.',
    buffs: ['Can jump twice every 2s out of combat and every 5s in combat', 'Dashes replace rolls and can evade while casting or using light attacks', 'Leeches 2% of all damage dealt as health'],
    debuffs: ['-12.5% Dash i-frames', '+12.5% Dash Cooldown', 'Cannot Cancel Dash'],
  },
];

const CARD_COUNT = ORIGIN_CARDS.length;
const CARD_STEP_DEG = 360 / CARD_COUNT;
const RADIUS_PADDING = 70;

function normalizeAngle(angle) {
  const wrapped = angle % 360;
  return wrapped < 0 ? wrapped + 360 : wrapped;
}

function getAngleDistance(a, b) {
  const delta = Math.abs(normalizeAngle(a) - normalizeAngle(b));
  return Math.min(delta, 360 - delta);
}

export default function OriginSelectionOverlay({
  codeInput,
  onCodeInputChange,
  onLoadCode,
  onSelectOrigin,
}) {
  const wheelSurfaceRef = useRef(null);
  const cardMeasureRef = useRef(null);
  const [rotationY, setRotationY] = useState(0);
  const [radius, setRadius] = useState(420);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const updateRadius = () => {
      const measuredWidth = cardMeasureRef.current?.offsetWidth || 336;
      const nextRadius = (measuredWidth / 2) / Math.tan(Math.PI / CARD_COUNT) + RADIUS_PADDING;
      setRadius(Math.max(nextRadius, 320));
    };

    updateRadius();

    const observer = new ResizeObserver(updateRadius);
    if (cardMeasureRef.current) observer.observe(cardMeasureRef.current);
    window.addEventListener('resize', updateRadius);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateRadius);
    };
  }, []);

  useEffect(() => {
    const element = wheelSurfaceRef.current;
    if (!element) return;

    const handleWheel = (event) => {
      event.preventDefault();
      setRotationY((previous) => previous + event.deltaY * 0.09);
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, []);

  const activeCardIndex = useMemo(() => {
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    ORIGIN_CARDS.forEach((_, index) => {
      const cardAngle = index * CARD_STEP_DEG;
      const distance = getAngleDistance(cardAngle, rotationY);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });

    return bestIndex;
  }, [rotationY]);

  const handleSelectOrigin = useCallback((originId) => {
    setIsClosing(true);
    window.setTimeout(() => {
      onSelectOrigin(originId);
    }, 220);
  }, [onSelectOrigin]);

  const handlePopularBuildsClick = useCallback(() => {
    // Placeholder intentionally left empty for future implementation.
  }, []);

  const handleLoadCode = useCallback(async () => {
    const loaded = await onLoadCode();
    if (loaded) {
      setIsClosing(true);
    }
  }, [onLoadCode]);

  return (
    <div
      className={`fixed inset-0 z-[999] transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background: 'radial-gradient(circle at 50% 40%, rgba(34, 44, 64, 0.28), rgba(0, 0, 0, 0.74) 62%, rgba(0, 0, 0, 0.9) 100%)',
        backdropFilter: 'blur(15px) brightness(0.3)',
      }}
    >
      <style>{`
        .origin-overlay-title {
          font-family: 'Cinzel', serif;
          text-transform: uppercase;
          letter-spacing: 0.34em;
          font-size: clamp(1.2rem, 2.4vw, 1.9rem);
          color: #f1f5f9;
          text-shadow: 0 8px 20px rgba(0, 0, 0, 0.9), 0 0 18px rgba(148, 163, 184, 0.35);
        }

        .origin-ring-stage {
          perspective: 1800px;
          perspective-origin: center;
          transform-style: preserve-3d;
        }

        .origin-ring {
          position: relative;
          width: min(88vw, 420px);
          height: 420px;
          transform-style: preserve-3d;
          transition: transform 180ms cubic-bezier(0.22, 0.61, 0.36, 1);
          will-change: transform;
        }

        .faction-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(82vw, 336px);
          min-height: 355px;
          transform-style: preserve-3d;
          backface-visibility: visible;
          border: 1px solid rgba(148, 163, 184, 0.22);
          background-image:
            linear-gradient(to top, rgba(10,10,12,0.95) 50%, rgba(10,10,12,0.3) 100%),
            var(--card-image);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          box-shadow: 0 24px 80px -34px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(226, 232, 240, 0.08);
          border-radius: 12px;
          padding: 1.2rem;
          transition: filter 200ms ease, border-color 200ms ease, box-shadow 220ms ease;
          cursor: pointer;
          overflow: hidden;
        }

        .faction-card--active {
          border-color: rgba(244, 244, 245, 0.42);
          filter: brightness(1);
          box-shadow: 0 28px 90px -35px rgba(0, 0, 0, 0.98), 0 0 0 1px rgba(244, 244, 245, 0.18);
        }

        .faction-card--inactive {
          filter: brightness(0.4) blur(1px);
        }

        .faction-card__surface {
          position: relative;
          height: 100%;
          z-index: 1;
          animation: factionFloat 5.2s ease-in-out infinite;
          animation-delay: var(--float-delay);
        }

        @keyframes factionFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      <div className="relative flex min-h-screen flex-col items-center px-4 pb-8 pt-8 md:pt-6">
        <header className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 text-center">
          <h2 className="origin-overlay-title">Pick Your Origin</h2>
        </header>

        <div
          ref={wheelSurfaceRef}
          className="origin-ring-stage mt-24 flex flex-1 w-full items-center justify-center"
          aria-label="Origin carousel"
        >
          <div
            className="origin-ring"
            style={{ transform: `rotateY(${-rotationY}deg)` }}
          >
            {ORIGIN_CARDS.map((origin, index) => {
              const isActive = index === activeCardIndex;
              const angle = index * CARD_STEP_DEG;
              return (
                <article
                  key={origin.id}
                  ref={index === 0 ? cardMeasureRef : null}
                  className={`faction-card ${isActive ? 'faction-card--active' : 'faction-card--inactive'}`}
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                    '--card-image': `url(${origin.image})`,
                    '--float-delay': `${index * 0.18}s`,
                  }}
                  onClick={() => handleSelectOrigin(origin.id)}
                >
                  <div className="faction-card__surface">
                    <div className="mb-3 flex items-center justify-between border-b border-slate-700/70 pb-2">
                      <h3 className="text-xl font-semibold tracking-[0.16em] uppercase text-slate-50">{origin.name}</h3>
                      <span className="rounded-sm border border-slate-600/60 bg-black/40 px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-300">
                        Race
                      </span>
                    </div>

                    <p className="mb-4 text-sm leading-relaxed text-slate-200">{origin.tagline}</p>

                    <div className="space-y-3">
                      <div>
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-emerald-300">Buffs</p>
                        <ul className="space-y-1 text-xs text-slate-200">
                          {origin.buffs.map((buff) => (
                            <li key={`${origin.id}-buff-${buff}`} className="rounded border border-emerald-300/25 bg-emerald-950/35 px-2 py-1 backdrop-blur-[1px]">
                              {buff}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {origin.debuffs.length > 0 ? (
                        <div>
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-rose-400">Debuffs</p>
                          <ul className="space-y-1 text-xs text-rose-200/95">
                            {origin.debuffs.map((debuff) => (
                              <li key={`${origin.id}-debuff-${debuff}`} className="rounded border border-rose-400/25 bg-rose-950/40 px-2 py-1 backdrop-blur-[1px]">
                                {debuff}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="w-full max-w-3xl pb-2">
          <div className="mx-auto flex w-full flex-col items-stretch justify-center gap-3 rounded-xl border border-slate-700/50 bg-black/55 p-3 shadow-[0_22px_55px_-28px_rgba(0,0,0,0.95)] backdrop-blur-md md:flex-row">
            <button
              type="button"
              onClick={handlePopularBuildsClick}
              className="rounded-md border border-slate-500/70 bg-slate-900/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 transition-colors hover:bg-slate-800/70"
            >
              View Popular Builds
            </button>

            <div className="flex flex-1 items-center gap-2">
              <input
                type="text"
                value={codeInput}
                placeholder="Enter code or paste link..."
                onChange={(event) => onCodeInputChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    void handleLoadCode();
                  }
                }}
                className="h-10 flex-1 rounded-md border border-slate-600/60 bg-black/70 px-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-slate-400"
              />
              <button
                type="button"
                onClick={() => void handleLoadCode()}
                className="h-10 rounded-md border border-slate-400/70 bg-slate-100 px-4 text-xs font-bold tracking-[0.22em] text-black transition-colors hover:bg-white"
              >
                LOAD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
