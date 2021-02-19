import React, { useEffect } from 'react';
import { useStore } from '@src/stores';
import { observer } from 'mobx-react-lite'
import intl from 'react-intl-universal';
import Table from '@components/Table'
import { toJS } from 'mobx'

function Home() {
  const { homeStore } = useStore();
  const { fruit, vegetables, listInfo } = homeStore;

  console.log('listInfo===', toJS(listInfo));
  useEffect(() => {
    homeStore.getHomeInfo();
    homeStore.getList();
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
      <p>{intl.get('home')}</p>
      <Table data={listInfo} />
    </div>
  )
}

export default observer(Home);