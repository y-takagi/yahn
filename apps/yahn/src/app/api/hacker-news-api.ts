import axios, { AxiosInstance } from 'axios';

import * as data from './data';
import { environment } from '../../environments/environment';

class HackerNewsApi {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: environment.baseUrl + 'v0/',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }

  async getNewstories(): Promise<number[]> {
    const res = await this.client.get<number[]>('newstories.json');
    return res.data;
  }

  async getItem(id: number): Promise<data.ItemDto> {
    const res = await this.client.get<data.ItemDto>(`item/${id}.json`);
    return res.data;
  }
}

export const hackerNewsApi = new HackerNewsApi();
