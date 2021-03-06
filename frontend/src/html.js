import './images/favicon.ico'
import './images/apple-touch-icon.png'
import './images/favicon-32x32.png'
import './images/favicon-16x16.png'
import './images/android-chrome-192x192.png'
import './images/android-chrome-512x512.png'
import './manifest.json'
import './robots.txt'

export default () => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Condo board managment from the future."
      />
      <link rel="manifest" href="/manifest.json" />
      <title>Tracker</title>
    </head>
    <body>
      <div id="root"></div>
      <noscript>
        <h1>Application error</h1>
        <p>
          The JavaScript application you are accessing requires JavaScript to be
          enabled to run.
        </p>
      </noscript>
    </body>
  </html>
`
