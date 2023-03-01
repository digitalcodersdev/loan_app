import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';
import Header from '../commons/Header';
/*
 * This function is used to create Screen Wrapper
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const ScreenWrapper = ({
  children,
  header = true,
  backEnabled = false,
  title = '',
  backDisabled = false,
  backHandleRemove=()=>{}
}) => {
  useEffect(() => {
    if (backDisabled) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );
      return () => backHandleRemove();
    }
  }, [backDisabled]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ios: 'padding', android: null})}>
        {header && <Header backEnabled={backEnabled} title={title} />}
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScreenWrapper;
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    // overflow: 'visible',
    // zIndex: 9,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
});
