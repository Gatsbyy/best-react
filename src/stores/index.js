import { createContext, useContext } from 'react';
import homeStore from './homeStore'

export const stores = {
  homeStore
};

// 全局store上下文
export const StoreContext = createContext(stores);
// 暴露组件中引用store的方法
export const useStore = () => {
  return useContext(StoreContext);
};