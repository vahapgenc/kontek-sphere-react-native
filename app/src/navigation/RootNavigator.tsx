// Root navigation: auth gate → bottom tabs (custom KTabBar) with a native-stack per tab.
// Tab set switches with employee/manager mode (mirrors k-app.jsx).
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KTabBar, KIcon, KOverlayFab, type IconName } from '../components';
import { useTheme } from '../theme';
import { useSession } from '../store/session';
import { useTranslation } from 'react-i18next';
import { SCENARIOS, APPROVALS } from '../mocks';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CompleteScreen } from '../screens/home/CompleteScreen';
import { StatusScreen } from '../screens/home/StatusScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { CompaniesScreen } from '../screens/profile/CompaniesScreen';
import { BankAccountsScreen } from '../screens/profile/BankAccountsScreen';
import { EmploymentScreen } from '../screens/profile/EmploymentScreen';
import { PayslipsScreen } from '../screens/pay/PayslipsScreen';
import { PayslipDetailScreen } from '../screens/pay/PayslipDetailScreen';
import { PayCheckScreen } from '../screens/pay/PayCheckScreen';
import { UpcomingScreen } from '../screens/pay/UpcomingScreen';
import { BalanceDetailScreen } from '../screens/pay/BalanceDetailScreen';
import { AbsenceFlowScreen } from '../screens/register/AbsenceFlowScreen';
import { ExpenseFlowScreen } from '../screens/register/ExpenseFlowScreen';
import { RegisterHub } from '../screens/register/RegisterHub';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Top-level ref so a flow's "Go to home" can switch to the Home tab.
const navRef = createNavigationContainerRef();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Complete">
        {({ navigation, route }) => (
          <CompleteScreen
            id={(route.params as { id: string }).id}
            onBack={() => navigation.goBack()}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Status">
        {({ navigation, route }) => (
          <StatusScreen
            id={(route.params as { id: string }).id}
            onBack={() => navigation.goBack()}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function PayslipsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Payslips">
        {({ navigation }) => (
          <PayslipsScreen
            onOpenPayslip={(id) => navigation.navigate('PayslipDetail', { id })}
            onOpenUpcoming={() => navigation.navigate('Upcoming')}
            onOpenBalance={(id) => navigation.navigate('BalanceDetail', { id })}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="PayslipDetail">
        {({ navigation, route }) => (
          <PayslipDetailScreen
            id={(route.params as { id: string }).id}
            onBack={() => navigation.goBack()}
            onCheck={() => navigation.navigate('PayCheck')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="PayCheck">
        {({ navigation }) => <PayCheckScreen onBack={() => navigation.goBack()} />}
      </Stack.Screen>
      <Stack.Screen name="Upcoming">
        {({ navigation }) => <UpcomingScreen onBack={() => navigation.goBack()} />}
      </Stack.Screen>
      <Stack.Screen name="BalanceDetail">
        {({ navigation, route }) => (
          <BalanceDetailScreen id={(route.params as { id: string }).id} onBack={() => navigation.goBack()} />
        )}
      </Stack.Screen>
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

// Manager-only tabs.
function MeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Me">{() => <PlaceholderScreen title="Mitt" />}</Stack.Screen>
    </Stack.Navigator>
  );
}

function EmployeesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Employees">{() => <PlaceholderScreen title="Anställda" />}</Stack.Screen>
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile">
        {({ navigation }) => (
          <ProfileScreen
            onOpenCompanies={() => navigation.navigate('Companies')}
            onOpenBankAccounts={() => navigation.navigate('BankAccounts')}
            onOpenEmployment={() => navigation.navigate('Employment')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Companies">
        {({ navigation }) => <CompaniesScreen onBack={() => navigation.goBack()} />}
      </Stack.Screen>
      <Stack.Screen name="BankAccounts">
        {({ navigation }) => <BankAccountsScreen onBack={() => navigation.goBack()} />}
      </Stack.Screen>
      <Stack.Screen name="Employment">
        {({ navigation }) => <EmploymentScreen onBack={() => navigation.goBack()} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const TAB_ICON: Record<string, IconName> = {
  HomeTab: 'home',
  PayslipsTab: 'payslip',
  CalendarTab: 'calendar',
  ProfileTab: 'user',
  MeTab: 'payslip',
  EmployeesTab: 'approvals',
};

function AppTabBar(props: BottomTabBarProps) {
  const { state, navigation } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const scenario = useSession((s) => s.scenario);
  const openRegister = useSession((s) => s.openRegister);
  const closeRegister = useSession((s) => s.closeRegister);
  const registerOpen = useSession((s) => s.registerOpen);
  const closeFlow = useSession((s) => s.closeFlow);
  const todoCount = (SCENARIOS[scenario] ?? SCENARIOS['Standard']).todos.filter(
    (todo) => todo.status === 'action',
  ).length;
  const approvalCount = APPROVALS.absence.length + APPROVALS.expense.length;

  const labels: Record<string, string> = {
    HomeTab: t('tab.home'),
    PayslipsTab: t('tab.pay'),
    CalendarTab: t('tab.calendar'),
    ProfileTab: t('tab.profile'),
    MeTab: t('tab.me'),
    EmployeesTab: t('tab.employees'),
  };
  const badgeFor = (name: string): number | undefined => {
    if (name === 'HomeTab' && todoCount > 0) return todoCount;
    if (name === 'EmployeesTab' && approvalCount > 0) return approvalCount;
    return undefined;
  };
  const items = state.routes.map((r) => ({
    key: r.name,
    label: labels[r.name] ?? r.name,
    icon: <KIcon name={TAB_ICON[r.name] ?? 'home'} />,
    badge: badgeFor(r.name),
  }));
  const activeKey = state.routes[state.index].name;
  return (
    <KTabBar
      items={items}
      activeKey={activeKey}
      onSelect={(key) => {
        closeFlow();
        navigation.navigate(key as never);
      }}
      centerAction={{
        icon: <KIcon name={registerOpen ? 'close' : 'plus'} size={26} color={theme.colors.shellCtaInk} />,
        onPress: registerOpen ? closeRegister : openRegister,
        active: registerOpen,
        testID: 'tabbar_register_fab',
        accessibilityLabel: 'Registrera',
      }}
    />
  );
}

function MainTabs() {
  const isManager = useSession((s) => s.mode === 'manager');
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <AppTabBar {...props} />}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      {isManager ? (
        <Tab.Screen name="MeTab" component={MeStack} />
      ) : (
        <Tab.Screen name="PayslipsTab" component={PayslipsStack} />
      )}
      {isManager ? (
        <Tab.Screen name="EmployeesTab" component={EmployeesStack} />
      ) : (
        <Tab.Screen name="CalendarTab" component={CalendarStack} />
      )}
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}

// Hosts the tabs, the register hub sheet, and the register flows. The flows are
// rendered as an in-shell overlay that stops ABOVE the bottom tab bar (top:0 →
// bottom: tabBarHeight), so the menu stays visible during a flow — mirroring the
// prototype, where FlowShell renders in the content area with BottomNav below it.
function AuthedApp() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeFlow = useSession((s) => s.activeFlow);
  const openFlow = useSession((s) => s.openFlow);
  const closeFlow = useSession((s) => s.closeFlow);
  const openRegister = useSession((s) => s.openRegister);

  const tabBarHeight = theme.layout.tabbarH + insets.bottom;

  // "Go to home" from a flow's success screen: return to the Home tab, then close.
  const goHome = () => {
    navRef.navigate('HomeTab' as never);
    closeFlow();
  };

  return (
    <View style={styles.host}>
      <MainTabs />
      {/* Flow overlay stops above the tab bar so the menu stays visible; its own
          "+" FAB sits on top so the raised center button isn't clipped. */}
      {activeFlow ? (
        <View style={[StyleSheet.absoluteFill, { bottom: tabBarHeight }]}>
          {activeFlow === 'absence' ? (
            <AbsenceFlowScreen onClose={closeFlow} onDone={goHome} />
          ) : (
            <ExpenseFlowScreen onClose={closeFlow} onDone={goHome} />
          )}
          <KOverlayFab icon="plus" onPress={openRegister} testID="flow_register_fab" />
        </View>
      ) : null}
      {/* Hub is rendered last so it (and its ✕ FAB) layers above an open flow. */}
      <RegisterHub onSelect={openFlow} />
    </View>
  );
}

export function RootNavigator() {
  const authed = useSession((s) => s.authed);
  const theme = useTheme();
  return (
    <NavigationContainer
      ref={navRef}
      theme={{
        dark: false,
        colors: {
          primary: theme.colors.signature,
          // Pale mint scene background so screens without their own gradient sit on
          // the app-bg family (not flat gray). Home/Profile paint the full gradient.
          background: '#ECF6F1',
          card: theme.colors.surface,
          text: theme.colors.ink,
          border: theme.colors.line,
          notification: theme.colors.green,
        },
        fonts: DEFAULT_FONTS,
      }}
    >
      {authed ? <AuthedApp /> : <LoginScreen />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  host: { flex: 1 },
});

// React Navigation v7 requires a fonts config on the theme.
const DEFAULT_FONTS = {
  regular: { fontFamily: 'OpenSans_400Regular', fontWeight: '400' as const },
  medium: { fontFamily: 'OpenSans_500Medium', fontWeight: '500' as const },
  bold: { fontFamily: 'OpenSans_700Bold', fontWeight: '700' as const },
  heavy: { fontFamily: 'OpenSans_700Bold', fontWeight: '700' as const },
};
