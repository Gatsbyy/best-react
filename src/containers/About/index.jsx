import React, { useState } from 'react'

function About() {
  const [count, setCount] = useState(0);

  setTimeout(() => {
    setCount(count + 1);
  }, 1000);

  return (
    <div>{count}</div>
  )
}

export default About;