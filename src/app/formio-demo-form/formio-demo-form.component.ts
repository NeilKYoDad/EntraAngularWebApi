import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioComponent, FormioModule } from '@formio/angular';

@Component({
  selector: 'app-formio-demo-form',
  standalone: true,
  imports: [CommonModule, FormioModule],
  templateUrl: './formio-demo-form.component.html',
  styleUrls: ['./formio-demo-form.component.css']
})
export class FormioDemoFormComponent {
  readonlyEntry(index: number) {
    this.loadEntry(index);
    this.readonly = true;
  }
  @ViewChild('formioComp') formioComp?: FormioComponent;
  entries: Array<{ name: string; email: string; message: string }> = [
    { name: 'Alice Smith', email: 'alice@example.com', message: 'Hello, this is Alice.' },
    { name: 'Bob Johnson', email: 'bob@example.com', message: 'Hi, Bob here.' },
    { name: 'Carol Lee', email: 'carol@example.com', message: 'Greetings from Carol.' }
  ];
  editEntry(index: number) {
    this.loadEntry(index);
    this.readonly = false;
  }
  readonly = false;
  editingIndex: number | null = null;
  form = {
    components: [
      { label: 'Name', key: 'name', type: 'textfield', input: true, validate: { required: true } },
      { label: 'Email', key: 'email', type: 'email', input: true, validate: { required: true } },
      { label: 'Message', key: 'message', type: 'textarea', input: true, validate: { required: true } },
      { type: 'button', action: 'submit', label: 'Submit', theme: 'primary' }
    ]
  };

  onSubmit(submission: any) {
    if (this.editingIndex !== null) {
      this.entries[this.editingIndex] = { ...submission.data };
      this.readonly = true;
    } else {
      this.entries.push({ ...submission.data });
      this.editingIndex = this.entries.length - 1;
      this.readonly = true;
    }
    // Reset Formio busy/loading state if present
    setTimeout(() => {
      if (this.formioComp) {
        // Reset the submission property to force FormioComponent to clear busy state
        (this.formioComp as any).submission = null;
        if (this.formioComp.formio) {
          this.formioComp.formio.loading = false;
          this.formioComp.formio.submitting = false;
        }
      }
    });
  }

  loadEntry(index: number) {
    const entry = this.entries[index];
    this.readonly = true;
    this.editingIndex = index;
    // Set the form data using FormioComponent's setSubmission
    setTimeout(() => {
      if (this.formioComp && this.formioComp.formio) {
        this.formioComp.formio.submission = { data: { ...entry } };
      }
    });
  }

  createNew() {
    this.readonly = false;
    this.editingIndex = null;
    setTimeout(() => {
      if (this.formioComp && this.formioComp.formio) {
        this.formioComp.formio.submission = { data: {} };
      }
    });
  }
}
