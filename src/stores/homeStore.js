import axios from '@src/request'
import enumUrls from '@enum/enumUrls'

class HomeStore {
  count = 0;

  // get computedCount() {

  // }

  
  getHomeInfo = async () => {
    const { data } = await axios.get(enumUrls.home);

    console.log('data====', data);
  }
}

export default new HomeStore();