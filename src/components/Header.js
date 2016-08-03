import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const trim = string => string.substr(1);

const Header = ({ location: { pathname: path }}) => (
  <div className='navbar'>
    {path === '/' && <span>=</span>}
    {path !== '/' &&
      <span>
        <Link to='/'>{'<'}</Link>
      </span>}
    <h3>{path === '/' ? 'Devices' : trim(path)}</h3>
  </div>
)

export default Header