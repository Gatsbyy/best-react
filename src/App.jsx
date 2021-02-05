import React from 'react';
import PropTypes from 'prop-types'

function App({ children }) {
  console.log('111111====', 1111);
  return (
    <>
      {children}
    </>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default App;