// Entry wrapper to register the component with Formio when loaded in the browser
// Assumes formiojs is available globally as Formio in the Form.io portal
import InputWithHistory from './InputWithHistory';

(function register() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w: any = window as any;
  const Formio = w.Formio;
  if (!Formio || !Formio.Components) {
    console.error('Formio not found on window. Ensure this bundle is loaded inside Form.io.');
    return;
  }

  // Register under its type from schema
  const type = (InputWithHistory as any).schema().type || 'inputwithhistory';
  Formio.Components.addComponent(type, InputWithHistory);

  // Also expose on window for debugging
  w.InputWithHistory = InputWithHistory;
})();
