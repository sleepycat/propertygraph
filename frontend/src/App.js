/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Link, Switch, Route } from 'react-router-dom'
import { Trans, t } from '@lingui/macro'
import { Header } from './Header'
import { Footer } from './Footer'

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function Users() {
  return <h2>Users</h2>
}

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
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
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
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </section>
    <Footer />
  </div>
)
