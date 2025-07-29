import { Bbm } from 'src/units/bbm';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { getDataFromFile, getDataFromFileAsync } from 'src/utils/getDataFromFile';
import { DEV_LOCAL_JSON_BBMDATA } from 'src/utils/localRoutes';

export class BbmDataRepo {
  private data: Bbm[] = [];

  constructor() {
    this.loadData().catch((err) => {
      console.error('Не удалось загрузить данные:', err);
      this.data = []; // Инициализация пустым массивом при ошибке
    });
  }

  async loadData() {
    try {
      this.data = await getDataFromFileAsync('bbmData.json');
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      this.data = [];
    }
  }

  getData(): Readonly<Bbm[]> {
    return this.data;
  }

  async addNewBbm(newBbm: Bbm) {
    this.data.push(newBbm);
    this.saveData(this.data);
  }

  async removeBbm(indexToRemove: number) {
    this.data.splice(indexToRemove, 1);
    this.saveData(this.data);
  }

  clearData() {
    this.data = [];
  }

  async reloadData() {
    this.clearData();
    await this.loadData();
  }

  async saveData(bbmList: Bbm[]) {
    try {
      const filePath = join(__dirname, '..', '/jsondata', 'bbmData.json');
      const jsonData = JSON.stringify(bbmList, null, 2);
      writeFileSync(filePath, jsonData, 'utf-8');

      // DEV сохранение
      writeFileSync(DEV_LOCAL_JSON_BBMDATA, jsonData, 'utf-8');
      //

      this.reloadData();
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  }
}
