import { connect } from 'react-redux';
import { ActivityIndicator, TouchableOpacity, Keyboard, StyleSheet, Animated } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Kohana } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Screen from '../../containers/Screen';
import { COLOR_TEXT_INPUT, DARK_BLUE, DIVIDER_COLOR, BLUE } from '../../../constants/ThingerColors';
import { BORDER_RADIUS, MARGIN, PADDING } from '../../../constants/ThingerStyles';
import H2Text from '../../texts/H2';
import { AuthActions } from '../../../store/auth';
import { THINGER_SERVER } from '../../../constants/ThingerConstants';
import logo from '../../../assets/logo.png';
import { AppState } from '../../../store/types';

type Props = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: AppState) => ({
  isFetching: state.auth.isFetching,
});

const mapDispatchToProps = {
  login: AuthActions.login,
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    margin: MARGIN * 1.5,
    marginTop: 8,
    height: 55,
    backgroundColor: BLUE,
    padding: PADDING,
    borderRadius: BORDER_RADIUS,
  },
});

const LoginScreen = ({ login, isFetching }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [server, setServer] = useState(THINGER_SERVER);

  const isFilled = useMemo(() => {
    return !!username && !!password && !!server;
  }, [username, password, server]);

  return (
    <Screen>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={44}
        style={{
          flex: 1,
        }}
      >
        <Animated.Image
          source={logo}
          style={{
            marginVertical: MARGIN * 3,
            height: 72,
            alignSelf: 'center',
            aspectRatio: 3.5 / 1,
          }}
        />
        <Kohana
          style={{
            backgroundColor: DIVIDER_COLOR,
            flex: 0,
            marginHorizontal: MARGIN * 1.5,
            borderRadius: BORDER_RADIUS,
          }}
          label="Username"
          iconClass={Icon}
          iconName="person"
          iconColor={DARK_BLUE}
          labelStyle={{ color: COLOR_TEXT_INPUT, fontWeight: '100' }}
          inputStyle={{ color: DARK_BLUE }}
          autoCapitalize="none"
          useNativeDriver
          onChangeText={setUsername}
        />
        <Kohana
          style={{
            backgroundColor: DIVIDER_COLOR,
            flex: 0,
            marginHorizontal: MARGIN * 1.5,
            marginVertical: 8,
            borderRadius: BORDER_RADIUS,
          }}
          label="Password"
          iconClass={Icon}
          iconName="lock"
          iconColor={DARK_BLUE}
          labelStyle={{ color: COLOR_TEXT_INPUT, fontWeight: '100' }}
          inputStyle={{ color: DARK_BLUE }}
          secureTextEntry
          useNativeDriver
          onChangeText={setPassword}
        />
        <Kohana
          style={{
            backgroundColor: DIVIDER_COLOR,
            flex: 0,
            marginHorizontal: MARGIN * 1.5,
            borderRadius: BORDER_RADIUS,
          }}
          label="Server"
          iconClass={Icon}
          iconName="http"
          iconColor={DARK_BLUE}
          labelStyle={{ color: COLOR_TEXT_INPUT, fontWeight: '100' }}
          inputStyle={{ color: DARK_BLUE }}
          autoCapitalize="none"
          useNativeDriver
          defaultValue={THINGER_SERVER}
          onChangeText={setServer}
        />
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            login({ username, password, server });
          }}
          disabled={!isFilled}
          activeOpacity={isFilled ? 1 : 0.2}
          style={
            isFilled
              ? styles.button
              : {
                  ...styles.button,
                  opacity: 0.2,
                }
          }
        >
          {isFetching ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <H2Text style={{ color: '#fff' }}>Login</H2Text>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
