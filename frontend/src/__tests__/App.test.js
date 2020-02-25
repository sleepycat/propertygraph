import React from 'react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { render, cleanup } from '@testing-library/react'
import ReactDOM from 'react-dom'
import { App } from '../App'

i18n.load('en', { en: {} })
i18n.activate('en')

describe('<App/>', () => {
  afterEach(cleanup)

  it('renders a welcome page', () => {
    const { getByRole } = render(
      <I18nProvider i18n={i18n}>
        <App />
      </I18nProvider>,
    )
    const element = getByRole('main')
    debugger
    expect(element.innerHTML).toEqual('Welcome to Propertygraph')
  })
})
