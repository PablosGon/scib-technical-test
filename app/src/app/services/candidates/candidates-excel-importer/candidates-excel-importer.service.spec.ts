import { TestBed } from '@angular/core/testing';

import { CandidatesExcelImporterService } from './candidates-excel-importer.service';

describe('CandidatesExcelImporterService', () => {
  let service: CandidatesExcelImporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatesExcelImporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
