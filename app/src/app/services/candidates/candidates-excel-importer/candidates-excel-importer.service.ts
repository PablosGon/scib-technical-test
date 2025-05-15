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

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (ev: ProgressEvent<FileReader>) => {
        try {
          const excelFile = ev.target?.result;
          const book = read(excelFile, { type: 'array' });

          const sheetName = book.SheetNames[0];
          const sheet = book.Sheets[sheetName];

          const result = utils.sheet_to_json(sheet)[0];

          const validationErrors = this.validationErrors(result);
          if (validationErrors.length > 0) {
            reject(new Error(`Invalid columns in excel file: ${validationErrors.join(', ')}`))
          }

          const resultCandidate = result as CandidateExcelData;
          resultCandidate.availability = this.parseBool((result as any).availability);
          resolve(result as CandidateExcelData);
        } catch {
          reject(new Error('there was an error while getting the file data'));
        }
      }

      reader.readAsArrayBuffer(file);
    })
  }

  private validationErrors(result: any): string[] {
    let errors: string[] = [];

    if (result.seniority !== 'junior' && result.seniority !== 'senior') {
      errors.push('seniority must be junior or senior');
    }

    if (typeof result.yearsOfExperience !== 'number' || result.yearsOfExperience < 0) {
      errors.push('years of experience must be a non-negative number');
    }

    if (result.availability !== 'true' && result.availability !== 'false') {
      errors.push('availability must be true or false');
    }

    return errors;
  }

  private parseBool(boolString: string) {
    return boolString === 'true';
  }
}
