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
  console.log('calling setRoot...');
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'left',
            name: 'SideMenuLeft',
          }
        },
        center: {
          stack: {
            children: [{
              component: {
                name: Screens.SideMenuCenter,
              },  
            }],
          }
        },
      },
    },
  }).then(()=>{
    console.log("overlay shown");
    return Navigation.showOverlay({
      component: {
        name: Screens.Alert,
        passProps: {
          title:'test issue 6656',
          message:'test issue 6656...',
        },
      }
    })
  })
  .then(()=>{
    console.log("overlay shown");
    Navigation.mergeOptions('left', { sideMenu: {left: { visible: true } } });
  })
  ;
}

export { start };
