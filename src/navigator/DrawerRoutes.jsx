import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ScreensNameEnum from '../constants/ScreensNameEnum';
import DrawerWrapper from 'library/wrapper/DrawerWrapper';

import {screenOptions} from './screenOptions';
import HomeScreen from '../screens/job/home/HomeScreen';
// import EmailScreen from '../screens/registration/verifyEmailScreen/VerifyEmailScreen'
import MyJobScreen from '../screens/profiles/allJobsScreen/AllJobsScreen';
import ChatScreen from '../screens/chats/chats/Chats';
import HelpScreen from '../screens/profiles/helpScreen/HelpScreen';
import Settings from '../screens/settings/settingsScreen/SettingsScreen';
import PaymentScreen from '../screens/settings/settingsScreen/PaymentScreen';
import WorkWithUs from '../screens/profiles/workWithUs/WorkWithUs';
import AppFeedback from '../screens/profiles/appFeedback/AppFeedback';
import UserProfileScreen from '../screens/profiles/userProfileScreen/UserProfileScreen';
import SelectACardScreen from '../screens/payment/selectACardScreen/SelectACardScreen';
const Drawer = createDrawerNavigator();

/*
 * This function is used to define drawer routes
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Feed"
      headerShown={false}
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
      }}
      drawerContent={props => <DrawerWrapper {...props} />}>
      <Drawer.Screen
        name="Home"
        component={AppFlow}
        options={{drawerLabel: 'Home'}}
      />
    </Drawer.Navigator>
  );
}

export default DrawerRoutes;

const Stack = createStackNavigator();
function AppFlow() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {routes.map((item, index) => {
        return (
          <Stack.Screen
            key={`${index}_${item.screenName}`}
            component={item.component}
            name={item.screenName}
          />
        );
      })}
    </Stack.Navigator>
  );
}
const routes = [
  {
    component: HomeScreen,
    screenName: ScreensNameEnum.HOME_SCREEN,
  },
  {component: ChatScreen, screenName: ScreensNameEnum.CHAT_SCREEN},
  {component: MyJobScreen, screenName: ScreensNameEnum.ALL_JOBS_SCREEN},
  {component: HelpScreen, screenName: ScreensNameEnum.HELP_SCREEN},
  {component: Settings, screenName: ScreensNameEnum.SETTINGS_SCREEN},
  {component: PaymentScreen, screenName: ScreensNameEnum.PAYMENT_SCREEN},
  {component: WorkWithUs, screenName: ScreensNameEnum.WORK_WITH_US},
  {component: AppFeedback, screenName: ScreensNameEnum.APP_FEEDBACK},
  {component: UserProfileScreen, screenName: ScreensNameEnum.USER_PROFILE},
  {component: SelectACardScreen, screenName: ScreensNameEnum.SELECT_A_CARD_SCREEN},
];
