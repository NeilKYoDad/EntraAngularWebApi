import { FormioAppConfig } from '@formio/angular';

export const AppConfig = {
  appUrl: 'https://uvdyehktuzwoemj.form.io',
  apiUrl: 'https://api.form.io'
};

export const FormioAppConfigProvider = {
  provide: FormioAppConfig,
  useValue: AppConfig
};
