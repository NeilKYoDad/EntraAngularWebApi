// Paste this into your Form.io Portal → Project Settings → Custom Components

(function(Formio) {
    
  // Grab base Input component
  var Components = Formio.Components;
  var Input = Components.components.input;

  // Define your custom component
  class AnotherInput extends Input {
    // Add a simple editForm so appendText can be set in the Form Builder
    static editForm() {
      return [
        {
          key: 'display',
          components: [
            {
              type: 'textfield',
              key: 'label',
              label: 'Label',
              input: true
            },
            {
              type: 'textfield',
              key: 'appendText',
              label: 'Append Text',
              input: true
            }
          ]
        }
      ];
    }
    static schema(...extend) {
      return Input.schema({
        type: 'anotherinput',
        label: 'Another Input',
        key: 'anotherinput',
        appendText: '',
        history: []
      }, ...extend);
    }

    static get builderInfo() {
      return {
        title: 'My Another Input',
        icon: 'terminal',
        group: 'basic',
        documentation: '/userguide/#textfield',
        weight: 0,
        schema: AnotherInput.schema()
      };
    }

    constructor(component, options, data) {
      super(component, options, data);
    }

    init() {
      super.init();
    }

    get inputInfo() {
      return super.inputInfo;
    }

    render(content) {
      var input = this.inputInfo;
      return (
        '<div class="form-group formio-component-' + this.component.type + '">' +
          '<label for="' + input.attr.id + '">' + this.component.label + '</label>' +
          '<div class="input-group">' +
            '<input ' +
              'type="' + input.attr.type + '" ' +
              'class="' + input.attr.class + '" ' +
              'id="' + input.attr.id + '" ' +
              'name="' + input.attr.name + '" ' +
              'ref="input" ' +
            '/>' +
            '<div class="input-group-append">' +
              '<span class="input-group-text" ref="appendText">' +
                (this.component.appendText || '') +
              '</span>' +
            '</div>' +
            '<div class="history-list" style="margin-top:12px;">' +
              '<div ref="history" class="history-item">' + (this.component.history[0] || '') + '</div>' +
              '<div ref="history" class="history-item">' + (this.component.history[1] || '') + '</div>' +
              '<div ref="history" class="history-item">' + (this.component.history[2] || '') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }

    attach(element) {
      this.loadRefs(element, {
        input: 'single',
        appendText: 'single',
        history: 'multiple'
      });

      // Set appended text
      var dynamicText = (this.data && this.data.appendText) || this.component.appendText;
      if (this.refs.appendText) {
        this.refs.appendText.textContent = dynamicText;
      }

      // Populate history
      if (Array.isArray(this.component.history) && this.refs.history) {
        this.refs.history.forEach(function(el, idx) {
          el.textContent = this.component.history[idx] || '';
        }.bind(this));
      }

      // Wire up input → value
      this.addEventListener(this.refs.input, 'input', function(e) {
        this.setValue(e.target.value);
      }.bind(this));

      return super.attach(element);
    }

    detach() {
      return super.detach();
    }

    destroy() {
      return super.destroy();
    }

    normalizeValue(value, flags) {
      return super.normalizeValue(value, flags);
    }

    getValue() {
      return super.getValue();
    }

    setValue(value, flags) {
      // Handle object vs. primitive
      var val = (value && typeof value === 'object') ? value.value : value;
      var appendText = (value && value.appendText) || null;
      var history = (value && value.history) || [];

      var result = super.setValue(val, flags);

      if (appendText && this.refs.appendText) {
        this.refs.appendText.textContent = appendText;
      }
      if (Array.isArray(history) && this.refs.history) {
        this.refs.history.forEach(function(el, idx) {
          el.textContent = history[idx] || '';
        });
      }

      return result;
    }
  }

  // Register it
  Components.addComponent('inputwithhistory', AnotherInput);

})(window.Formio);
