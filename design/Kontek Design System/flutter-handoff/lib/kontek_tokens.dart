import 'package:flutter/widgets.dart';

/// Kontek Design System — Spacing, sizing, radii, elevation & motion tokens.
/// Generated from colors_and_type.css. Values are logical pixels (Flutter dp).
class KontekSpacing {
  KontekSpacing._();
  // 4px base scale (--sp-*)
  static const sp1 = 4.0;   static const sp2 = 8.0;   static const sp3 = 12.0;
  static const sp4 = 16.0;  static const sp5 = 20.0;  static const sp6 = 24.0;
  static const sp8 = 32.0;  static const sp10 = 40.0; static const sp12 = 48.0;
  static const sp16 = 64.0;

  // Screen layout
  static const screenGutter   = 16.0; // default side padding
  static const screenGutterLg = 20.0; // roomier hero gutter
}

class KontekRadii {
  KontekRadii._();
  static const button = 12.0; // buttons & primary controls
  static const input  = 12.0; // text fields, selects, search
  static const card   = 16.0; // content cards
  static const panel  = 20.0; // hero panels, grouped list blocks
  static const sheet  = 24.0; // bottom sheets, dialogs (top corners)
  static const sm     = 8.0;
  static const pill   = 999.0;

  static BorderRadius get buttonR => BorderRadius.circular(button);
  static BorderRadius get inputR  => BorderRadius.circular(input);
  static BorderRadius get cardR   => BorderRadius.circular(card);
  static BorderRadius get panelR  => BorderRadius.circular(panel);
  // Sheets/dialogs round the TOP corners only.
  static const sheetR = BorderRadius.vertical(top: Radius.circular(sheet));
}

class KontekSizing {
  KontekSizing._();
  // Touch / control sizing — one cross-platform language (iOS 44pt · Android 48dp → 48 everywhere)
  static const tapMin     = 48.0; // minimum hit target for ANY interactive element
  static const controlH   = 48.0; // default button/input/row CTA height
  static const controlHLg = 56.0; // prominent full-width actions
  static const controlHSm = 40.0; // compact controls in dense rows
  static const appBarH    = 56.0; // compact app-bar height
  static const tabBarH    = 58.0; // bottom tab-bar content height (excl. safe area)
}

class KontekElevation {
  KontekElevation._();
  // Soft brand shadows (base rgba 18,33,33). Use as BoxDecoration boxShadow.
  static List<BoxShadow> get xs => [
        BoxShadow(color: const Color(0xFF122121).withOpacity(0.05), blurRadius: 2, offset: const Offset(0, 1)),
      ];
  static List<BoxShadow> get sm => [
        BoxShadow(color: const Color(0xFF122121).withOpacity(0.06), blurRadius: 3, offset: const Offset(0, 1)),
        BoxShadow(color: const Color(0xFF122121).withOpacity(0.04), blurRadius: 2, offset: const Offset(0, 1)),
      ];
  static List<BoxShadow> get md => [
        BoxShadow(color: const Color(0xFF122121).withOpacity(0.08), blurRadius: 14, offset: const Offset(0, 4)),
        BoxShadow(color: const Color(0xFF122121).withOpacity(0.05), blurRadius: 3, offset: const Offset(0, 1)),
      ];
  static List<BoxShadow> get lg => [
        BoxShadow(color: const Color(0xFF122121).withOpacity(0.12), blurRadius: 32, offset: const Offset(0, 12)),
        BoxShadow(color: const Color(0xFF122121).withOpacity(0.06), blurRadius: 8, offset: const Offset(0, 2)),
      ];
  static List<BoxShadow> get cta => [
        BoxShadow(color: const Color(0xFF122121).withOpacity(0.18), blurRadius: 18, offset: const Offset(0, 6)),
      ];
}

class KontekMotion {
  KontekMotion._();
  // Durations — full range fits in 400ms. Set scalar to 0 for reduced motion.
  static const instant  = Duration(milliseconds: 50);  // hover tints, border shifts
  static const fast     = Duration(milliseconds: 100); // checkbox, toggle, button press
  static const moderate = Duration(milliseconds: 150); // dropdown, tooltip, accordion
  static const slow     = Duration(milliseconds: 250); // modal fade, drawer, notification
  static const slower   = Duration(milliseconds: 400); // scrim / overlay backdrop fade

  // Easing
  static const standard = Cubic(0.2, 0, 0.38, 0.9);
  static const entrance = Cubic(0, 0, 0.38, 0.9);
  static const exit     = Cubic(0.2, 0, 1, 0.9);
}
