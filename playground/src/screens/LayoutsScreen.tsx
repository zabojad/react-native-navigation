import React from 'react';
import {
  Options,
  OptionsModalPresentationStyle,
  NavigationComponent,
} from 'react-native-navigation';

import Root from '../components/Root';
import Button from '../components/Button';
import testIDs from '../testIDs';
import Screens from './Screens';
import Navigation from '../services/Navigation';
import { stack } from '../commons/Layouts';
// import Alert from './Alert';
import { Alert } from 'react-native';

const {
  WELCOME_SCREEN_HEADER,
  STACK_BTN,
  BOTTOM_TABS_BTN,
  BOTTOM_TABS,
  SIDE_MENU_BTN,
  SPLIT_VIEW_BUTTON,
} = testIDs;

export default class LayoutsScreen extends NavigationComponent {
  static options(): Options {
    return {
      topBar: {
        testID: WELCOME_SCREEN_HEADER,
        title: {
          text: 'React Native Navigation',
        },
      },
      layout: {
        orientation: ['portrait', 'landscape'],
      },
    };
  }

  render() {
    return (
      <Root componentId={this.props.componentId}>
        <Button label="dismissAllModals" onPress={this.dismissAllModals} />
        <Button label="showModal" onPress={this.showModal} />
      </Root>
    );
  }

  dismissAllModals = () => Navigation.dismissAllModals().then((_)=>Alert.alert('info','dismissAllModals resolved'));

  showModal = () => Navigation.showModal({
    component: {
      name: Screens.Alert,
      passProps: {
        title: 'This is a modal',
        message: 'click the button below to dismiss all modals',
      },
      options: {
        modalPresentationStyle: OptionsModalPresentationStyle.overFullScreen
      }
    }
  });

  

}
