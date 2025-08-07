// @ts-nocheck
import { Components } from 'formiojs';
const FieldComponent = (Components as any).components.field;


export default class CheckMatrix extends FieldComponent {

  public static builderInfo = {
    title: 'Check Matrix',
    group: 'basic',
    icon: 'fa fa-table',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#table',
    schema: CheckMatrix.schema(),
  };

  public static schema(overrides = {}) {
    return FieldComponent.schema(Object.assign({
      type: 'checkmatrix',
      key: 'checkMatrix', // default key, can be overridden
      numRows: 3,
      numCols: 3,
    }, overrides));
  }
  private checks: any;
  private foo: string;
  private component: any;
  private renderTemplate: any;
  private loadRefs: any;
  private addEventListener: any;
  private refs: any;
  private updateValue: any;
  private checks: any[][];
  constructor(component, options, data) {
    super(component, options, data);
    this.foo = 'bar';
  }

  /**
   * Render returns an html string of the fully rendered component.
   *
   * @param children - If this class is extendended, the sub string is passed as children.
   * @returns {string}
   */
  public render(children) {
    // Provide a simple template for the checkmatrix component
    let html = `<table class="${this.tableClass}">`;
    for (let i = 0; i < this['component'].numRows; i++) {
      html += '<tr>';
      for (let j = 0; j < this['component'].numCols; j++) {
        html += `<td><input type="checkbox" ref="${this.refKey(i, j)}"></td>`;
      }
      html += '</tr>';
    }
    html += '</table>';
    return super['render'](html);
  }

  
  refKey(i: number, j: number) {
    return `${this['component'].key || 'checkMatrix'}-${i}-${j}`;
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
      refs[`${this.component.key || 'checkMatrix'}-${i}`] = 'multiple';
    }

    this.loadRefs(element, refs);

    this.checks = [];
    for (let i = 0; i < this.component.numRows; i++) {
      this.checks[i] = Array.prototype.slice.call(this.refs[`${this.component.key}-${i}`], 0);

      // Attach click events to each input in the row
      this.checks[i].forEach((input) => {
        this.addEventListener(input, 'click', () => this.updateValue());
      });
    }

    // Allow basic component functionality to attach like field logic and tooltips.
    return super.attach(element);
  }

  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  public getValue() {
    const value = [];
    for (const rowIndex of Object.keys(this.checks)) {
      const row = this.checks[rowIndex];
      value[rowIndex] = [];
      for (const colIndex of Object.keys(row)) {
        const col = row[colIndex];
        value[rowIndex][colIndex] = !!col.checked;
      }
    }
    return value;
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
    for (const rowIndex of Object.keys(this.checks)) {
      const row = this.checks[rowIndex];
      if (!value[rowIndex]) {
        break;
      }
      for (const colIndex of Object.keys(row)) {
        const col = row[colIndex];
        if (!value[rowIndex][colIndex]) {
          return false;
        }
        const checked = value[rowIndex][colIndex] ? 1 : 0;
        col.value = checked;
        col.checked = checked;
      }
    }
  }
}