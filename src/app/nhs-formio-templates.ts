// NHS Form.io template override for global use
export const nhsFormioTemplates = {
  bootstrap: {
    form: `
      <div class="nhsuk-form-group" ref="webform">
        {{children}}
      </div>
    `,
    textfield: {
      form: `
        <div class="nhsuk-form-group" ref="component">
          <label class="nhsuk-label" ref="label">{{component.label}}</label>
          <div ref="element"></div>
          <div class="nhsuk-error-message" ref="messageContainer"></div>
        </div>
      `,
      input: `
        <input ref="input" class="nhsuk-input {{component.customClass}}">
      `
    },
    textarea: {
      form: `
        <div class="nhsuk-form-group" ref="component">
          <label class="nhsuk-label" ref="label">{{component.label}}</label>
          <div ref="element"></div>
          <div class="nhsuk-error-message" ref="messageContainer"></div>
        </div>
      `,
      input: `
        <textarea ref="input" class="nhsuk-textarea {{component.customClass}}" rows="{{component.rows}}"></textarea>
      `
    },
    datetime: {
      form: `
        <div class="nhsuk-form-group" ref="component">
          <label class="nhsuk-label" ref="label">{{component.label}}</label>
          <div ref="element"></div>
          <div class="nhsuk-error-message" ref="messageContainer"></div>
        </div>
      `,
      input: `
        <input ref="input" class="nhsuk-input {{component.customClass}}" type="date">
      `
    },
    button: {
      form: `
        <div ref="component">
          <button ref="button" class="nhsuk-button {{component.customClass}}">{{component.label}}</button>
        </div>
      `
    }
  }
};
