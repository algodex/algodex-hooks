import styled, { css } from 'styled-components'
import * as Icons from 'react-feather'
import { isNumber } from 'lodash'
import PropTypes from 'prop-types'

function getFill({ theme, color = 'gray', fillGradient = 500 }) {
  return theme.colors[color][fillGradient]
}

const style = css`
  cursor: pointer;
  pointer-events: all;
  border: none;
  background: transparent;
  margin: 0;
  padding: 0;
  height: ${({ size }) => (isNumber(size) ? `${size}px` : size)};
  width: ${({ size }) => (isNumber(size) ? `${size}px` : size)};
  color: ${({ theme, color = 'gray', gradient = 900 }) => theme.colors[color][gradient]};
  svg {
    height: ${({ size }) => (isNumber(size) ? `${size}px` : size)};
    fill: ${getFill};
    color: ${({ theme, color = 'gray', gradient = 900 }) => theme.colors[color][gradient]};
  }
`
/**
 * IconButton
 * @type {StyledComponent}
 * @todo refactor to TailwindsCSS
 */
export const IconButton = styled(({ icon, color, ...rest }) => {
  if (typeof Icons[icon] === 'undefined') throw new Error('Icon Not Found!')
  const Icon = Icons[icon]
  return (
    <button color={color} {...rest}>
      <Icon {...rest} />
    </button>
  )
})`
  ${style}
`
IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  gradient: PropTypes.number,
  fillGradient: PropTypes.number
}

IconButton.defaultProps = {
  color: 'gray',
  gradient: 900,
  fillGradient: 500
}
export default IconButton
