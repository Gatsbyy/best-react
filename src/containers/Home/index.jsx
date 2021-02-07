import React, { useEffect } from 'react';
import { useStore } from '@src/stores';
import { observer } from 'mobx-react-lite'

function Home() {
  const { homeStore } = useStore();
  const { fruit, vegetables } = homeStore;

  useEffect(() => {
    homeStore.getHomeInfo();
  }, [homeStore])

  return (
    <div>
      <p>fruit:
        {
          fruit?.map((f) => {
            return f + ' ';
          })
        }
      </p>
      <p>vegetables: 
        { 
          vegetables?.map((v) => {
            return v + ' ';
          })
        }
      </p>
    </div>
  )
}

export default observer(Home);