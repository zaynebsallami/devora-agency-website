import { Component, HostBinding, ChangeDetectorRef } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule]
})
export class Contact {
  @HostBinding("class.dark-theme") isDarkTheme = false;
errorMessage = '';

  currentLang: 'de' | 'en' = 'de';
  isLoading = false;
  successMessage = '';
  
  contactData = {
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    privacyAccepted: false
  };

  contactErrors = {
    name: '',
    email: '',
    projectType: '',
    message: '',
    privacyAccepted: ''
  };

  projectTypes = {
    de: [
      'Projektanfrage',
      'Individuelle Softwareentwicklung',
      'Beratung / Erstgespräch',
      'Support / Technische Frage',
      'Allgemeine Anfrage'
    ],
    en: [
      'Project request',
      'Custom software development',
      'Consultation / First meeting',
      'Support / Technical question',
      'General inquiry'
    ]
  };

  translations = {
  de: {
    formTitle: 'Kontakt Devora',
    name: 'Ihr Name *',
    company: 'Firma',
    email: 'E-Mail *',
    phone: 'Telefon',
    projectType: 'Art des Projekts *',
    message: 'Ihre Nachricht *',
    privacy: 'Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzrichtlinie zu. *',
    send: 'Absenden',
    sending: 'Wird gesendet…',
    requiredName: 'Bitte geben Sie Ihren Namen ein',
    requiredEmail: 'Bitte geben Sie Ihre E-Mail-Adresse ein',
    requiredProjectType: 'Bitte wählen Sie eine Projektart',
    requiredMessage: 'Bitte geben Sie eine Nachricht ein',
    requiredPrivacy: 'Bitte akzeptieren Sie die Datenschutzrichtlinie',
    success: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.',
    error: 'Leider gab es einen Fehler beim Senden Ihrer Nachricht.',
    backHome: 'Zur Startseite'
  },
  en: {
    formTitle: 'Contact Devora',
    name: 'Your Name *',
    company: 'Company',
    email: 'Email *',
    phone: 'Phone',
    projectType: 'Project Type *',
    message: 'Your Message *',
    privacy: 'I agree to the processing of my data according to the Privacy Policy. *',
    send: 'Send',
    sending: 'Sending…',
    requiredName: 'Please enter your name',
    requiredEmail: 'Please enter your email',
    requiredProjectType: 'Please select a project type',
    requiredMessage: 'Please enter a message',
    requiredPrivacy: 'Please accept the privacy policy',
    success: 'Thank you! Your message has been sent successfully.',
    error: 'Oops! There was an error sending your message.',
    backHome: 'Back to Home'
  }
};


  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.currentLang);
  }

  get t() {
    return this.translations[this.currentLang];
  }

  switchLang(event: Event) {
    const value = (event.target as HTMLSelectElement).value as 'de' | 'en';
    this.currentLang = value;
  }

  switchTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle("dark-theme", this.isDarkTheme);
    this.cdr.detectChanges();
  }

  get logoSrc() {
    return this.isDarkTheme ? 'assets/dark-logo.png' : 'assets/light-logo.png';
  }

onSubmit() {
  // Reset errors
  this.contactErrors = { name:'', email:'', projectType:'', message:'', privacyAccepted:'' };
  this.successMessage = '';

  // Validate
  let hasError = false;
  if (!this.contactData.name) { this.contactErrors.name = this.t.requiredName; hasError = true; }
  if (!this.contactData.email) { this.contactErrors.email = this.t.requiredEmail; hasError = true; }
  if (!this.contactData.projectType) { this.contactErrors.projectType = this.t.requiredProjectType; hasError = true; }
  if (!this.contactData.message) { this.contactErrors.message = this.t.requiredMessage; hasError = true; }
  if (!this.contactData.privacyAccepted) { this.contactErrors.privacyAccepted = this.t.requiredPrivacy; hasError = true; }

  if (hasError) return;

  this.isLoading = true;

this.contactService.send(this.contactData).subscribe({
  next: (res: any) => {
    this.isLoading = false;
    this.successMessage = res.message; // ✅ use message from backend
    this.contactData = {
      name:'', company:'', email:'', phone:'', projectType:'', message:'', privacyAccepted:false
    };
  },
  error: () => {
    this.isLoading = false;
    this.errorMessage = this.t.error;
  }
});



}


}
