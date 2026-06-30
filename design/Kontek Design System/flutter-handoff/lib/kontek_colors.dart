import 'package:flutter/material.dart';

/// Kontek Design System — Color tokens.
/// Generated from colors_and_type.css (single source of truth).
/// Naming mirrors the CSS custom properties so handoff is 1:1.
class KontekColors {
  KontekColors._();

  // ---------- BRAND CORE ----------
  static const ground       = Color(0xFF122121); // Deepest Ground — pressed/active button
  static const signature    = Color(0xFF203B3C); // Brand Signature — primary CTA, active tab text
  static const guide        = Color(0xFF395F61); // The Guide — sub-menu, inactive tabs
  static const mutedSurface = Color(0xFFB8C9CA); // card borders, secondary text on dark
  static const green        = Color(0xFF61BC8F); // Interaction — toggle/checkbox fill
  static const statusBadge  = Color(0xFF9DDFB5); // status pill bg, nav resting text, secondary CTA fill
  static const kontekGreen  = Color(0xFF053F22); // Nav bar + sidebar background ONLY
  static const red          = Color(0xFFE1462E); // destructive CTA only

  // ---------- BRAND SUPPORT ----------
  static const signatureHi  = Color(0xFF2A4B4C);
  static const guideHi      = Color(0xFF5C8082);
  static const greenDeep    = Color(0xFF053F22); // Success Text (Paid / Balanced) — Kontek Green
  static const greenSoft    = Color(0xFFE6F7ED); // Celebration row highlight
  static const greenLine    = Color(0xFFBFE3CF);

  // ---------- ACTION (buttons) ----------
  static const action            = Color(0xFF203B3C); // primary fill (rest)
  static const actionHi          = Color(0xFF122121); // primary hover
  static const actionPress       = Color(0xFF122121); // primary pressed
  static const actionDisabled    = Color(0xFFE6EAEE);
  static const actionDisabledInk = Color(0xFFA3B4B6);
  static const action2           = Color(0xFF9DDFB5); // secondary CTA fill (mint)
  static const action2Hi         = Color(0xFF84D5A4); // secondary CTA hover
  // secondary CTA pressed = green (#61BC8F)

  // ---------- NEUTRALS ----------
  static const canvas    = Color(0xFFECEFF3); // Cloud — default page bg
  static const surface   = Color(0xFFFFFFFF); // forms, modals, cards
  static const surface2  = Color(0xFFE6EAEE); // inset / secondary surface
  static const ink       = Color(0xFF0F1112); // body text, payroll numbers
  static const ink2      = Color(0xFF445C5E); // table headers, subtitles
  static const ink3      = Color(0xFF475669); // breadcrumbs, inactive icons
  static const ink4      = Color(0xFF66777A); // borders, disabled labels
  static const onDark    = Color(0xFFFFFFFF);
  static const onDark2   = Color(0xFFB8C9CA);
  static const onDark3   = Color(0xFF7E9A93);

  // ---------- HAIRLINES ----------
  static const line       = Color(0xFFDDE5E6);
  static const line2      = Color(0xFFE8EDEE);
  static const silverMist = Color(0xFFA3B4B6);
  static final lineOnDark = Colors.white.withOpacity(0.12);

  // ---------- SEMANTIC STATUS ----------
  static const ok          = Color(0xFF053F22);
  static const okSoft      = Color(0xFFE6F7ED);
  static const okAccent    = Color(0xFF61BC8F);
  static const warn        = Color(0xFF7A4A0E);
  static const warnSoft    = Color(0xFFFEF4E7);
  static const danger      = Color(0xFF9C3232);
  static const dangerSoft  = Color(0xFFFDEEED);
  static const info        = Color(0xFF1A5298);
  static const infoSoft    = Color(0xFFEBF2FB);

  // ---------- APP SHELL ----------
  static const shellBg     = Color(0xFF053F22); // Kontek Green — sidebar/top nav bg
  static const shellBg2    = Color(0xFF0A5530);
  static const shellActive = Color(0xFF031F12);
  static const shellInk    = Color(0xFFFFFFFF); // active nav label/icon
  static const shellInk2   = Color(0xFF9DDFB5); // resting nav label
}
