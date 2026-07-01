// KListCard — inset grouped list container. Mirrors .ds-list--inset (mobile.css §3)
// and k-ui.jsx <List inset>. A rounded, hairline-bordered card with a subtle lift
// that wraps a set of rows (typically KListRow) separated by hairline dividers.
// An optional uppercase header sits above the card (the .ds-list__header pattern).
import React, { Children, type ReactNode } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KListCardProps {
  header?: string;
  children: ReactNode;
  testID?: string;
  style?: ViewStyle;
}

export function KListCard({ header, children, testID, style }: KListCardProps) {
  const theme = useTheme();
  const items = Children.toArray(children);

  return (
    <View testID={testID} style={style}>
      {header ? (
        <KText
          variant="caption"
          weight="600"
          color={theme.colors.ink3}
          style={styles.header}
        >
          {header}
        </KText>
      ) : null}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.line,
            borderRadius: theme.radii.panel,
            ...theme.shadows.sm,
          },
        ]}
      >
        {items.map((child, i) => (
          <React.Fragment key={i}>
            {i > 0 ? (
              <View
                style={[
                  styles.divider,
                  {
                    backgroundColor: theme.colors.line2,
                    marginLeft: theme.layout.screenGutter,
                  },
                ]}
              />
            ) : null}
            {child}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    letterSpacing: 0.065,
    paddingHorizontal: 4,
    paddingBottom: 10,
  },
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  } as ViewStyle,
  divider: { height: 1 },
});
