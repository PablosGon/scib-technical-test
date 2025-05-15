import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CandidatesService } from '../../../services/candidates/candidates.service';
import { CandidateForm } from '../../../models/candidates/candidate-form.model';
import { CandidatesExcelImporterService } from '../../../services/candidates/candidates-excel-importer/candidates-excel-importer.service';
import { Candidate } from '../../../models/candidates/candidate.model';

@Component({
  selector: 'app-candidates-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './candidates-form.component.html',
  styleUrl: './candidates-form.component.css'
})
export class CandidatesFormComponent {

  form!: FormGroup;

  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly candidatesExcelImporterService: CandidatesExcelImporterService,
    private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(500)]],
      surname: ['', [Validators.required, Validators.maxLength(500)]],
      data: [''],
    });
    this.form.valueChanges.subscribe(() => {
      
    })
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    console.log(file);
    if (file) {
      this.form.patchValue({ data: file });
      this.form.get('data')?.updateValueAndValidity();
    }
  }

  onChange(){
    console.log(this.form.value);
  }

  async onSubmit() {

    console.log("boton submit pulsado")
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value)
    const fromValues = this.form.value as CandidateForm;

    let newCandidate!: Candidate;
    await this.candidatesExcelImporterService.getCandidateDataFromExcel(fromValues.data).then((data) => {
      newCandidate = {
        name: fromValues?.name ?? '',
        surname: fromValues?.surname ?? '',
        seniority: data.seniority,
        yearsOfExperience: data.yearsOfExperience,
        availability: data.availability,
      }

    });

    console.log('XD')

    this.candidatesService.postCandidate(newCandidate).subscribe((data) => {
      console.log("Habemus candidate")
    })
  }

}
