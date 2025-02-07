import { readFileSync } from 'fs';
import { join } from 'path';

export function getDataFromFile(fileName: string, path: string = '/jsondata') {
  const filePath = join(__dirname, '..', path, fileName);
  const jsonData = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);
  return data;
}
