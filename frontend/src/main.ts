import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home';
import { Impressum } from './app/components/impressum/impressum';
import { Datenschutz } from './app/components/datenschutz/datenschutz';
import { Contact } from './app/components/contact/contact';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

// Define your client-side routes

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'impressum', component: Impressum },
  { path: 'datenschutz', component: Datenschutz },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' } // fallback
];
bootstrapApplication(App, {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes), // <-- add this!
    ...TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'de',
    }).providers!,
  ],
}).catch(err => console.error(err));
