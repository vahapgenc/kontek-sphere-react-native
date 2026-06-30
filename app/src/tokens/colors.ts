// Kontek Sphere — color tokens
// Derived from design/Kontek Design System/colors_and_type.css (:root custom properties).
// Source of truth is that CSS file; keep these in sync (see tools/sync-tokens).

export const colors = {
  // Brand core
  ground: '#122121',
  signature: '#203B3C',
  guide: '#395F61',
  mutedSurface: '#B8C9CA',
  green: '#61BC8F',
  statusBadge: '#9DDFB5',
  kontekGreen: '#053F22',
  red: '#E1462E',

  // Brand support (derived)
  signatureHi: '#2A4B4C',
  guideHi: '#5C8082',
  greenDeep: '#053F22',
  greenSoft: '#E6F7ED',
  greenLine: '#BFE3CF',
  successText: '#053F22',
  celebration: '#E6F7ED',

  // Primary action
  action: '#203B3C',
  actionHi: '#122121',
  actionPress: '#122121',
  actionRing: '#203B3C',
  actionDisabled: '#E6EAEE',
  actionDisabledInk: '#A3B4B6',
  action2: '#9DDFB5',
  action2Hi: '#84D5A4',

  // Neutrals
  canvas: '#ECEFF3',
  surface: '#FFFFFF',
  surface2: '#E6EAEE',
  ink: '#0F1112',
  ink2: '#445C5E',
  ink3: '#475669',
  ink4: '#66777A',
  onDark: '#FFFFFF',
  onDark2: '#B8C9CA',
  onDark3: '#7E9A93',

  // Hairlines & dividers
  line: '#DDE5E6',
  line2: '#E8EDEE',
  silverMist: '#A3B4B6',
  lineOnDark: 'rgba(255, 255, 255, 0.12)',

  // Semantic status
  ok: '#053F22',
  okText: '#053F22',
  okSoft: '#E6F7ED',
  okAccent: '#61BC8F',
  warn: '#7A4A0E',
  warnText: '#7A4A0E',
  warnSoft: '#FEF4E7',
  danger: '#9C3232',
  dangerText: '#9C3232',
  dangerSoft: '#FDEEED',
  info: '#1A5298',
  infoText: '#1A5298',
  infoSoft: '#EBF2FB',

  // Badge-tone background aliases
  okBg: '#E6F7ED',
  warnBg: '#FEF4E7',
  infoBg: '#EBF2FB',
  dangerBg: '#FDEEED',

  // Sphere prototype decisions
  frostBg: 'rgba(242, 248, 245, 0.92)',
  frostLine: 'rgba(18, 33, 33, 0.07)',
  mintLine: 'rgba(32, 59, 60, 0.06)',
  tileFill: '#053F22',
  tileInk: '#FFFFFF',
  chipFill: '#E6F7ED',
  chipInk: '#053F22',
  avatarFill: '#395F61',
  forest: '#183E24',
  scrim: 'rgba(5, 18, 18, 0.42)',

  // Shell / layout
  shellBg: '#203B3C',
  shellBg2: '#2A4B4C',
  shellActive: '#15282A',
  shellHover: 'rgba(255,255,255,0.07)',
  shellInk: '#FFFFFF',
  shellInk2: '#9DDFB5',
  shellLine: 'rgba(255,255,255,0.08)',
  shellCta: '#A9E3BE',
  shellCtaHi: '#97D9AE',
  shellCtaInk: '#122121',
} as const;

// Mint hero-card gradient stops (use with expo-linear-gradient).
export const gradients = {
  mint: ['#F0FAF4', '#DBEFE3'] as const, // 145deg
  // App background base linear stops (the radial glows are approximated separately).
  appBg: ['#CFEAE2', '#E1F3EE', '#F1F8F6', '#FFFFFF'] as const,
} as const;

export type ColorToken = keyof typeof colors;
