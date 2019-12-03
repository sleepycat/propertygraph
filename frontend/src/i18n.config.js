import { i18n } from '@lingui/core'

export const locales = {
  en: 'English',
  fr: 'Français',
}

export async function activate(locale) {
  let catalog
  if (process.env.NODE_ENV === 'production') {
    catalog = await import(
      /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
      `@lingui/loader!./locales/${locale}.js`
    )
  } else {
    // for production or test use js:
    catalog = await import(
      /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
      `./locales/${locale}.json`
    )
  }

  i18n.load(locale, catalog)
  i18n.activate(locale)
}

activate('en')
