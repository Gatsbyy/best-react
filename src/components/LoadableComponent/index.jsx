import Loadable from 'react-loadable'
import Loading from '@components/Loading'

export default function LoadableComponent(Component) {
  return Loadable({
    loader: Component,
    loading: Loading,
    timeout: 1000
  });
}