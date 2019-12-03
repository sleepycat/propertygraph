/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useLingui } from '@lingui/react'
import { LocaleSwitcher } from './LocaleSwitcher'
import logo from './images/logo.svg'

export const Header = () => {
  const { i18n } = useLingui()
  return (
    <header
      css={css`
        @media screen and (min-width: 35.5em) & {
          padding-bottom: 30px;
          text-align: right;
        }
        padding: 2rem 0;
      `}
    >
      <div>
        <div
          css={css`
            justify-content: space-between;
            flex-direction: row;
            display: flex;
            align-items: stretch;
          `}
        >
          <div
            css={css`
              @media screen and (min-width: 35.5em) & {
                width: 360px;
                margin-bottom: 0px;
              }
            `}
          >
            <img
              css={css`
              `}
              src={logo}
              alt="propertygraph logo"
            />
            <h3
              css={css`
								margin: 0;
								position: relative;
								top: 0;
                display: inline-block;
              `}
            >
              Propertygraph
            </h3>
          </div>
          <div>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
