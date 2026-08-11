export type SlotType = "scope" | "barrel" | "magazine" | "grip" | "stock";

export type StatKey =
  | "damage"
  | "fireRate"
  | "range"
  | "stability"
  | "chargeSpeed";

export const STAT_LABELS: Record<StatKey, string> = {
  damage: "Damage",
  fireRate: "Fire Rate",
  range: "Range",
  stability: "Stability",
  chargeSpeed: "Handling",
};

export const STAT_ORDER: StatKey[] = [
  "damage",
  "fireRate",
  "range",
  "stability",
  "chargeSpeed",
];

/** Energy-weapon vocabulary; the slot keys stay put so anchors keep working. */
export const SLOT_LABELS: Record<SlotType, string> = {
  scope: "Optic",
  barrel: "Emitter",
  magazine: "Cell",
  grip: "Grip",
  stock: "Stabilizer",
};

export const SLOT_ORDER: SlotType[] = [
  "scope",
  "barrel",
  "magazine",
  "grip",
  "stock",
];

export type StatBlock = Record<StatKey, number>;

/**
 * Where an attachment mounts, in the weapon's normalized bounding-box space.
 * u runs along the barrel axis (0 = muzzle end, 1 = rear), v is vertical
 * (0 = bottom, 1 = top), w is lateral (0.5 = centered).
 */
export interface AnchorSpec {
  u: number;
  v: number;
  w?: number;
  /** Multiplies the attachment's default size for this weapon. */
  sizeScale?: number;
}

export interface WeaponDef {
  id: string;
  name: string;
  tagline: string;
  modelUrl: string;
  /** Firing sound effect; absent until the generated audio is synced. */
  soundUrl?: string;
  /** Display length in world units after normalization. */
  displayLength: number;
  stats: StatBlock;
  /** Slots this weapon supports; a missing slot type is incompatible. */
  slots: Partial<Record<SlotType, AnchorSpec>>;
  /** Catalogue code shown in the spec-panel eyebrow, e.g. "BB-001". */
  sku: string;
  /** Edition line rendered beside the SKU. */
  edition: string;
  /** Single-word class for the spec panel, e.g. "Sidearm". */
  className: string;
  /** Spec-panel body copy. */
  description: string;
  /** Index-rail footer meta line. */
  meta: string;
  /**
   * Emitter position in normalized bounds space. Without it fire() falls back
   * to the barrel slot, which is wrong when a weapon has no barrel slot or its
   * emitter does not sit at the barrel height.
   */
  muzzle?: { v: number; w?: number };
}

export interface AttachmentDef {
  id: string;
  name: string;
  slot: SlotType;
  modelUrl: string;
  /** Long-axis size as a fraction of the host weapon's display length. */
  relativeSize: number;
  modifiers: Partial<Record<StatKey, number>>;
  blurb: string;
}

/**
 * Base-relative so the app works when served from a subpath, which is what
 * GitHub Pages project sites do. An absolute "/assets/..." would resolve to
 * the domain root and 404 every model, texture and sound.
 */
const MINT = `${import.meta.env.BASE_URL}assets/mint`;
const PLASMA_PACK = `${MINT}/plasma-weapons/asset_pack_item_glb-vd7fm7jh9n4pdmfxcqf3jxeps98c808x`;
const ATTACH_PACK = `${MINT}/attachments/asset_pack_item_glb-vd730pkbrbwesez24haez5dfb18c0x55`;

