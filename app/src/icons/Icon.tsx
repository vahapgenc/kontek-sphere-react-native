// KIcon — stroke icon set. Ported from design/SPHERE - Full Prototype/k-ui.jsx (the Icon `paths` map).
// Stroke-based: fill none, round caps/joins, default strokeWidth 1.7, 24×24 viewBox.
import React from 'react';
import { Svg, Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../theme';

export type IconName =
  | 'home'
  | 'payslip'
  | 'plus'
  | 'minus'
  | 'calendar'
  | 'receipt'
  | 'user'
  | 'bell'
  | 'chevR'
  | 'chevL'
  | 'chevD'
  | 'close'
  | 'check'
  | 'checkCirc'
  | 'info'
  | 'warn'
  | 'clock'
  | 'upload'
  | 'camera'
  | 'doc'
  | 'arrowDown'
  | 'sun'
  | 'heart'
  | 'child'
  | 'plane'
  | 'wallet'
  | 'phone'
  | 'help'
  | 'edit'
  | 'trash'
  | 'arrowR'
  | 'external'
  | 'building'
  | 'logOut'
  | 'approvals'
  | 'swap'
  | 'globe';

export interface KIconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function KIcon({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.7,
}: KIconProps) {
  const theme = useTheme();
  const stroke = color === 'currentColor' ? theme.colors.ink : color;

  // Shared stroke props for every primitive.
  const p = {
    fill: 'none' as const,
    stroke,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {renderPaths(name, p)}
    </Svg>
  );
}

type StrokeProps = {
  fill: 'none';
  stroke: string;
  strokeWidth: number;
  strokeLinecap: 'round';
  strokeLinejoin: 'round';
};

function renderPaths(name: IconName, p: StrokeProps): React.ReactNode {
  switch (name) {
    case 'home':
      return (
        <>
          <Path d="M3 10.5 12 3l9 7.5" {...p} />
          <Path d="M5 9.5V20h14V9.5" {...p} />
          <Path d="M9.5 20v-6h5v6" {...p} />
        </>
      );
    case 'payslip':
      return (
        <>
          <Rect x="5" y="3" width="14" height="18" rx="2.5" {...p} />
          <Path d="M8.5 8h7M8.5 12h7M8.5 16h4" {...p} />
        </>
      );
    case 'plus':
      return <Path d="M12 5v14M5 12h14" {...p} />;
    case 'minus':
      return <Path d="M5 12h14" {...p} />;
    case 'calendar':
      return (
        <>
          <Rect x="4" y="5" width="16" height="16" rx="2.5" {...p} />
          <Path d="M4 9.5h16M8 3v4M16 3v4" {...p} />
        </>
      );
    case 'receipt':
      return (
        <>
          <Path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.2V3z" {...p} />
          <Path d="M9 8h6M9 12h6" {...p} />
        </>
      );
    case 'user':
      return (
        <>
          <Circle cx="12" cy="8" r="3.5" {...p} />
          <Path d="M5.5 20a6.5 6.5 0 0 1 13 0" {...p} />
        </>
      );
    case 'bell':
      return (
        <>
          <Path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" {...p} />
          <Path d="M10 20a2 2 0 0 0 4 0" {...p} />
        </>
      );
    case 'chevR':
      return <Path d="M9 5l7 7-7 7" {...p} />;
    case 'chevL':
      return <Path d="M15 5l-7 7 7 7" {...p} />;
    case 'chevD':
      return <Path d="M5 9l7 7 7-7" {...p} />;
    case 'close':
      return <Path d="M6 6l12 12M18 6L6 18" {...p} />;
    case 'check':
      return <Path d="M5 12.5l4.5 4.5L19 6.5" {...p} />;
    case 'checkCirc':
      return (
        <>
          <Circle cx="12" cy="12" r="9" {...p} />
          <Path d="M8.5 12.2l2.4 2.4 4.6-5" {...p} />
        </>
      );
    case 'info':
      return (
        <>
          <Circle cx="12" cy="12" r="9" {...p} />
          <Path d="M12 11v5M12 8h.01" {...p} />
        </>
      );
    case 'warn':
      return (
        <>
          <Path d="M12 4l9 16H3l9-16Z" {...p} />
          <Path d="M12 10v4M12 17h.01" {...p} />
        </>
      );
    case 'clock':
      return (
        <>
          <Circle cx="12" cy="12" r="9" {...p} />
          <Path d="M12 7.5V12l3 2" {...p} />
        </>
      );
    case 'upload':
      return (
        <>
          <Path d="M12 16V5m0 0L8 9m4-4 4 4" {...p} />
          <Path d="M5 18.5h14" {...p} />
        </>
      );
    case 'camera':
      return (
        <>
          <Path
            d="M4 8.5A2 2 0 0 1 6 6.5h2l1.2-2h5.6L16 6.5h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z"
            {...p}
          />
          <Circle cx="12" cy="13" r="3.2" {...p} />
        </>
      );
    case 'doc':
      return (
        <>
          <Path
            d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
            {...p}
          />
          <Path d="M14 3v4h4" {...p} />
        </>
      );
    case 'arrowDown':
      return <Path d="M12 5v14M6 13l6 6 6-6" {...p} />;
    case 'sun':
      return (
        <>
          <Circle cx="12" cy="12" r="4" {...p} />
          <Path
            d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"
            {...p}
          />
        </>
      );
    case 'heart':
      return (
        <Path
          d="M12 20s-7-4.5-9.2-9C1.3 8 2.8 5 6 5c2 0 3.2 1.3 4 2.5C10.8 6.3 12 5 14 5c3.2 0 4.7 3 3.2 6-2.2 4.5-5.2 9-5.2 9Z"
          {...p}
        />
      );
    case 'child':
      return (
        <>
          <Circle cx="12" cy="6" r="2.5" {...p} />
          <Path d="M12 8.5V15M8 11l4-1 4 1M9.5 20l2.5-5 2.5 5" {...p} />
        </>
      );
    case 'plane':
      return (
        <Path
          d="M21 15l-7-2V6.5a1.5 1.5 0 0 0-3 0V13l-7 2v2l7-1.5V19l-2 1.2V22l3.5-1 3.5 1v-1.8L14 19v-3.5L21 17z"
          {...p}
        />
      );
    case 'wallet':
      return (
        <>
          <Rect x="3" y="6" width="18" height="13" rx="2.5" {...p} />
          <Path d="M3 10h18M16.5 14.5h.01" {...p} />
        </>
      );
    case 'phone':
      return (
        <>
          <Rect x="6.5" y="2.5" width="11" height="19" rx="2.5" {...p} />
          <Path d="M10.5 18.5h3" {...p} />
        </>
      );
    case 'help':
      return (
        <>
          <Circle cx="12" cy="12" r="9" {...p} />
          <Path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3M12 16.5h.01" {...p} />
        </>
      );
    case 'edit':
      return (
        <>
          <Path d="M4 20h4L18.5 9.5a2 2 0 0 0-3-3L5 17v3z" {...p} />
          <Path d="M14 7l3 3" {...p} />
        </>
      );
    case 'trash':
      return (
        <Path
          d="M4 7h16M9 7V4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V7M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13M10 11v6M14 11v6"
          {...p}
        />
      );
    case 'arrowR':
      return <Path d="M5 12h14M13 6l6 6-6 6" {...p} />;
    case 'external':
      return (
        <>
          <Path d="M14 4h6v6" {...p} />
          <Path d="M20 4l-8.5 8.5" {...p} />
          <Path
            d="M19 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5.5"
            {...p}
          />
        </>
      );
    case 'building':
      return (
        <>
          <Rect x="4" y="2" width="16" height="20" rx="2" {...p} />
          <Path
            d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"
            {...p}
          />
        </>
      );
    case 'logOut':
      return (
        <>
          <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" {...p} />
          <Path d="M16 17l5-5-5-5M21 12H9" {...p} />
        </>
      );
    case 'approvals':
      return (
        <>
          <Rect x="5" y="4" width="14" height="17" rx="2.5" {...p} />
          <Path d="M9 4.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4.5V6H9V4.5Z" {...p} />
          <Path d="M8.8 13l2.1 2.1L15.2 11" {...p} />
        </>
      );
    case 'swap':
      return (
        <>
          <Path d="M7 8h11M7 8l3-3M7 8l3 3" {...p} />
          <Path d="M17 16H6M17 16l-3-3M17 16l-3 3" {...p} />
        </>
      );
    case 'globe':
      return (
        <>
          <Circle cx="12" cy="12" r="9" {...p} />
          <Path
            d="M3 12h18M12 3c2.5 2.4 3.8 5.6 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3Z"
            {...p}
          />
        </>
      );
    default:
      return null;
  }
}
