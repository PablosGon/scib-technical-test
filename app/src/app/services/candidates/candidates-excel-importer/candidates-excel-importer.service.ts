import { Injectable } from '@angular/core';
import { CandidateExcelData } from '../../../models/candidates/candidate-excel-data.model';
import { read, utils } from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class CandidatesExcelImporterService {

  constructor() { }

  public getCandidateDataFromExcel(file?: File): Promise<CandidateExcelData> {
    if(!file) {
      return Promise.reject(new Error('could not get file data'));
    }

    console.log('getting file data', file)

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (ev: ProgressEvent<FileReader>) => {
        try {
          const excelFile = ev.target?.result;
          const book = read(excelFile, { type: 'array' });

          const sheetName = book.SheetNames[0];
          const sheet = book.Sheets[sheetName];

          const result = utils.sheet_to_json(sheet)[0] as CandidateExcelData;

          resolve(result);
        } catch {
          reject(new Error('there was an error while getting the file data'));
        }
      }

      reader.readAsArrayBuffer(file);

    })

  }
}
