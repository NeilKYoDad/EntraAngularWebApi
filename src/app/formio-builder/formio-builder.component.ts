import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormioModule } from '@formio/angular';

@Component({
    //   selector: 'app-formio-builder',
    standalone: true,
    imports: [CommonModule, FormsModule, FormioModule],
    templateUrl: './formio-builder.component.html',
    styleUrls: ['./formio-builder.component.css']
})
export class FormioBuilderComponent {
  public form: any = { title: '', components: [] };
  public builderOptions: any;

  ngOnInit(): void {
    this.builderOptions = {
      builder: {
        basic: false,
        advanced: false,
        layout: false,
        data: false,
        premium: false,
        custom: {
          title: 'Pre-Defined Fields',
          default: true,
          weight: 0,
          components: {
            nominator: {
              title: 'Nominator',
              key: 'nominator',
              icon: 'terminal',
              schema: {
                label: 'Nominator',
                type: 'textfield',
                key: 'nominator',
                input: true
              }
            },
            lastName: {
              title: 'Last Name',
              key: 'lastName',
              icon: 'terminal',
              schema: {
                label: 'Last Name',
                type: 'textfield',
                key: 'lastName',
                input: true
              }
            },
            email: {
              title: 'Email',
              key: 'email',
              icon: 'at',
              schema: {
                label: 'Email',
                type: 'email',
                key: 'email',
                input: true
              }
            },
            mobilePhone: {
              title: 'Mobile Phone',
              key: 'mobilePhone',
              icon: 'phone-square',
              schema: {
                label: 'Mobile Phone',
                type: 'phoneNumber',
                key: 'mobilePhone',
                input: true
              }
            },
            // Added custom component
            inputWithHistory: {
              title: 'Input With History',
              key: 'inputWithHistory',
              icon: 'history',
              schema: {
                label: 'Input With History',
                type: 'inputwithhistory',
                key: 'inputWithHistory',
                input: true,
                inputType: 'number',
                suffix: 'MySuffix',
                numHistoryItems: 3,
                history: ['1', '12', '7']
              }
            }
          }
        }
      }
    };
  }

  onChange(event: any) {
  }

  async saveForm() {
    const projectUrl = 'https://uvdyehktuzwoemj.form.io';
    const name = this.form.title ? this.form.title.toLowerCase().replace(/\s+/g, '-') : 'custom-form';
    const payload = {
      title: this.form.title,
      name,
      path: name,
      type: 'form',
      display: 'form',
      components: this.form.components
    };
    const url = `${projectUrl}/form`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert('Form saved to Form.io!');
      } else {
        const err = await res.text();
        alert('Error saving form: ' + err);
      }
    } catch (e: any) {
      alert('Error saving form: ' + e.message);
    }
  }
}