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
    name: 'Graham',
    fancyInput: 'fancy preset',
    day: 10,
    history: [3, 5, 2, 4, 6, 1],
    anotherinput: {
      value: 'User inputs2',
      appendText: 'Loaded from previous submission',
      history: ['1updated', '5', '7']
    },
    days: {
      value: 'User days',
      appendText: 'datys Loaded from previous submission',
      history: ['days', '5', '7']
    }
  };

  // Pass previousSubmission as initial data to Formio, wrapped in 'data' for Formio compatibility
  formioData = { ...this.previousSubmission };
  form = {
    components: [
    //   {
    //     label: 'Days',
    //     key: 'days',
    //     type: 'fancyinput',
    //     numCols: 6
    //   },
      {
        type: "anotherinput",
        key: "anotherinput",
        label: "Another Input",
        appendText: 'yo',
        history: ['1', '5', '7'],
        // input: true,
        // inputType: "text",
        validate: {
          required: true
        }
      },
      {
        type: "anotherinput",
        key: "days",
        label: "DAys",
        appendText: 'yo',
        history: ['1', '5', '7'],
        // input: true,
        // inputType: "text",
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

  submissions: any[] = [];

  onFormReady(formInstance: any) {
    console.log('Form is ready!', formInstance);
    // Set the submission so that history is under days.history
    //formInstance.formio.setSubmission({ data: { history: this.previousSubmission.history, newDay: 10, name: 'Bob' } });
  }

  onFormioSubmit(event: any) {
    this.submissions.unshift({ ...event.data, submittedAt: new Date() });
  }
}
