// ** Next Imports
import '../styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { Router } from 'next/router'
import { SessionProvider, signOut } from 'next-auth/react'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from '../src/configs/themeConfig'

// ** Component Imports
import UserLayout from '../src/layouts/UserLayout'
import ThemeComponent from '../src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from '../src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from '../src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import { wrapper, store } from '../src/store/store'

// ** Global css styles
import '../styles/globals.css'
import dayjs from 'dayjs'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps }
  } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
  if (process.env.NODE_ENV !== 'development') console.log = console.warn = console.error = () => {}

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - NBADigitalServiceCenter`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – ระบบจัดการหน้าร้าน ระบบจัดการสต๊อก ระบบซื้อขายสินค้า nbadigitalservice nba pos `}
        />
        <meta
          name='keywords'
          content={`${themeConfig.templateName} – ระบบจัดการหน้าร้าน ระบบจัดการสต๊อก ระบบซื้อขายสินค้า nbadigitalservice nba pos `}
        />
        <meta
          name='viewport'
          content={`${themeConfig.templateName} – ระบบจัดการหน้าร้าน ระบบจัดการสต๊อก ระบบซื้อขายสินค้า nbadigitalservice nba pos `}
        />
      </Head>
      <SessionProvider session={session}>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  {getLayout(
                    <Provider store={store}>
                      <Component {...pageProps} />
                    </Provider>
                  )}
                </ThemeComponent>
              )
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </SessionProvider>
    </CacheProvider>
  )
}

export default wrapper.withRedux(App)
