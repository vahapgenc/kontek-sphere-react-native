// Root navigation: auth gate → bottom tabs (custom KTabBar) with a native-stack per tab.
// Tab set switches with employee/manager mode (mirrors k-app.jsx).
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KTabBar, KIcon, type IconName } from '../components';
import { useTheme } from '../theme';
import { useSession } from '../store/session';
import { useTranslation } from 'react-i18next';
import { SCENARIOS } from '../mocks';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { CompaniesScreen } from '../screens/profile/CompaniesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function PayslipsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Payslips">{() => <PlaceholderScreen title="Lön" />}</Stack.Screen>
    </Stack.Navigator>
  );
}

function CalendarStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calendar">{() => <PlaceholderScreen title="Kalender" />}</Stack.Screen>
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile">
        {({ navigation }) => <ProfileScreen onOpenCompanies={() => navigation.navigate('Companies')} />}
      </Stack.Screen>
      <Stack.Screen name="Companies">
        {({ navigation }) => <CompaniesScreen onBack={() => navigation.goBack()} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const TAB_ICON: Record<string, IconName> = {
  HomeTab: 'home',
  PayslipsTab: 'payslip',
  CalendarTab: 'calendar',
  ProfileTab: 'user',
};

function AppTabBar(props: BottomTabBarProps) {
  const { state, navigation } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const scenario = useSession((s) => s.scenario);
  const todoCount = (SCENARIOS[scenario] ?? SCENARIOS['Standard']).todos.filter(
    (todo) => todo.status === 'action',
  ).length;

  const labels: Record<string, string> = {
    HomeTab: t('tab.home'),
    PayslipsTab: t('tab.pay'),
    CalendarTab: t('tab.calendar'),
    ProfileTab: t('tab.profile'),
  };
  const items = state.routes.map((r) => ({
    key: r.name,
    label: labels[r.name] ?? r.name,
    icon: <KIcon name={TAB_ICON[r.name] ?? 'home'} />,
    badge: r.name === 'HomeTab' && todoCount > 0 ? todoCount : undefined,
  }));
  const activeKey = state.routes[state.index].name;
  return (
    <KTabBar
      items={items}
      activeKey={activeKey}
      onSelect={(key) => navigation.navigate(key as never)}
      centerAction={{
        icon: <KIcon name="plus" size={26} color={theme.colors.shellCtaInk} />,
        onPress: () => {},
        testID: 'tabbar_register_fab',
        accessibilityLabel: 'Registrera',
      }}
    />
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <AppTabBar {...props} />}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="PayslipsTab" component={PayslipsStack} />
      <Tab.Screen name="CalendarTab" component={CalendarStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const authed = useSession((s) => s.authed);
  const theme = useTheme();
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: theme.colors.signature,
          background: theme.colors.canvas,
          card: theme.colors.surface,
          text: theme.colors.ink,
          border: theme.colors.line,
          notification: theme.colors.green,
        },
        fonts: DEFAULT_FONTS,
      }}
    >
      {authed ? <MainTabs /> : <LoginScreen />}
    </NavigationContainer>
  );
}

// React Navigation v7 requires a fonts config on the theme.
const DEFAULT_FONTS = {
  regular: { fontFamily: 'OpenSans_400Regular', fontWeight: '400' as const },
  medium: { fontFamily: 'OpenSans_500Medium', fontWeight: '500' as const },
  bold: { fontFamily: 'OpenSans_700Bold', fontWeight: '700' as const },
  heavy: { fontFamily: 'OpenSans_700Bold', fontWeight: '700' as const },
};
