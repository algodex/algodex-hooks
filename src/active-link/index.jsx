import PropTypes from 'prop-types'
import { Link, useRouteMatch } from 'react-router-dom'
import React, { Children } from 'react'

/**
 * Custom Next.js <Link/> element that passes a boolean `isActive` prop to its
 * child if the current route matches either:
 *
 * 1) its `href` prop (default)
 * 2) its `matches` prop (optional), a regular expression
 *
 * The child element should be a styled component with active styles determined
 * by the value of `isActive`.
 */
const ActiveLink = ({ children, matches, ...props }) => {
  let { path, url } = useRouteMatch()
  const child = Children.only(children)

  const isActive = matches ? matches.test(path) : url === props.href

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        isActive
      })}
    </Link>
  )
}

ActiveLink.propTypes = {
  children: PropTypes.node,
  matches: PropTypes.instanceOf(RegExp),
  href: PropTypes.string
}

export default ActiveLink