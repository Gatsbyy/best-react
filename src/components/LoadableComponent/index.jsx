import React from 'react'
import Loadable from 'react-loadable'
import Loading from '@components/Loading'
import { componentLoadTimeout } from '@enum/index';


export default function LoadableComponent(Component) {
  return Loadable({
    loader: Component,
    loading: (props) => {
      console.log(props);
      return <Loading />
    },
    timeout: componentLoadTimeout
  });
}