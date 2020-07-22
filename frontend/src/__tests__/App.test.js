import React from 'react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { waitFor, render } from '@testing-library/react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { App } from '../App'

i18n.load('en', { en: {} })
i18n.activate('en')

describe('<App/>', () => {
  it('renders a welcome page', async () => {
    const { getByText } = render(
      <I18nProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <App />
        </MemoryRouter>
      </I18nProvider>,
    )
    await waitFor(() =>
      expect(getByText(/Welcome to Propertygraph/)).toBeInTheDocument(),
    )
  })
})
