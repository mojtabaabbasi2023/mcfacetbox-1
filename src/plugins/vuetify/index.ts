import { deepMerge } from '@antfu/utils'
import JalaaliAdapter from '@date-io/jalaali'
import jMoment from 'moment-jalaali'
import type { App } from 'vue'
import { useI18n } from 'vue-i18n'
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import defaults from './defaults'
import { icons } from './icons'
import { staticPrimaryColor, staticPrimaryDarkenColor, themes } from './theme'
import { themeConfig } from '@themeConfig'
import { getI18n } from '@/plugins/i18n/index'

// Styles
import { cookieRef } from '@/@layouts/stores/config'
import '@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/lib/styles/main.sass'
import 'vuetify/styles'

export default function (app: App) {
  const cookieThemeValues = {
    defaultTheme: resolveVuetifyTheme(themeConfig.app.theme),
    themes: {
      light: {
        colors: {
          'primary': cookieRef('lightThemePrimaryColor', staticPrimaryColor).value,
          'primary-darken-1': cookieRef('lightThemePrimaryDarkenColor', staticPrimaryDarkenColor).value,
        },
      },
      dark: {
        colors: {
          'primary': cookieRef('darkThemePrimaryColor', staticPrimaryColor).value,
          'primary-darken-1': cookieRef('darkThemePrimaryDarkenColor', staticPrimaryDarkenColor).value,
        },
      },
    },
  }

  jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true })

  const date = {
    adapter: JalaaliAdapter,
    formats: {
      normalDateWithWeekday: 'jD jMMMM',
      monthShort: 'jMMMM',

      // dayOfMonth: date => date.getDate(),
    },
  }

  const optionTheme = deepMerge({ themes }, cookieThemeValues)

  const vuetify = createVuetify({
    aliases: {
      IconBtn: VBtn,
    },
    date,
    defaults,
    icons,
    theme: optionTheme,
    locale: {
      adapter: createVueI18nAdapter({ i18n: getI18n(), useI18n }),
    },
  })

  app.use(vuetify)
}
