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

const {
  WELCOME_SCREEN_HEADER,
  STACK_BTN,
  BOTTOM_TABS_BTN,
  BOTTOM_TABS,
  SIDE_MENU_BTN,
  SPLIT_VIEW_BUTTON,
} = testIDs;

export default class LayoutsScreen extends NavigationComponent {
  // static options(): Options {
  //   return {
  //     topBar: {
  //       testID: WELCOME_SCREEN_HEADER,
  //       title: {
  //         text: 'React Native Navigation',
  //       },
  //     },
  //     layout: {
  //       orientation: ['portrait', 'landscape'],
  //     },
  //   };
  // }

  render() {
    return (
      <Root componentId={this.props.componentId}>
        <Button label="Show Overlay" testID={STACK_BTN} onPress={this.showOverlay} />
      </Root>
    );
  }

  showOverlay = () => Navigation.showOverlay(
   {
     component: {
       name: Screens.Overlay,
       options: {
         overlay: {
           interceptTouchOutside: false,
         },
         layout: {
           backgroundColor: 'transparent',
           componentBackgroundColor: 'transparent',
         },
       }
     }
    }
  );

  bottomTabs = () =>
    Navigation.showModal({
      bottomTabs: {
        children: [
          stack(Screens.FirstBottomTabsScreen),
          stack(
            {
              component: {
                name: Screens.SecondBottomTabsScreen,
              },
            },
            'SecondTab'
          ),
        ],
        options: {
          bottomTabs: {
            testID: BOTTOM_TABS,
          },
        },
      },
    });

  sideMenu = () =>
    Navigation.showModal({
      sideMenu: {
        left: {
          component: {
            id: 'left',
            name: Screens.SideMenuLeft,
          },
        },
        center: stack({
          component: {
            id: 'SideMenuCenter',
            name: Screens.SideMenuCenter,
          },
        }),
        right: {
          component: {
            id: 'right',
            name: Screens.SideMenuRight,
          },
        },
        options: {
          layout: {
            orientation: ['portrait', 'landscape'],
          },
          modalPresentationStyle: OptionsModalPresentationStyle.pageSheet,
        },
      },
    });

  splitView = () => {
    Navigation.setRoot({
      root: {
        splitView: {
          id: 'SPLITVIEW_ID',
          master: {
            stack: {
              id: 'MASTER_ID',
              children: [
                {
                  component: {
                    name: Screens.CocktailsListMasterScreen,
                  },
                },
              ],
            },
          },
          detail: {
            stack: {
              id: 'DETAILS_ID',
              children: [
                {
                  component: {
                    id: 'DETAILS_COMPONENT_ID',
                    name: Screens.CocktailDetailsScreen,
                  },
                },
              ],
            },
          },
          options: {
            layout: {
              orientation: ['landscape'],
            },
            splitView: {
              displayMode: 'visible',
            },
          },
        },
      },
    });
  };

  onClickSearchBar = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.playground.SearchControllerScreen',
      },
    });
  };
}
