// @ts-nocheck
import { Components } from 'formiojs';
const InputComponent = (Components as any).components.input;

export default class FancyInput extends InputComponent {
  static schema(...extend) {
    return InputComponent.schema({
      type: 'fancyinput',
      label: 'Fancy Input',
      key: 'fancyInput',
      inputType: 'text',
      ...extend
    });
  }

  static get builderInfo() {
    return {
      title: 'Fancy Input',
      group: 'basic',
      icon: 'fas fa-star',
      weight: 10,
      documentation: 'https://your-docs-url.com',
      schema: FancyInput.schema()
    };
  }

  get defaultSchema() {
    return FancyInput.schema();
  }

  get inputInfo() {
    const info = super.inputInfo;
    info.attr.class += ' fancy-input';
    return info;
  }

  render() {
     return super.render(this.renderTemplate('input', {
       input: this.inputInfo
     }));
  }

  /*
  render() {
    const input = this.inputInfo;

    return `
    <div class="form-group formio-component-${this.component.type}">
      <label for="${input.attr.id}">${this.component.label}</label>
      <div class="row">
        <div class="col-md-6">
          <table class="table table-bordered" style="table-layout: auto;">
            <thead>
              <tr>
                <th "style="white-space: nowrap;">6</th>
                <th>Header 2</th>
                <th>Today</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Value A</td>
                <td>Value B</td>
                <td>           
                  <input 
                    type="${input.attr.type}" 
                    class="${input.attr.class}" 
                    id="${input.attr.id}" 
                    name="${input.attr.name}" 
                    ref="input"
                  />
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  `;
  }*/

  attach(element) {
    const superAttach = super.attach(element);
    if (this.refs.input) {
      this.addEventListener(this.refs.input, 'input', (event) => {
        this.setValue(event.target.value);
      });
    }
    return superAttach;
  }

  getValue() {
    return this.dataValue;
  }

  setValue(value, flags) {
    //if (!value) return;

    if (this.refs.input) {
      this.refs.input.value = value;
    }
    return super.setValue(value, flags);
  }
}
