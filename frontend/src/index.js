import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { hot } from 'react-hot-loader/root'
import React from 'react'
import { render } from 'react-dom'
import { App } from './App'

render(
  <I18nProvider i18n={i18n}>
    <App />
  </I18nProvider>,
  document.getElementById('root'),
)

hot(<App />)
