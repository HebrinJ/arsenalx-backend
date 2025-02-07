import { Injectable, OnModuleInit } from '@nestjs/common';
//import { TBbmDataType } from 'src/types/units/armor/bbmDataType';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { Bbm } from 'src/units/bbm';
import { getDataFromFile } from 'src/utils/getDataFromFile';

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
    this.bbmList = this.bbmList.map((unit) => {
      if (unit.id === id) {
        return newData;
      }
      return unit;
    });
    this.saveDataToFile();
  }

  addNewEmptyEntry(unitName: string) {
    const newUnit = this.createNewEmptyEntry(unitName);
    this.bbmList.push(newUnit);
    this.saveDataToFile();
  }

  removeBbm(id: string) {
    const indexToRemove = this.bbmList.findIndex((unit) => unit.id === id);
    this.bbmList.splice(indexToRemove, 1);
    this.saveDataToFile();
  }

  saveDataToFile() {
    try {
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
}
