import axios from 'axios'

axios.defaults.baseURL = '/mock';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
const successCode = [0, 200];
// 拦截器
axios.interceptors.request.use((request) => {
  if (!request.headers.Authorization) {
    request.headers.Authorization = 'AUTH_TOKEN';
  }
  return request;
});

axios.interceptors.response.use((response) => {
  const { code, data } = response.data;
  if (!successCode.includes(code)) {
    Promise.reject('error');
  }

  return data;
}, (error) => {
  return Promise.reject(error);
});

export default axios;