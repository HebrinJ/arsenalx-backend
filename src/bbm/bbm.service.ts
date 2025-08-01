import { Inject, Injectable } from '@nestjs/common';
import { Bbm } from 'src/units/bbm';
import { LOCAL_SERVER } from 'src/utils/localRoutes';

export interface IBbmDataRepo {
  getData(): Promise<Readonly<Bbm[]>>;
  addNewBbm(newBbm: Bbm): Promise<void>;
  removeBbm(indexToRemove: number): Promise<void>;
  editBbmEntry(id: string, newData: Bbm): Promise<void>;
  saveData(bbmData: Bbm[]): Promise<void>;
}

@Injectable()
export class BbmService {
  constructor(@Inject('IBbmDataRepo') private repo: IBbmDataRepo) {}

  getBbmList() {
    return this.repo.getData();
  }

  async findUnitById(id: string): Promise<Bbm> {
    const bbmList = await this.repo.getData();
    const unit = bbmList.find((unit) => unit.id === id);

    if (unit) {
      return unit;
    } else {
      throw new Error(`Техника с id: ${id} не найдена`);
    }
  }

  async editBbmEntry(id: string, newData: Bbm) {
    const bbmList = await this.repo.getData();
    const newBbmList = bbmList.map((unit) => {
      // Условие сохраняет данные об изображениях, т.к. они изменяются отдельно
      if (unit.id === id) {
        return {
          ...newData,
          mainImage: unit.mainImage,
          cardImage: unit.cardImage,
        };
      }
      return unit;
    });

    this.repo.saveData(newBbmList);
  }

  async addNewEmptyEntry(unitName: string) {
    const newUnit = await this.createNewEmptyEntry(unitName);
    this.repo.addNewBbm(newUnit);
  }

  async createNewEmptyEntry(unitName: string) {
    const newId: string = await this.getNewId();
    const newEmptyBbm = new Bbm(newId, unitName);

    return newEmptyBbm;
  }

  async removeBbm(id: string) {
    const bbmList = await this.repo.getData();
    const indexToRemove = bbmList.findIndex((unit) => unit.id === id);
    this.repo.removeBbm(indexToRemove);
  }

  async getLastId() {
    let lastId;
    const bbmList = await this.repo.getData();

    if (bbmList.length != 0) {
      lastId = bbmList[bbmList.length - 1].id;
      return lastId;
    } else {
      return 'bbm0';
    }
  }

  async getNewId() {
    const lastId: string = await this.getLastId();
    let idNumber: number = parseInt(lastId.slice(3), 10);
    idNumber++;

    const newId: string = `bbm${idNumber}`;

    return newId;
  }

  async setMainImage(id: string, imageName: string) {
    this.setImage(id, imageName, 'mainImage');
  }

  async setCardImage(id: string, imageName: string) {
    this.setImage(id, imageName, 'cardImage');
  }

  async setImage(
    id: string,
    imageName: string,
    imageType: 'mainImage' | 'cardImage',
  ) {
    const filePath = `${LOCAL_SERVER}/images/bbm/${imageName}`;

    const bbmList = await this.repo.getData();

    const newBbmList = bbmList.map((unit) => {
      if (unit.id === id) {
        const newUnit = { ...unit, [imageType]: filePath };
        return newUnit;
      }
      return unit;
    });

    this.repo.saveData(newBbmList);
  }
}
