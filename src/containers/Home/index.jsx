import React, { useEffect } from 'react';
import { useStore } from '@src/stores';

function Home() {
  const { homeStore } = useStore();

  useEffect(() => {
    homeStore.getHomeInfo();
  }, [homeStore])

  return (
    <div>Home</div>
  )
}

export default Home;