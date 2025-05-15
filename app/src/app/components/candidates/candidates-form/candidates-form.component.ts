import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CandidatesService } from '../../../services/candidates/candidates.service';
import { CandidateForm } from '../../../models/candidates/candidate-form.model';
import { CandidatesExcelImporterService } from '../../../services/candidates/candidates-excel-importer/candidates-excel-importer.service';
import { Candidate } from '../../../models/candidates/candidate.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-candidates-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './candidates-form.component.html',
  styleUrl: './candidates-form.component.css'
})
export class CandidatesFormComponent {

  form!: FormGroup;

  public errorMessage?: string;
  public done: boolean = false;

  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly candidatesExcelImporterService: CandidatesExcelImporterService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(500)]],
      surname: ['', [Validators.required, Validators.maxLength(500)]],
      data: ['', [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => {
      
    })
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.form.patchValue({ data: file });
      this.form.get('data')?.updateValueAndValidity();
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const fromValues = this.form.value as CandidateForm;
    let newCandidate!: Candidate;

    try {
      this.errorMessage = '';
      const excelData = await this.candidatesExcelImporterService.getCandidateDataFromExcel(fromValues.data);

      newCandidate = {
        name: fromValues?.name ?? '',
        surname: fromValues?.surname ?? '',
        seniority: excelData.seniority,
        yearsOfExperience: excelData.yearsOfExperience,
        availability: excelData.availability,
      }

      this.candidatesService.postCandidate(newCandidate).subscribe({
        next: () => {
          this.done = true;
        },
        error: (error: Error) => {
          this.errorMessage = error.message ?? 'Something went wrong...'
        },
      });
    } catch(error: any) {
      this.errorMessage = error.message;
    }
  }

}
