import React from 'react';
import PropTypes from 'prop-types'

function App({ children }) {
  return (
    <>{children}</>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default App;