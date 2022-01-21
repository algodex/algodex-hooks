import styled, { css } from 'styled-components'

export const Section = styled.section`
  height: 100%;
  width: 100%;
  grid-area: ${({ area }) => area};
  border-color: ${({ borderColor }) => borderColor};
  border: ${({ border }) => border};
  display: ${({ active }) => (active ? 'flex' : 'none')};
  ${({ mdAndUp }) =>
    mdAndUp &&
    css`
      @media (max-width: 1024px) {
        display: none;
      }
    `}
  ${({ lgOnly }) =>
    lgOnly &&
    css`
      @media (max-width: 1536px) {
        display: none;
      }
    `}
`

Section.defaultProps = {
  active: true,
  area: 'content',
  'border-color': 'inherit',
  border: 'inherit',
  mdAndUp: false,
  lgOnly: false
}
