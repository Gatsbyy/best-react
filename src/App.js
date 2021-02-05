import React from 'react';
import PropTypes from 'prop-types'
import Next from '@containers/Next'

function App({ children }) {
  console.log('111111====', 1111);
  return (
    <>
      <Next />
      {children}
    </>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default App;