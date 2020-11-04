import React from 'react';
import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { NavigationComponentProps } from 'react-native-navigation';
import Root from '../components/Root';
import Button from '../components/Button';
import { component } from '../commons/Layouts';
import Navigation from '../services/Navigation';
import Screens from './Screens';
import testIDs from '../testIDs';

const {
  SHOW_OVERLAY_BTN,
  SHOW_TOUCH_THROUGH_OVERLAY_BTN,
  ALERT_BUTTON,
  SET_ROOT_BTN,
  TOAST_BTN,
} = testIDs;

export default class OverlayScreen extends React.Component<NavigationComponentProps> {
  // static options() {
  //   return {
  //     topBar: {
  //       title: {
  //         text: 'Overlay',
  //       },
  //     },
  //   };
  // }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text style={{textAlign:"center", marginBottom: 20}}>Now try touching the topbar title !</Text>
          <TouchableOpacity onPress={()=>Navigation.dismissOverlay(this.props.componentId)}>
            <Text style={{textAlign:"center"}}>Close me</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  toast = () => Navigation.showOverlay(Screens.Toast);

  showOverlay = (interceptTouchOutside: boolean) =>
    Navigation.showOverlay(Screens.OverlayAlert, {
      layout: { componentBackgroundColor: 'transparent' },
      overlay: { interceptTouchOutside },
    });

  setRoot = () => Navigation.setRoot({ root: component(Screens.Pushed) });

  showOverlayWithScrollView = () =>
    Navigation.showOverlay(Screens.ScrollViewOverlay, {
      layout: { componentBackgroundColor: 'transparent' },
    });
}
