import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ScreensNameEnum from '../constants/ScreensNameEnum';
import RegistrationScreen from '../screens/RegistrationScreen/RegistrationScreen';
const RegistrationStack = createStackNavigator();
/*
 * Here we handle the navigation of screens in authenticated user case and also for unauthenticated user
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const RegistrationRoutes = ({isAuthenticated, initialRoutName}) => {
  return (
    <RegistrationStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={ScreensNameEnum.GET_STARTED}
    >
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
    </RegistrationStack.Navigator>
  );
};

export default RegistrationRoutes;

const routes = [
  {
    component: RegistrationScreen,
    screenName: ScreensNameEnum.REGISTRATION_SCREEN,
    options: {headerShown: false},
  },
];
