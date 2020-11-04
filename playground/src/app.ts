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
  addOptionsProcessors();
  setDefaultOptions();
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.dismissAllModals();
    setRoot();
  });
}

function setRoot() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Layouts',
              options: {
                topBar: {
                  title: {
                    component: {
                      name: Screens.ReactTitleView,
                      alignment: 'center',
                      passProps: {
                        text: 'Press Me',
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      }
    },
  });
}

export { start };
