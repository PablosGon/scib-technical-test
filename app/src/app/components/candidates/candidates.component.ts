import { Component } from '@angular/core';
import { CandidatesFormComponent } from "./candidates-form/candidates-form.component";

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CandidatesFormComponent],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {

}