export const WEAPONS: WeaponDef[] = [
  {
    id: "ionbreaker",
    name: "Ionbreaker",
    tagline: "Service caster",
    sku: "BB-001",
    edition: "Edition 240",
    className: "Sidearm",
    description:
      "The compact end of the line. A single coil ring behind a short finned nozzle, with the cell seated flat on top of the receiver.",
    meta: "Mint asset pack · item 01 of 05",
    modelUrl: `${PLASMA_PACK}-0-ks73qytpfc8th8qk8s4k9v4h4h8c9ecw.glb`,
    soundUrl: `${MINT}/sfx-ionbreaker/audio_file.mp3`,
    displayLength: 1.3,
    stats: { damage: 62, fireRate: 55, range: 40, stability: 58, chargeSpeed: 82 },
    slots: {
      scope: { u: 0.52, v: 0.8 },
      barrel: { u: 0.06, v: 0.6 },
      magazine: { u: 0.38, v: 0.46 },
    },
  },
  {
    id: "arcwelder",
    name: "Arcwelder",
    tagline: "Coil carbine",
    sku: "BB-002",
    edition: "Edition 180",
    className: "Carbine",
    description:
      "Twin coil wraps and a downward-socketed cell. The only frame in the line that takes all five module types.",
    meta: "Mint asset pack · item 02 of 05",
    modelUrl: `${PLASMA_PACK}-1-ks73mh9z7mw80epz7eb5h5k7hn8c8ztj.glb`,
    soundUrl: `${MINT}/sfx-arcwelder/audio_file.mp3`,
    displayLength: 2.0,
    stats: { damage: 70, fireRate: 72, range: 62, stability: 66, chargeSpeed: 68 },
    slots: {
      scope: { u: 0.5, v: 0.7 },
      barrel: { u: 0.06, v: 0.58 },
      magazine: { u: 0.48, v: 0.38 },
      grip: { u: 0.3, v: 0.38 },
      stock: { u: 0.88, v: 0.5 },
    },
  },
  {
    id: "slagthrower",
    name: "Slagthrower",
    tagline: "Plasma thrower",
    sku: "BB-003",
    edition: "Edition 120",
    className: "Heavy",
    description:
      "The flagship. A deep-finned shroud, heavy windings at the emitter throat, and a full-length cell riding the spine.",
    meta: "Mint asset pack · item 03 of 05",
    modelUrl: `${PLASMA_PACK}-2-ks70rvvck6byad9nzc40525ct58c8w2x.glb`,
    soundUrl: `${MINT}/sfx-slagthrower/audio_file.mp3`,
    displayLength: 2.2,
    stats: { damage: 96, fireRate: 30, range: 44, stability: 38, chargeSpeed: 42 },
    slots: {
      scope: { u: 0.5, v: 0.74, sizeScale: 1.15 },
      barrel: { u: 0.06, v: 0.55 },
      magazine: { u: 0.55, v: 0.36 },
      grip: { u: 0.32, v: 0.36 },
    },
    muzzle: { v: 0.52 },
  },
  {
    id: "longcoil",
    name: "Longcoil",
    tagline: "Marksman caster",
    sku: "BB-004",
    edition: "Edition 60",
    className: "Marksman",
    description:
      "Three coil rings spaced down an extended emitter tube. Everything on this frame is traded for reach.",
    meta: "Mint asset pack · item 04 of 05",
    modelUrl: `${PLASMA_PACK}-3-ks70k5nyancr9w1gch4f0fpnh18c9skz.glb`,
    soundUrl: `${MINT}/sfx-longcoil/audio_file.mp3`,
    displayLength: 2.7,
    stats: { damage: 100, fireRate: 12, range: 100, stability: 48, chargeSpeed: 34 },
    slots: {
      scope: { u: 0.52, v: 0.72, sizeScale: 1.1 },
      barrel: { u: 0.06, v: 0.56 },
      stock: { u: 0.9, v: 0.52 },
    },
  },
  {
    id: "boilover",
    name: "Boilover",
    tagline: "Scatter caster",
    sku: "BB-005",
    edition: "Edition 90",
    className: "Scatter",
    description:
      "Twin apertures over a slung canister. Emitter, cell, grip and stabilizer are all welded to the frame — only the optic rail takes a module.",
    meta: "Mint asset pack · item 05 of 05",
    modelUrl: `${PLASMA_PACK}-4-ks79ewqmetgwkhf1tm4rnzqs2x8c9y9e.glb`,
    soundUrl: `${MINT}/sfx-boilover/audio_file.mp3`,
    displayLength: 1.9,
    stats: { damage: 88, fireRate: 28, range: 22, stability: 44, chargeSpeed: 56 },
    slots: {
      scope: { u: 0.5, v: 0.72 },
    },
    muzzle: { v: 0.62 },
  },
];

export const ATTACHMENTS: AttachmentDef[] = [
  {
    id: "holo-scope",
    name: "Holo Scope",
    slot: "scope",
    modelUrl: `${ATTACH_PACK}-0-ks75dye1rkxe9hs6b9b6d6gygx8c1w30.glb`,
    relativeSize: 0.24,
    modifiers: { range: 18, chargeSpeed: -5 },
    blurb: "Holographic optic. Sharper reach, slower spin-up.",
  },
  {
    id: "emitter-extension",
    name: "Emitter Extension",
    slot: "barrel",
    modelUrl: `${ATTACH_PACK}-1-ks73a9cpn966a4qgeatsrzygnd8c01qd.glb`,
    relativeSize: 0.34,
    modifiers: { range: 12, damage: 8, fireRate: -10 },
    blurb: "Longer beam column. Hits harder, cycles slower.",
  },
  {
    id: "energy-canister",
    name: "Energy Canister",
    slot: "magazine",
    modelUrl: `${ATTACH_PACK}-2-ks7c7jw5vbhdvptyjdwd7n20y18c1gyg.glb`,
    relativeSize: 0.2,
    modifiers: { fireRate: 15, chargeSpeed: 10, stability: -8 },
    blurb: "Overcharged cell feed. Faster everything, twitchier handling.",
  },
  {
    id: "tactical-grip",
    name: "Tactical Grip",
    slot: "grip",
    modelUrl: `${ATTACH_PACK}-3-ks784k64132nxr0qewnedw1ebd8c1c7e.glb`,
    relativeSize: 0.16,
    modifiers: { stability: 20, fireRate: -5 },
    blurb: "Angled forward handle. Locks the emitter down.",
  },
  {
    id: "stabilizer-stock",
    name: "Stabilizer Stock",
    slot: "stock",
    modelUrl: `${ATTACH_PACK}-4-ks73bp8dmc3vzne0q1sw4j74n98c1p5g.glb`,
    relativeSize: 0.3,
    modifiers: { stability: 15, range: 8, chargeSpeed: -10 },
    blurb: "Finned shoulder rest. Steadier beams at distance.",
  },
];

export const PLATFORM_MODEL_URL = `${MINT}/pedestal/original_glb.glb`;

export function attachmentForSlot(slot: SlotType): AttachmentDef | undefined {
  return ATTACHMENTS.find((a) => a.slot === slot);
}

export function weaponById(id: string): WeaponDef {
  const weapon = WEAPONS.find((w) => w.id === id);
  if (!weapon) throw new Error(`Unknown weapon: ${id}`);
  return weapon;
}

export function clampStat(value: number): number {
  return Math.max(0, Math.min(100, value));
}
