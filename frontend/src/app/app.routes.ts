// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { Impressum } from './components/impressum/impressum';
import { Datenschutz } from './components/datenschutz/datenschutz';
import { Contact } from './components/contact/contact';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'impressum', component: Impressum },
  { path: 'datenschutz', component: Datenschutz },
    { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' } // fallback
];
