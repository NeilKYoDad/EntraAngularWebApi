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
    public form: any = { components: [] };
    public builderOptions: any; // Declare the options property


    ngOnInit(): void {
        this.builderOptions = {
            builder: {
                // Disable default groups if you want only your custom ones
                basic: false,
                advanced: false,
                layout: false,
                data: false,
                premium: false,
                // Add a custom group for your predefined fields
                custom: {
                    title: 'My Predefined Fields', // Title of your custom group in the builder
                    default: true, // Make this the default active tab in the builder
                    weight: 0, // Control the order of this group in the builder sidebar
                    components: {
                        // Define the components you want to allow
                        // You can use a boolean 'true' to include a standard component type
                        textfield: false,
                        textarea: false,
                        email: false,
                        phoneNumber: false,
                        checkbox: false,
                        select: false, // Dropdown select
                        radio: false,  // Radio buttons

                        // You can also define custom components here with their full schema
                        // For example, a pre-configured text field:
                        nominatorField: {
                            title: 'Nominator',
                            key: 'nominator',
                            schema: {
                                label: 'Nominator',
                                type: 'textfield',
                                key: 'nominator',
                                input: true,
                                placeholder: 'Enter custom text here',
                                description: 'This is a nominator.'
                            }
                        },
                        denominatorField: {
                            title: 'Denominator',
                            key: 'denominator',
                            icon: 'check-square',
                            schema: {
                                label: 'I accept the terms and conditions',
                                type: 'checkbox',
                                key: 'denominator',
                                input: true,
                                defaultValue: false
                            }
                        }
                    }
                }
            }
        };
    }

    /*
    onChange(event: any) {
      console.log('Form changed:', event);
      this.form = event.form; // Update the form object with the new schema
    }*/
}