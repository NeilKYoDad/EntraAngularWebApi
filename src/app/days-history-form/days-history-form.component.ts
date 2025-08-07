import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Formio, FormioModule } from '@formio/angular';

@Component({
  selector: 'app-days-history-form',
  standalone: true,
  imports: [CommonModule, FormioModule],
  templateUrl: './days-history-form.component.html',
  styleUrls: ['./days-history-form.component.css']
})
export class DaysHistoryFormComponent {
  // Hardcoded previous submission object
  previousSubmission = {
    name: '',
    daysOff: {
      value: '',
      history: ['10', '15', '17', '18']
    }
  };

  // Pass previousSubmission as initial data to Formio, wrapped in 'data' for Formio compatibility
  formioData = { ...this.previousSubmission };
  form = {
    components: [
      {
        type: "inputwithhistory",
        key: "daysOff",
        label: "Days Off",
        appendText: 'Days',
        numHistoryItems: 3,        
        history: ['1', '5', '7'],
        // input: true,
        inputType: "number",
        validate: {
          required: true
        }
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

  submission: any = {};
  private formioInstance: any;

  onFormReady(formInstance: any) {
    console.log('Form is ready!', formInstance);
    this.formioInstance = formInstance;
    // Set the submission so that history is under days.history
    //formInstance.formio.setSubmission({ data: { history: this.previousSubmission.history, newDay: 10, name: 'Bob' } });
  }

  onFormioSubmit(event: any) {
    this.submission = { ...event.data, submittedAt: new Date() };
    if (this.formioInstance) {
      this.formioInstance.formio.emit('submitDone');
      this.formioInstance.formio.setSubmission({ data: {} });
    }
  }
}
