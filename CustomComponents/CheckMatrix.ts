// @ts-nocheck
import { Components } from 'formiojs';
const FieldComponent = (Components as any).components.field;


export default class InputHistory extends FieldComponent {

  public static builderInfo = {
    title: 'Input History',
    group: 'basic',
    icon: 'fa fa-table',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#table',
    schema: InputHistory.schema(),
  };

  public static schema() {
    return FieldComponent.schema({
      type: 'inputhistory',
      numCols: 3,
    });
  }
  private checks: any;
  private component: any;
  private renderTemplate: any;
  private loadRefs: any;
  private addEventListener: any;
  private refs: any;
  private updateValue: any;
  private checks: any[][];
  constructor(component, options, data) {
    super(component, options, data);
  }

  /**
   * Render returns an html string of the fully rendered component.
   *
   * @param children - If this class is extendended, the sub string is passed as children.
   * @returns {string}
   */
  public render(children) {
    // Render table structure as in b.html
    // Render as a single flex line, matching b.html
    let html = `<div class="form-line">`;
    // Use the label from the Formio template
    // if (this.component.label) {
    //   html += `<label for="newDay">${this.component.label}</label>`;
    // }
    html += `<table style="margin:0;">`;
    html += `<tr>`;

    // Dynamically generate header values: show history if present
    let history = [];
    // Try to get history from this.data.history (Formio passes only the value for this field)
    if (this.data && Array.isArray(this.data.history)) {
      history = this.data.history;
    }
    // Defensive: fallback to options.data if available (for preview or builder mode)
    else if (
      this.options &&
      this.options.data &&
      this.options.data[this.component.key] &&
      Array.isArray(this.options.data[this.component.key].history)
    ) {
      history = this.options.data[this.component.key].history;
    }
    for (let j = 0; j < this.component.numCols; j++) {
      html += `<td>${typeof history[j] !== 'undefined' ? history[j] : ''}</td>`;
    }

    // Set the newDay input value from previous submission if available
    let newDayValue = '';
    if (this.dataValue && this.dataValue.day !== undefined) {
      newDayValue = this.dataValue.day;
    } else if (this.data && typeof this.data.day !== 'undefined') {
      newDayValue = this.data.day;
    }
    html += `<td><input type="number" id="newDay" name="newDay" placeholder="Enter day number" style="margin:0;" value="${newDayValue}"></td>`;
    html += `</tr>`;

    // Render the history row if present (reuse the same 'history' variable)
    if (history.length) {
      html += '<tr>';
      for (let j = 0; j < this.component.numCols; j++) {
        html += `<td>${typeof history[j] !== 'undefined' ? history[j] : ''}</td>`;
      }
      html += '<td><em>History</em></td>';
      html += '</tr>';
    }

    html += `</table>`;
    html += `</div>`;
    return super['render'](html);
  }

  
  refKey(i: number, j: number) {
    return `${this['component'].key}-${i}-${j}`;
  }

  /**
   * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
   * elements to attach functionality to.
   *
   * @param element
   * @returns {Promise}
   */
  public attach(element) {
    const refs = {};
    for (let i = 0; i < this.component.numRows; i++) {
      refs[`${this.component.key}-${i}`] = 'multiple';
    }
    // Add ref for the day input
    refs['newDay'] = 'single';

    this.loadRefs(element, refs);

    this.checks = [];
    for (let i = 0; i < this.component.numRows; i++) {
      this.checks[i] = Array.prototype.slice.call(this.refs[`${this.component.key}-${i}`], 0);
      this.checks[i].forEach((input) => {
        this.addEventListener(input, 'click', () => this.updateValue());
      });
    }

    // Attach event for the day number input
    if (this.refs['newDay']) {
      this.addEventListener(this.refs['newDay'], 'input', () => this.updateValue());
    }

    // Ensure value is initialized so day is always included in submission
    this.updateValue();
    // Allow basic component functionality to attach like field logic and tooltips.
    return super.attach(element);
  }


  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  public getValue() {
    // Only return the day value for submission
    return this.dataValue && typeof this.dataValue.day !== 'undefined' ? { day: this.dataValue.day } : { day: null };
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  public setValue(value) {
    if (!value) {
      return;
    }
    // Store value in dataValue so Formio can access it on submit
    this.dataValue = value;
    // Set the day value if present
    if (this.refs && this.refs['newDay'] && value.day !== undefined) {
      this.refs['newDay'].value = value.day;
    }
    // Redraw the component to update the table if data changes
    if (typeof this.redraw === 'function') {
      //this.redraw();
    }
  }

  /**
   * Ensure updateValue sets the value and triggers change for both matrix and day input.
   */
  updateValue() {
    // Only update the day value from the input
    let day = null;
    if (this.refs && this.refs['newDay']) {
      const val = this.refs['newDay'].value;
      day = val !== '' ? Number(val) : null;
    }
    // Set the value on the component and update dataValue
    this.setValue({ day });
    // Notify Formio of the change
    this.triggerChange();
  }
}