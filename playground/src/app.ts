import Navigation from './services/Navigation';
import { registerScreens } from './screens';
import addOptionsProcessors from './commons/OptionProcessors';
import { setDefaultOptions } from './commons/Options';
import testIDs from './testIDs';
import Screens from './screens/Screens';

// @ts-ignore
alert = (title, message) =>
  Navigation.showOverlay({
    component: {
      name: Screens.Alert,
      passProps: {
        title,
        message,
      },
    },
  });

function start() {
  registerScreens();
  // addOptionsProcessors();
  // setDefaultOptions();
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.dismissAllModals();
    setRoot();
  });
}

function setRoot() {
  console.log('calling setRoot...');
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'Layouts',
            // name: Screens.SideMenuCenter,
            options: {
              topBar: {
                
                background: {
                  component: {
                    name: Screens.ReactTitleView,
                    // alignment: 'fill',
                    passProps: {
                      text: 'CLICK ME (issue 6652)',
                      clickable: false,
                    },
                  },
                },
              }
            }
          },  
        }],
      }
    },
  })
  ;
}

export { start };
