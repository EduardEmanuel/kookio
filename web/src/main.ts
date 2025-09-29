import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';

import { logger } from '@kookio/utils';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => {
  logger.error(err, '❌ Error bootstrapping application:');
});
