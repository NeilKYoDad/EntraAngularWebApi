import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-formio-builder',
    standalone: true,
    imports: [CommonModule],
    template: `
    <h2>Form.io Builder (NHS fields only)</h2>
    <div #builderContainer></div>
  `
})
export class FormioBuilderComponent implements AfterViewInit {
    @ViewChild('builderContainer', { static: true }) builderContainer!: ElementRef;

    ngAfterViewInit() {
        // Use global Formio from script tag
        const Formio = (window as any).Formio;
        if (Formio) {
            const builder = new Formio.FormBuilder(
                this.builderContainer.nativeElement,
                { components: [] },
                {
                    builder: {
                        basic: { ignore: true },
                        advanced: { ignore: true },
                        data: { ignore: true },
                        layout: { ignore: true },
                        premium: { ignore: true },
                        resource: { ignore: true },
                        custom: {
                            title: 'Pre-Defined Fields',
                            weight: 10,
                            components: {
                                firstName: {
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
                                phoneNumber: {
                                    title: 'Mobile Phone',
                                    key: 'mobilePhone',
                                    icon: 'phone-square',
                                    schema: {
                                        label: 'Mobile Phone',
                                        type: 'phoneNumber',
                                        key: 'mobilePhone',
                                        input: true
                                    }
                                }
                            }
                        }
                    }
                }
            );
        } else {
            console.error('Formio.js is not loaded. Please include it as a script in your index.html.');
        }
    }
}