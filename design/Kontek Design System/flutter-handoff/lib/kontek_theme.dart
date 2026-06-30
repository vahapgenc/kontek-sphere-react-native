import 'package:flutter/material.dart';
import 'kontek_colors.dart';
import 'kontek_typography.dart';
import 'kontek_tokens.dart';

/// Kontek Design System — composed Flutter ThemeData (light).
/// Wire into MaterialApp: `theme: KontekTheme.light`.
/// Component themes below mirror the CSS component specs so stock Material
/// widgets render on-brand without per-screen styling.
class KontekTheme {
  KontekTheme._();

  static ThemeData get light {
    final scheme = const ColorScheme.light(
      primary:   KontekColors.signature,     // primary CTA
      onPrimary: Colors.white,
      secondary: KontekColors.green,          // interaction (toggle/checkbox)
      onSecondary: KontekColors.ground,
      surface:   KontekColors.surface,
      onSurface: KontekColors.ink,
      error:     KontekColors.danger,
      onError:   Colors.white,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: KontekColors.canvas,
      textTheme: KontekType.textTheme,
      splashFactory: InkRipple.splashFactory,

      // ---- App bar (compact). For large-title use SliverAppBar.large. ----
      appBarTheme: const AppBarTheme(
        toolbarHeight: KontekSizing.appBarH,
        backgroundColor: KontekColors.canvas,
        surfaceTintColor: Colors.transparent,
        foregroundColor: KontekColors.ink,
        elevation: 0,
        centerTitle: true,
      ),

      // ---- Primary button (filled teal, 48px, radius 12) ----
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: KontekColors.action,
          foregroundColor: Colors.white,
          disabledBackgroundColor: KontekColors.actionDisabled,
          disabledForegroundColor: KontekColors.actionDisabledInk,
          minimumSize: const Size(0, KontekSizing.controlH),
          padding: const EdgeInsets.symmetric(horizontal: KontekSpacing.sp6),
          textStyle: KontekType.bodyStyle.copyWith(fontWeight: KontekType.semibold),
          shape: RoundedRectangleBorder(borderRadius: KontekRadii.buttonR),
        ).copyWith(
          overlayColor: WidgetStateProperty.all(KontekColors.actionHi.withOpacity(0.12)),
        ),
      ),

      // ---- Secondary button (outline) ----
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: KontekColors.ink,
          backgroundColor: KontekColors.surface,
          minimumSize: const Size(0, KontekSizing.controlH),
          padding: const EdgeInsets.symmetric(horizontal: KontekSpacing.sp6),
          textStyle: KontekType.bodyStyle.copyWith(fontWeight: KontekType.semibold),
          side: const BorderSide(color: KontekColors.line),
          shape: RoundedRectangleBorder(borderRadius: KontekRadii.buttonR),
        ),
      ),

      // ---- Ghost / text button ----
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: KontekColors.action,
          minimumSize: const Size(0, KontekSizing.controlH),
          padding: const EdgeInsets.symmetric(horizontal: KontekSpacing.sp3),
          textStyle: KontekType.bodyStyle.copyWith(fontWeight: KontekType.semibold),
          shape: RoundedRectangleBorder(borderRadius: KontekRadii.buttonR),
        ),
      ),

      // ---- Inputs (48px, radius 12, signature focus ring) ----
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: KontekColors.surface,
        contentPadding: const EdgeInsets.symmetric(horizontal: KontekSpacing.sp4, vertical: 12),
        hintStyle: KontekType.bodyStyle.copyWith(color: KontekColors.ink4),
        labelStyle: KontekType.captionStyle.copyWith(
            color: KontekColors.ink2, fontWeight: KontekType.semibold),
        enabledBorder: OutlineInputBorder(
          borderRadius: KontekRadii.inputR,
          borderSide: const BorderSide(color: KontekColors.line),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: KontekRadii.inputR,
          borderSide: const BorderSide(color: KontekColors.signature, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: KontekRadii.inputR,
          borderSide: const BorderSide(color: KontekColors.danger),
        ),
      ),

      // ---- Selection controls (Interaction green fill) ----
      checkboxTheme: CheckboxThemeData(
        fillColor: WidgetStateProperty.resolveWith((s) =>
            s.contains(WidgetState.selected) ? KontekColors.green : Colors.transparent),
        checkColor: WidgetStateProperty.all(Colors.white),
        side: const BorderSide(color: KontekColors.ink3, width: 2),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(7)),
      ),
      radioTheme: RadioThemeData(
        fillColor: WidgetStateProperty.resolveWith((s) =>
            s.contains(WidgetState.selected) ? KontekColors.signature : KontekColors.ink3),
      ),
      switchTheme: SwitchThemeData(
        thumbColor: WidgetStateProperty.all(Colors.white),
        trackColor: WidgetStateProperty.resolveWith((s) =>
            s.contains(WidgetState.selected) ? KontekColors.green : KontekColors.silverMist),
        trackOutlineColor: WidgetStateProperty.all(Colors.transparent),
      ),

      // ---- Cards ----
      cardTheme: CardThemeData(
        color: KontekColors.surface,
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: KontekRadii.cardR,
          side: const BorderSide(color: KontekColors.line),
        ),
      ),

      // ---- Bottom navigation (light). For the dark/green bar, override
      //      backgroundColor: KontekColors.shellBg with white icons/labels. ----
      navigationBarTheme: NavigationBarThemeData(
        height: KontekSizing.tabBarH,
        backgroundColor: KontekColors.surface,
        indicatorColor: KontekColors.greenSoft,
        labelTextStyle: WidgetStateProperty.all(
          KontekType.captionStyle.copyWith(fontSize: KontekType.micro, fontWeight: KontekType.semibold),
        ),
      ),

      // ---- Bottom sheets / dialogs (24px top radius) ----
      bottomSheetTheme: const BottomSheetThemeData(
        backgroundColor: KontekColors.surface,
        shape: RoundedRectangleBorder(borderRadius: KontekRadii.sheetR),
        showDragHandle: true,
      ),
      dialogTheme: DialogThemeData(
        backgroundColor: KontekColors.surface,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(KontekRadii.sheet)),
      ),

      // ---- FAB (the single persistent "create" action) ----
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: KontekColors.action,
        foregroundColor: Colors.white,
      ),

      // ---- Snackbar ----
      snackBarTheme: SnackBarThemeData(
        backgroundColor: KontekColors.ground,
        contentTextStyle: KontekType.bodySmStyle.copyWith(color: Colors.white),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(KontekRadii.sm)),
        behavior: SnackBarBehavior.floating,
      ),

      dividerTheme: const DividerThemeData(color: KontekColors.line, thickness: 1, space: 1),
    );
  }
}
