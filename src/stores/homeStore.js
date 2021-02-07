import axios from '@src/request'
import enumUrls from '@enum/enumUrls'
import { makeAutoObservable } from 'mobx';

class HomeStore {
  fruit = []; // 水果
  vegetables = []; // 蔬菜
  constructor() {
    makeAutoObservable(this);
  }

  async getHomeInfo () {
    const { data } = await axios.get(enumUrls.home);
    this.fruit = data.fruit;
    this.vegetables = data.vegetables;
  }
}

export default new HomeStore();