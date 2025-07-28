import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nhsstylesheet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>NHS Styled Form</h2>
    <form class="nhsuk-form-group">
      <div class="nhsuk-form-group">
        <label class="nhsuk-label" for="name">Name</label>
        <input class="nhsuk-input" id="name" name="name" type="text" required />
      </div>
      <div class="nhsuk-form-group">
        <label class="nhsuk-label" for="email">Email</label>
        <input class="nhsuk-input" id="email" name="email" type="email" required />
      </div>
      <div class="nhsuk-form-group">
        <label class="nhsuk-label" for="dob">Date of Birth</label>
        <input class="nhsuk-input" id="dob" name="dob" type="date" required />
      </div>
      <div class="nhsuk-form-group">
        <label class="nhsuk-label" for="message">Message</label>
        <textarea class="nhsuk-textarea" id="message" name="message" rows="4"></textarea>
      </div>
      <button class="nhsuk-button" type="submit">Submit</button>
    </form>
  `,
  styleUrls: ['./nhsstylesheet.component.css']
})
export class NhsstylesheetComponent {}
