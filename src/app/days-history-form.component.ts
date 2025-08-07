import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Formio, FormioModule } from '@formio/angular';

@Component({
  selector: 'app-days-history-form',
  standalone: true,
  imports: [CommonModule, FormioModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h2 class="h4 mb-4 text-primary">Days Entry Form <small class="text-muted">(with History)</small></h2>
              <formio [form]="form" [submission]="{ data: formioData }" (submit)="onFormioSubmit($event)"></formio>
              
              <div *ngIf="submissions.length" class="mt-5">
                <h5 class="mb-3">Submission History</h5>
                <div *ngFor="let sub of submissions; let i = index" class="mb-2 p-2 border rounded bg-light">
                  <pre class="mb-0">{{ sub | json }}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: []
})
export class DaysHistoryFormComponent {
  // Hardcoded previous submission object
  previousSubmission = {
    days: {
      history: [3, 5, 2, 4, 6, 1]
    },
    name: 'Alice'
  };

  // Pass previousSubmission as initial data to Formio
  formioData = { ...this.previousSubmission };
  form = {
    components: [
      {
        label: 'Days',
        key: 'days',
        type: 'checkmatrix',
        numCols: 6
      },
      { label: 'Name', key: 'name', type: 'textfield', input: true, validate: { required: false } },
      {
        type: 'button',
        action: 'submit',
        label: 'Submit',
        theme: 'primary',
        block: false,
        rightIcon: '',
        leftIcon: '',
        size: 'md',
        key: 'submit',
        disableOnInvalid: true
      }
    ]
  };

  submissions: any[] = [];
  onFormioSubmit(event: any) {
    this.submissions.unshift({ ...event.data, submittedAt: new Date() });
  }
}
