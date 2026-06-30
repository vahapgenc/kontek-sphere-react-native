import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'kontek_colors.dart';

/// Kontek Design System — Typography.
/// Family: Open Sans (via google_fonts). Mobile-first scale from
/// colors_and_type.css. Body sits at 16 so iOS never zoom-focuses a field.
class KontekType {
  KontekType._();

  // Type scale (px == logical px == Flutter fontSize)
  static const display = 36.0; // hero greeting / large figure
  static const h1      = 28.0; // screen large-title
  static const h2      = 22.0; // section header
  static const h3      = 19.0; // sub-section / strong card heading
  static const title   = 17.0; // card titles · list-row primary
  static const body    = 16.0; // default body & UI text
  static const bodySm  = 15.0; // secondary body, dense rows
  static const caption = 13.0; // captions, helper text, labels
  static const eyebrow = 12.0; // uppercase eyebrows
  static const micro   = 11.0; // badges, tab labels

  // Weights
  static const regular  = FontWeight.w400;
  static const medium   = FontWeight.w500;
  static const semibold = FontWeight.w600;
  static const bold     = FontWeight.w700;

  static TextStyle _base(double size, FontWeight w,
          {double height = 1.4, double spacing = 0, Color? color}) =>
      GoogleFonts.openSans(
        fontSize: size, fontWeight: w, height: height,
        letterSpacing: spacing, color: color ?? KontekColors.ink,
      );

  static TextStyle get displayStyle => _base(display, bold, height: 1.04, spacing: -0.72);
  static TextStyle get h1Style       => _base(h1, bold, height: 1.08, spacing: -0.56);
  static TextStyle get h2Style       => _base(h2, semibold, height: 1.14, spacing: -0.22);
  static TextStyle get h3Style       => _base(h3, semibold, height: 1.25, spacing: -0.19);
  static TextStyle get titleStyle    => _base(title, semibold, height: 1.3);
  static TextStyle get bodyStyle     => _base(body, regular, height: 1.55, color: KontekColors.ink2);
  static TextStyle get bodySmStyle   => _base(bodySm, regular, height: 1.5, color: KontekColors.ink2);
  static TextStyle get captionStyle  => _base(caption, regular, height: 1.45, color: KontekColors.ink3);
  static TextStyle get eyebrowStyle  => _base(eyebrow, semibold, height: 1, spacing: 0.96, color: KontekColors.ink4);

  /// Map onto Flutter's TextTheme so widgets inherit sensible defaults.
  static TextTheme get textTheme => TextTheme(
        displayLarge:  displayStyle,
        headlineLarge: h1Style,
        headlineMedium: h2Style,
        titleLarge:    h3Style,
        titleMedium:   titleStyle,
        bodyLarge:     bodyStyle,
        bodyMedium:    bodySmStyle,
        bodySmall:     captionStyle,
        labelSmall:    eyebrowStyle,
      );
}
