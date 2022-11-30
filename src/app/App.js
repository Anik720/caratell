import '@fake-db';
import BrowserRouter from '@fuse/core/BrowserRouter';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import { SnackbarProvider } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectCurrLangDir } from 'app/store/i18nSlice';
import withAppProviders from './withAppProviders';
import { Auth } from './auth';
import settingsConfig from './fuse-configs/settingsConfig';
import Redirector from './components/Utils/Redirector';
import { setuser } from './store/appstore/authSlice';
import { useEffect } from 'react';

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
  rtl: {
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById('emotion-insertion-point'),
  },
  ltr: {
    key: 'muiltr',
    stylisPlugins: [],
    insertionPoint: document.getElementById('emotion-insertion-point'),
  },
};

const App = () => {
  const user = useSelector(({ appstore }) => appstore.auth.appUser);
  const langDirection = useSelector(selectCurrLangDir);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (Object.keys(user).length === 1 && localStorage.getItem('caratell-isLoggedIn') && localStorage.getItem('caratell-token')) {
  //     dispatch(setuser());
  //   }
  // }, []);

  return (
    <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
      <Auth>
        <BrowserRouter>
          <FuseAuthorization
            // userRole={user.roles}
            // loginRedirectUrl={settingsConfig.loginRedirectUrl}
            // dispatch={dispatch}
          >
            <FuseTheme>
              <SnackbarProvider
                maxSnack={5}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                classes={{
                  containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
                }}
              >
                <FuseLayout />
              </SnackbarProvider>
            </FuseTheme>
          </FuseAuthorization>
          {/* <Redirector /> */}
        </BrowserRouter>
      </Auth>
    </CacheProvider>
  );
};

export default withAppProviders(App)();
