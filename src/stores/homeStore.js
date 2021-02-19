import axios from '@src/request'
import enumUrls from '@enum/enumUrls'
import { makeAutoObservable } from 'mobx';

class HomeStore {
  fruit = []; // 水果
  vegetables = []; // 蔬菜
  listInfo = {}; // table 列表
  constructor() {
    makeAutoObservable(this);
  }

  async getHomeInfo () {
    const { data } = await axios.get(enumUrls.home);
    this.fruit = data.fruit;
    this.vegetables = data.vegetables;
  }

  async getList() {
    const { data } = await axios.get(enumUrls.list);
    console.log('data====', data)
    this.listInfo = data;
  }
}

export default new HomeStore();