import axios from 'axios'

axios.defaults.baseURL = '/mock';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

// 拦截器
axios.interceptors.request.use((request) => {
  if (!request.headers.Authorization) {
    request.headers.Authorization = 'AUTH_TOKEN';
  }
  return request;
});

axios.interceptors.response.use((response) => {
  // const { code } = response;
  // if (code !== 200) {
  //   Promise.reject('error');
  // }

  return response;
}, (error) => {
  return Promise.reject(error);
});

export default axios;