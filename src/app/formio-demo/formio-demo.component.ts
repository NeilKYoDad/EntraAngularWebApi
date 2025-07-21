import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioModule } from '@formio/angular';

@Component({
  selector: 'app-formio-demo',
  standalone: true,
  imports: [CommonModule, FormioModule],
  template: `
    <h2>Form.io Demo</h2>
    <div class="mb-3">
      <formio [src]="formUrl"></formio>
    </div>
  `
})
export class FormioDemoComponent {
  formUrl = 'https://examples.form.io/example'; // Replace with your Form.io form URL
}
