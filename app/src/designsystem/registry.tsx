// The 47 design-system entries — mirrors ds-overview.js DATA (group/name/sub/file).
// Each entry's `render()` returns its full spec card. Specs are filled in incrementally
// (Step 4); until then an entry renders a Placeholder.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import { KText } from '../components';
import * as Atoms from './specs/atoms';
import * as Molecules from './specs/molecules';
import * as Organisms from './specs/organisms';

export type DSGroup = 'Atoms' | 'Molecules' | 'Organisms';

export interface DSEntry {
  group: DSGroup;
  name: string;
  sub: string;
  file: string;
  render: () => React.ReactNode;
}

function Placeholder({ file }: { file: string }) {
  const theme = useTheme();
  return (
    <View style={styles.placeholder}>
      <KText variant="bodySm" color={theme.colors.ink4}>
        Specifikation byggs — {file}
      </KText>
    </View>
  );
}

const ph = (file: string) => () => <Placeholder file={file} />;

export const REGISTRY: DSEntry[] = [
  // ─── Atoms (19) ───────────────────────────────────────────
  { group: 'Atoms', name: 'Färger', sub: 'Kärnpalett, ytor och texttoner', file: 'colors.html', render: () => <Atoms.ColorsSpec /> },
  { group: 'Atoms', name: 'Statusfärger', sub: 'Återkopplingstoner — info, lyckat, varning, fel', file: 'colors-status.html', render: () => <Atoms.StatusColorsSpec /> },
  { group: 'Atoms', name: 'App-bakgrund', sub: 'Den enda sanktionerade gradienten — blek skog', file: 'app-background.html', render: () => <Atoms.AppBackgroundSpec /> },
  { group: 'Atoms', name: 'Typografi', sub: 'Open Sans, finjusterad över alla ytor', file: 'typography.html', render: () => <Atoms.TypographySpec /> },
  { group: 'Atoms', name: 'Typskala', sub: 'Storlekssteg för text', file: 'type-scale.html', render: () => <Atoms.TypeScaleSpec /> },
  { group: 'Atoms', name: 'Display-typografi', sub: 'Rubriker och stora tal', file: 'type-display.html', render: () => <Atoms.TypeDisplaySpec /> },
  { group: 'Atoms', name: 'Rutnät', sub: '12-kolumners layoutrutnät', file: 'grid.html', render: () => <Atoms.GridSpec /> },
  { group: 'Atoms', name: 'Avstånd', sub: 'Mellanrum och indrag', file: 'spacing.html', render: () => <Atoms.SpacingSpec /> },
  { group: 'Atoms', name: 'Storlekar', sub: 'Skala för bredd och höjd', file: 'sizing.html', render: () => <Atoms.SizingSpec /> },
  { group: 'Atoms', name: 'Corner radius', sub: 'Mjuka hörn, aldrig skarpa', file: 'radii.html', render: () => <Atoms.RadiiSpec /> },
  { group: 'Atoms', name: 'Skuggor', sub: 'Höjd och lyft', file: 'shadows.html', render: () => <Atoms.ShadowsSpec /> },
  { group: 'Atoms', name: 'Tryckytor', sub: '48px minimum — iOS & Android', file: 'touch-targets.html', render: () => <Atoms.TouchTargetsSpec /> },
  { group: 'Atoms', name: 'Rörelse', sub: 'Varaktighet och easing', file: 'motion.html', render: () => <Atoms.MotionSpec /> },
  { group: 'Atoms', name: 'Ikoner', sub: 'Lucide-linjeikoner, 24px', file: 'icons.html', render: () => <Atoms.IconsSpec /> },
  { group: 'Atoms', name: 'Illustrationer', sub: 'Sparsam, geometrisk, matt stil', file: 'illustrations.html', render: () => <Atoms.IllustrationsSpec /> },
  { group: 'Atoms', name: 'Logotyp', sub: 'Symbol, ordbild och friyta', file: 'logo.html', render: () => <Atoms.LogoSpec /> },
  { group: 'Atoms', name: 'Principer', sub: 'Grunden bakom alla mönster', file: 'guides.html', render: () => <Atoms.PrinciplesSpec /> },
  { group: 'Atoms', name: 'Röst & ton', sub: 'Lugn, varm, svensk, andra person', file: 'voice-tone.html', render: () => <Atoms.VoiceToneSpec /> },
  { group: 'Atoms', name: 'Hjälpklasser', sub: 'Enkla, komponerbara verktygsklasser', file: 'utilities.html', render: () => <Atoms.UtilitiesSpec /> },

  // ─── Molecules (19) ───────────────────────────────────────
  { group: 'Molecules', name: 'Knappar', sub: 'Fyra typer som skapar hierarki', file: 'buttons.html', render: () => <Molecules.ButtonsSpec /> },
  { group: 'Molecules', name: 'Textfält', sub: 'Etikett, hjälptext, 48px höjd', file: 'text-input.html', render: () => <Molecules.TextFieldSpec /> },
  { group: 'Molecules', name: 'Textområde', sub: 'Flerradig fritext', file: 'text-area.html', render: () => <Molecules.TextAreaSpec /> },
  { group: 'Molecules', name: 'Rullgardin', sub: 'Väljer ur en längre lista', file: 'select.html', render: () => <Molecules.SelectSpec /> },
  { group: 'Molecules', name: 'Sök', sub: 'Filtrerar listor och vyer', file: 'search.html', render: () => <Molecules.SearchSpec /> },
  { group: 'Molecules', name: 'Kryssruta', sub: 'Välj noll, en eller flera', file: 'checkbox.html', render: () => <Molecules.CheckboxSpec /> },
  { group: 'Molecules', name: 'Radioknapp', sub: 'Välj exakt ett alternativ', file: 'radio.html', render: () => <Molecules.RadioSpec /> },
  { group: 'Molecules', name: 'Växel', sub: 'Slår på/av direkt', file: 'switch.html', render: () => <Molecules.SwitchSpec /> },
  { group: 'Molecules', name: 'Segmentkontroll', sub: 'Växlar mellan 2–4 likvärdiga vyer', file: 'segmented-control.html', render: () => <Molecules.SegmentedControlSpec /> },
  { group: 'Molecules', name: 'Etiketter', sub: 'Statuspiller och märken', file: 'badges.html', render: () => <Molecules.BadgesSpec /> },
  { group: 'Molecules', name: 'Avatar', sub: 'Cirkulär identitetsmarkör, fem storlekar', file: 'avatar.html', render: () => <Molecules.AvatarSpec /> },
  { group: 'Molecules', name: 'Ikonbrickor & chips', sub: 'Åtgärdsbrickor, mjuka chips & avatarer', file: 'icon-tiles.html', render: () => <Molecules.IconTilesSpec /> },
  { group: 'Molecules', name: 'Flytande kort', sub: 'Ett recept för varje kortyta — --sh-1', file: 'floating-card.html', render: () => <Molecules.FloatingCardSpec /> },
  { group: 'Molecules', name: 'Produktkort', sub: 'Innehållskort', file: 'product-card.html', render: () => <Molecules.ProductCardSpec /> },
  { group: 'Molecules', name: 'Lön-/hjältekort', sub: 'Mjukt mint-hjältekort — aldrig mörk fyllning', file: 'pay-hero.html', render: () => <Molecules.PayHeroSpec /> },
  { group: 'Molecules', name: 'Listrader', sub: 'Inramade grupper och helbredds-listor', file: 'list-rows.html', render: () => <Molecules.ListRowsSpec /> },
  { group: 'Molecules', name: 'Flytande åtgärdsknapp', sub: 'Den enda bestående skapa-åtgärden', file: 'fab.html', render: () => <Molecules.FabSpec /> },
  { group: 'Molecules', name: 'Återkoppling', sub: 'Banner, snackbar och toast', file: 'feedback-mobile.html', render: () => <Molecules.FeedbackSpec /> },
  { group: 'Molecules', name: 'Laddning', sub: 'Skelett, spinner och dra-för-att-uppdatera', file: 'loading.html', render: () => <Molecules.LoadingSpec /> },

  // ─── Organisms (9) ────────────────────────────────────────
  { group: 'Organisms', name: 'Appfält', sub: 'Toppchrome — stor rubrik, kompakt och mörkt', file: 'app-bar.html', render: () => <Organisms.AppBarSpec /> },
  { group: 'Organisms', name: 'Frostat appfält', sub: 'Transparent i vila, frostar in vid skroll', file: 'frosted-bar.html', render: () => <Organisms.FrostedBarSpec /> },
  { group: 'Organisms', name: 'Flikfält', sub: 'Primär navigation — ljust och mörkt', file: 'tab-bar.html', render: () => <Organisms.TabBarSpec /> },
  { group: 'Organisms', name: 'Navigationsmönster', sub: 'Flikfält · drawer · hybrid — när används vilket', file: 'navigation-patterns.html', render: () => <Organisms.NavigationPatternsSpec /> },
  { group: 'Organisms', name: 'Toppmeny (desktop)', sub: 'Vågrät desktop-navigation — 80px bar', file: 'nav-item.html', render: () => <Organisms.TopMenuSpec /> },
  { group: 'Organisms', name: 'Bottenark', sub: 'Innehållsark och åtgärdsark', file: 'bottom-sheet.html', render: () => <Organisms.BottomSheetSpec /> },
  { group: 'Organisms', name: 'Dialog', sub: 'Bekräftelser och varningar', file: 'dialog.html', render: () => <Organisms.DialogSpec /> },
  { group: 'Organisms', name: 'Optimistisk ångra', sub: 'Godkänn direkt, återställ med ett tryck', file: 'optimistic-undo.html', render: () => <Organisms.OptimisticUndoSpec /> },
  { group: 'Organisms', name: 'Återkopplingspanel', sub: 'Tumbetyg och valfri kommentar', file: 'status-row.html', render: () => <Organisms.FeedbackPanelSpec /> },
];

export const GROUP_ORDER: DSGroup[] = ['Atoms', 'Molecules', 'Organisms'];

const styles = StyleSheet.create({
  placeholder: { paddingVertical: 24, alignItems: 'flex-start' },
});
