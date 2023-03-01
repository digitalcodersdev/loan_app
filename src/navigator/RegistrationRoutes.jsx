import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ScreensNameEnum from '../constants/ScreensNameEnum';
import LoginScreen from '../screens/registration/loginScreen/LogInScreen';
import SplashScreen from '../screens/registration/splashScreen/SplashScreen';
import OtpScreen from '../screens/registration/otpScreen/OtpScreen';
import DrawerRoutes from './DrawerRoutes';
const RegistrationStack = createStackNavigator();
import VerifyEmailScreen from '../screens/registration/verifyEmailScreen/VerifyEmailScreen';
import EmailOtpScreen from '../screens/registration/emailOtpScreen/EmailOtpScreen';
import {screenOptions} from './screenOptions';
import UpdateUserName from '../screens/registration/updateUserName/UpdateUserName';
import UpdateProfilePicture from '../screens/registration/updateProfilePicture/UpdateProfilePicture';
import DeleteAccountScreen from '../screens/settings/deleteAccountScreen/DeleteAccountScreen';
import UpdateMobile from '../screens/registration/loginScreen/LogInScreen';
import NotificationScreen from '../screens/notifications/NotificationScreen';
import Legal from '../screens/profiles/legalScreen/LegalScreen';
import AboutUs from '../screens/profiles/aboutUsScreen/AboutUsScreen';
import Message from '../screens/chats/messages/Messages';
import ViewTransactionJobHistoryScreen from '../screens/profiles/viewingJobTransactionHistory/ViewTransactionJobHistoryScreen';
import PaymentOverviewScreen from '../screens/payment/paymentOverview/PaymentOverviewScreen';
/*
 * Here we handle the navigation of screens in authenticated user case and also for unauthenticated user
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const RegistrationRoutes = ({isAuthenticated, initialRoutName}) => {
  return (
    <RegistrationStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={ScreensNameEnum.GET_STARTED}>
      <RegistrationStack.Screen
        component={SplashScreen}
        name={ScreensNameEnum.GET_STARTED}
        options={{headerShown: false}}
      />
      {!isAuthenticated ? (
        <>
          <RegistrationStack.Screen
            component={LoginScreen}
            name={ScreensNameEnum.LOGIN_SCREEN}
            options={{headerShown: false}}
          />
          <RegistrationStack.Screen
            component={OtpScreen}
            name={ScreensNameEnum.OTP_SCREEN}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          {routes.map((item, index) => {
            return (
              <RegistrationStack.Screen
                key={`${index}_${item.screenName}`}
                component={item.component}
                name={item.screenName}
                options={item.options}
              />
            );
          })}
        </>
      )}
    </RegistrationStack.Navigator>
  );
};

export default RegistrationRoutes;

const routes = [
  {
    component: VerifyEmailScreen,
    screenName: ScreensNameEnum.EMAIL_SCREEN,
    options: {headerShown: false},
  },
  {
    component: EmailOtpScreen,
    screenName: ScreensNameEnum.EMAIL_OTP_SCREEN,
    options: {headerShown: false},
  },
  {
    component: UpdateUserName,
    screenName: ScreensNameEnum.UPDATE_USER_NAME,
    options: {headerShown: false},
  },
  {
    component: UpdateProfilePicture,
    screenName: ScreensNameEnum.UPDATE_PROFILE_PICTURE,
    options: {headerShown: false},
  },
  {
    component: DrawerRoutes,
    screenName: 'DRAWER_ROUTES',
    options: {headerShown: false},
  },
  {
    component: DeleteAccountScreen,
    screenName: ScreensNameEnum.DELETE_ACCOUNT,
    options: {headerShown: false},
  },
  {
    component: UpdateMobile,
    screenName: ScreensNameEnum.UPDATE_MOBILE,
    options: {headerShown: false},
  },
  {
    component: OtpScreen,
    screenName: ScreensNameEnum.OTP_SCREEN,
    options: {headerShown: false},
  },
  {
    component: NotificationScreen,
    screenName: ScreensNameEnum.NOTIFICATION_SCREEN,
    options: {headerShown: false},
  },
  {
    component: Legal,
    screenName: ScreensNameEnum.LEGAL_SCREEN,
    options: {headerShown: false},
  },
  {
    component: AboutUs,
    screenName: ScreensNameEnum.ABOUT_US,
    options: {headerShown: false},
  },
  {
    component: Message,
    screenName: ScreensNameEnum.MESSAGE_SCREEN,
    options: {headerShown: false},
  },
  {
    component: ViewTransactionJobHistoryScreen,
    screenName: ScreensNameEnum.VIEW_TRANSACTION_JOB_HISTORY_SCREEN,
    options: {headerShown: false},
  },
  {
    component: PaymentOverviewScreen,
    screenName: ScreensNameEnum.PAYMENT_OVERVIEW,
    options: {headerShown: false},
  },
];
