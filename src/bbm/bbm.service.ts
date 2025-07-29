import { Injectable, OnModuleInit } from '@nestjs/common';
//import { TBbmDataType } from 'src/types/units/armor/bbmDataType';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { Bbm } from 'src/units/bbm';
import { getDataFromFile, getDataFromFileAsync } from 'src/utils/getDataFromFile';

@Injectable()
export class BbmService implements OnModuleInit {
  private bbmList: Array<Bbm> = [];

  onModuleInit() {
    this.loadBbmList();
  }

  loadBbmList() {
    this.bbmList = getDataFromFile('bbmData.json');
  }

  clearBbmList() {
    this.bbmList = [];
  }

  reloadBbmList() {
    this.clearBbmList();
    this.loadBbmList();
  }

  getBbmList() {
    return this.bbmList;
  }

  findUnitById(id: string): Bbm {
    const unit = this.bbmList.find((unit) => unit.id === id);

    if (unit) {
      return unit;
    } else {
      throw new Error(`Техника с id: ${id} не найдена`);
    }
  }

  editBbmEntry(id: string, newData: Bbm) {
    const newBbmList = this.bbmList.map((unit) => {
      if (unit.id === id) {
        newData.mainImage = unit.mainImage;
        newData.cardImage = unit.cardImage;
        return newData;
      }
      return unit;
    });

    this.saveData(newBbmList);
  }

  addNewEmptyEntry(unitName: string) {
    const newUnit = this.createNewEmptyEntry(unitName);
    this.bbmList.push(newUnit);
    //this.saveDataToFile();
    this.saveData(this.bbmList);
  }

  removeBbm(id: string) {
    const indexToRemove = this.bbmList.findIndex((unit) => unit.id === id);
    this.bbmList.splice(indexToRemove, 1);
    //this.saveDataToFile();
    this.saveData(this.bbmList);
  }

  saveDataToFile() {
    try {
      console.log('saveDataToFileFunction');
      const filePath = join(__dirname, '..', '/jsondata', 'bbmData.json');
      const jsonData = JSON.stringify(this.bbmList, null, 2);
      writeFileSync(filePath, jsonData, 'utf-8');

      // DEV сохранение
      writeFileSync('F:/Work/ArsenalX/backend/arsenalx-back/src/jsondata/bbmData.json', jsonData, 'utf-8');
      //

      this.reloadBbmList();
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  }

  getLastId() {
    let lastId;

    if (this.bbmList.length != 0) {
      lastId = this.bbmList[this.bbmList.length - 1].id;
      return lastId;
    } else {
      return 'bbm0';
    }
  }

  getNewId() {
    const lastId: string = this.getLastId();
    let idNumber: number = parseInt(lastId.slice(3), 10);
    idNumber++;

    const newId: string = `bbm${idNumber}`;

    return newId;
  }

  createNewEmptyEntry(unitName: string) {
    const newId: string = this.getNewId();
    const newEmptyBbm = new Bbm(newId, unitName);

    return newEmptyBbm;
  }

  async loadData() {
    return await getDataFromFileAsync('bbmData.json');
  }

  saveData(bbmList: Array<Bbm>) {
    try {
      const filePath = join(__dirname, '..', '/jsondata', 'bbmData.json');
      const jsonData = JSON.stringify(bbmList, null, 2);
      writeFileSync(filePath, jsonData, 'utf-8');

      // DEV сохранение
      writeFileSync('F:/Work/ArsenalX/backend/arsenalx-back/src/jsondata/bbmData.json', jsonData, 'utf-8');
      //

      // Тестовая запись нового поля в отдельный фаил. Это работает
      // const testData = bbmList[0];
      // const arr = [testData, bbmList[1], bbmList[2], bbmList[3]];
      // const testJson = JSON.stringify(arr, null, 2);
      // writeFileSync('F:/Work/ArsenalX/backend/arsenalx-back/src/jsondata/test.json', jsonData, 'utf-8');
      //

      this.reloadBbmList();
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  }

  async setMainImage(id: string, imageName: string) {
    const filePath = `http://localhost:3001/images/bbm/${imageName}`;

    const bbmList: Array<Bbm> = await this.loadData();

    const newBbmList = bbmList.map((unit) => {
      if (unit.id === id) {
        const newUnit = { ...unit, mainImage: filePath };
        return newUnit;
      }
      return unit;
    });

    this.saveData(newBbmList);
  }

  async setCardImage(id: string, imageName: string) {
    const filePath = `http://localhost:3001/images/bbm/${imageName}`;

    const bbmList: Array<Bbm> = await this.loadData();

    const newBbmList = bbmList.map((unit) => {
      if (unit.id === id) {
        const newUnit = { ...unit, cardImage: filePath };
        return newUnit;
      }
      return unit;
    });

    this.saveData(newBbmList);
  }

  async getImagePath(id: string) {
    const bbmList: Array<Bbm> = await this.loadData();

    const unit = bbmList.find((item) => item.id === id);
    return unit?.mainImage;
  }
}
