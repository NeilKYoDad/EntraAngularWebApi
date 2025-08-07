import { Formio } from '@formio/angular';

Formio.use({
  components: {
    fancyinput: FancyInput,
    inputhistory: InputHistory,
    anotherinput: AnotherInput
  }
});
console.log('Registered components:', (Formio as any).Components?.components);
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import InputHistory from 'CustomComponents/InputHistory';
import FancyInput from 'CustomComponents/FancyInput';
import AnotherInput from 'CustomComponents/AnotherInput';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
