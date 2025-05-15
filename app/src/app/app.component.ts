import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CandidatesFormComponent } from '../components/candidates/candidates-form/candidates-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CandidatesFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}
