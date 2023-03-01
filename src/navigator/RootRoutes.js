/* eslint-disable react-hooks/exhaustive-deps */
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {Text, View, Image, StyleSheet, ActivityIndicator} from 'react-native';
import RegistrationRoutes from './RegistrationRoutes';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContextProvider} from '../store/contexts/AuthContext';
import sInfoUtil from '../utils/sInfo.util';
import {getUserById} from '../store/actions/userActions';
import logoImg from '../resources/images/logo.png';
/*
 * This function  handles startup app functionality and here we are setting user in our local storage
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const RootRoutes = () => {
  const [hasNoInternet, setHasNoInternet] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const userNew = useSelector(state => state?.user?.user);
  const [apiCall, setApicall] = useState(true);
  const dispatch = useDispatch();

  const rootAuthContext = useMemo(
    () => ({
      signIn: async () => {
        setLoggedInUser(true);
      },
      // TODO: Do we need to clear the redux state on signOut
      signOut: async () => {
        await sInfoUtil.remove('USER_CONTEXT');
        await sInfoUtil.remove('JWT');
        setLoggedInUser(null);
      },
    }),
    [],
  );

  useEffect(() => {
    const netInfoSubscriber = NetInfo.addEventListener(state => {
      setHasNoInternet(!state.isConnected);
      if (state.isConnected) {
        if (!userNew && apiCall) {
          bootstrapApp();
        }
        netInfoSubscriber ? netInfoSubscriber() : void 0;
      }
    });
    return () => (netInfoSubscriber ? netInfoSubscriber() : void 0);
  }, [loggedInUser]);

  const bootstrapApp = async () => {
    try {
      const storedUser = await sInfoUtil.fetch('USER_CONTEXT');
      if (storedUser) {
        setApicall(false);
        const _user = JSON.parse(storedUser);

        if (_user) {
          const updatedUser = await dispatch(getUserById());
          await sInfoUtil.save(
            'USER_CONTEXT',
            JSON.stringify(updatedUser.payload),
          );
          setLoggedInUser(true);
          setInitializing(false);
        } else {
          setLoggedInUser(false);
          setInitializing(false);
        }
        setApicall(true);
      } else {
        setInitializing(false);
      }
    } catch (error) {
      console.error('err', error); // TODO: How to handle failure here
    }
  };
  if (initializing) {
    return (
      <ScreenWrapper header={false}>
        <View style={styles.container}>
          <Image
            source={logoImg}
            style={styles.imageStyle}
            resizeMode={'contain'}
          />

          {hasNoInternet ? (
            <Text style={styles.alightCenter}>Internet connection error</Text>
          ) : (
            <ActivityIndicator size="large" color="black" />
          )}
        </View>
      </ScreenWrapper>
    );
  }
  return (
    <AuthContextProvider value={rootAuthContext}>
      <NavigationContainer>
        <RegistrationRoutes
          isAuthenticated={loggedInUser}
          initialRoutName={false}
        />
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default RootRoutes;
const styles = StyleSheet.create({
  imageStyle: {
    width: '80%',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  alightCenter: {alignSelf: 'center'},
});
