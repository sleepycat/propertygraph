/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Trans, t } from '@lingui/macro'
import { Header } from './Header'
import { Footer } from './Footer'

export const App = () => (
  <div>
    <section
      css={css`
        font-family: sans;
        max-width: 960px;
        padding-left: 20px;
        padding-right: 20px;
        margin: 0px auto;
      `}
    >
      <Header />
      <main
        css={css`
          max-width: 960px;
          margin: 0 auto;
          padding-left: 20px;
          padding-right: 20px;
          padding: 0 20px;
          padding-bottom: calc(80px + 60px);
        `}
      >
        <Trans>Welcome to Propertygraph</Trans>
      </main>
    </section>
    <Footer />
  </div>
)
