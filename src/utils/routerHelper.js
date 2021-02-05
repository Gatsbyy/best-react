import { generatePath } from 'react-router';
import { enumRouterPath } from '@enum/enumRouter';

// 获取常用工具路由
export const generateUrl = (options) => {
  return generatePath(enumRouterPath.Detail, { ...options });
};