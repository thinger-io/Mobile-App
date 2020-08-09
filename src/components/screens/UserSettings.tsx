import { connect } from 'react-redux';
import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { MARGIN } from '../../constants/ThingerStyles';
import RoundedButton from '../buttons/RoundedButton';
import CenterView from '../containers/CenterView';
import Screen from '../containers/Screen';
import List from '../lists/List';
import OutputItem from '../lists/OutputItem';
import { LIGHT_RED } from '../../constants/ThingerColors';
import { AppState } from '../../store/types';
import { AuthActions } from '../../store/auth';
import { RootStackParamList } from '../navigation/RootStack';
import { StackNavigationProp } from '@react-navigation/stack';

type OwnProps = { navigation: StackNavigationProp<RootStackParamList, 'UserSettings'> };
type Props = OwnProps & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  logout: AuthActions.logout,
};

const UserSettings = ({ auth, logout, navigation }: Props) => {
  const handleLogout = useCallback(() => {
    logout();
    navigation.navigate('Home');
  }, [logout, navigation]);

  return (
    <Screen>
      {!!auth.username && (
        <ScrollView>
          <List>
            <OutputItem name="User" value={auth.username != null ? auth.username : ''} />
            <OutputItem name="Server" value={auth.server != null ? auth.server : ''} />
          </List>

          <CenterView style={{ margin: MARGIN }}>
            <RoundedButton color={LIGHT_RED} text="Log out" onPress={handleLogout} />
          </CenterView>
        </ScrollView>
      )}
    </Screen>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
