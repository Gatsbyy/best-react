import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import loadLanguage from '@src/locale'
// import { useLocation } from 'react-router-dom';
function App({ children }) {
  // const { search } = useLocation();
  
  useEffect(() => {
    const { lang = 'en_US' } = window.global;
    // const searchParams = new URLSearchParams(search.substring(1));
    // const lang = searchParams.get('lang');
    loadLanguage(lang);
  }, [])

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