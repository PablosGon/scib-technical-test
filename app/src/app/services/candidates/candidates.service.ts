import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidate } from '../../models/candidates/candidate.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(private readonly httpClient: HttpClient) { }

  public postCandidate(candidate: Candidate): Observable<Candidate>{
    return this.httpClient.post<Candidate>('http://localhost:3000/candidates', candidate);
  }
}
