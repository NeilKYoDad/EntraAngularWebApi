/**
 * This file shows how to create a custom component.
 *
 * Get the base component class by referencing Formio.Components.components map.
 */
import { Formio } from '@formio/angular';
import { Components } from 'formiojs';
const FieldComponent = (Components as any).components.field;

/**
 * Here we will derive from the base component which all Form.io form components derive from.
 *
 * @param component
 * @param options
 * @param data
 * @constructor
 */

export default class DaveCheckMatrix extends (FieldComponent as any) {
  public checks: any[][];
  constructor(component: any, options: any, data: any) {
    super(component, options, data);
    this.checks = [];
  }


  static schema() {
    return FieldComponent.schema({
      type: 'checkmatrix',
      numRows: 3,
      numCols: 3
    });
  }

  static builderInfo = {
    title: 'Check Matrix',
    group: 'basic',
    icon: 'fa fa-table',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#table',
    schema: CheckMatrix.schema()
  }

  get tableClass() {
    let tableClass = 'table ';
    ['striped', 'bordered', 'hover', 'condensed'].forEach((prop) => {
      if (this['component'][prop]) {
        tableClass += `table-${prop} `;
      }
    });
    return tableClass;
  }

  get emptyValue() {
    return [];
  }

  public render() {
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
    return `${this['component'].key}-${i}-${j}`;
  }

  /**
   * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
   * elements to attach functionality to.
   *
   * @param element
   * @returns {Promise}
   */
  attach(element: any) {
    const refs: { [key: string]: string } = {};
    for (let i = 0; i < this['component'].numRows; i++) {
      for (let j = 0; j < this['component'].numCols; j++) {
        refs[this.refKey(i, j)] = 'single';
      }
    }
    this['loadRefs'](element, refs);
    for (let i = 0; i < this['component'].numRows; i++) {
      for (let j = 0; j < this['component'].numCols; j++) {
        this['addEventListener'](this['refs'][this.refKey(i, j)], 'click', () => this['updateValue']())
      }
    }
    return super['attach'](element);
  }

  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  getValue() {
    const value: any[][] = [];
    for (let i = 0; i < this['component'].numRows; i++) {
      value[i] = [];
      for (let j = 0; j < this['component'].numCols; j++) {
        if (this['refs'].hasOwnProperty(this.refKey(i,j))) {
          value[i][j] = !!this['refs'][this.refKey(i,j)].checked;
        }
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
  setValue(value: any): boolean {
    if (!value) {
      return false;
    }
    for (let i = 0; i < this['component'].numRows; i++) {
      for (let j = 0; j < this['component'].numCols; j++) {
        if (
          value.length > i &&
          value[i].length > j &&
          this['refs'].hasOwnProperty(this.refKey(i,j))
        ) {
          const ref = this['refs'][this.refKey(i,j)];
          const checked = value[i][j] ? 1 : 0;
          ref.value = checked;
          ref.checked = checked;
        }
      }
    }
    return true;
  }
}

