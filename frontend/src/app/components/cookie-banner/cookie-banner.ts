import { Component, OnInit } from '@angular/core';
import { CookieService, ConsentType } from '../../services/cookie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./cookie-banner.scss']
})
export class CookieBannerComponent implements OnInit {
  isVisible = true;
  settingsOpen = false;
  analyticsChecked = false;
  currentLang: 'de' | 'en' = 'de';

  cookieTranslations = {
    de: { title: 'Wir verwenden Cookies', message: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.', acceptAll: 'Alle akzeptieren', essentialOnly: 'Nur essenzielle', preferences: 'Einstellungen', settingsTitle: 'Cookie-Einstellungen', essentialTitle: 'Essenzielle Cookies', essentialDesc: 'Diese Cookies sind erforderlich für die Grundfunktionen.', analyticsTitle: 'Analytics Cookies', analyticsDesc: 'Diese Cookies helfen uns, die Website zu verbessern.', savePrefs: 'Einstellungen speichern', revokeConsent: 'Einwilligung widerrufen', settingsBtn: 'Einstellungen' },
    en: { title: 'We use cookies', message: 'We use cookies to improve your experience.', acceptAll: 'Accept All', essentialOnly: 'Essential Only', preferences: 'Preferences', settingsTitle: 'Cookie Settings', essentialTitle: 'Essential Cookies', essentialDesc: 'Required for basic website functionality.', analyticsTitle: 'Analytics Cookies', analyticsDesc: 'Help us improve our website.', savePrefs: 'Save Preferences', revokeConsent: 'Revoke Consent', settingsBtn: 'Settings' }
  };

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    const consent = this.cookieService.getConsent();
    if (consent.accepted) {
      this.isVisible = false;
      this.analyticsChecked = consent.type === 'all';
      this.loadAnalytics(consent.type!);
    }
  }

  // --- Banner buttons ---
  acceptAll() { this.saveConsent('all'); }
  acceptEssential() { this.saveConsent('essential'); }

  // --- Settings ---
  openSettings() {
    this.settingsOpen = true;
    this.isVisible = true; // make overlay visible
  }

  savePreferences() {
    const type: ConsentType = this.analyticsChecked ? 'all' : 'essential';
    this.saveConsent(type);
    this.settingsOpen = false;
  }

  revokeConsent() {
    this.cookieService.revokeConsent();
    localStorage.removeItem('cookie-consent');
    this.isVisible = true;
    this.analyticsChecked = false;

    // Log revoked consent to backend
    this.cookieService.logConsent('revoked').subscribe({
      next: () => console.log('Consent revoked logged'),
      error: err => console.error('Failed to revoke consent', err)
    });

    this.removeAnalytics();
  }

  private saveConsent(type: ConsentType) {
    this.cookieService.setConsent(type === 'all' ? 'all' : 'essential');
    this.cookieService.logConsent(type).subscribe({
      next: () => console.log('Consent logged:', type),
      error: err => console.error('Failed to log consent', err)
    });

    localStorage.setItem('cookie-consent', type);
    this.isVisible = false;
    this.analyticsChecked = type === 'all';
    this.loadAnalytics(type);
  }

  private loadAnalytics(type: ConsentType) {
    if (type !== 'all') return;
    if ((window as any).gtagLoaded) return; // avoid duplicate script

    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: any[]) => { window.dataLayer.push(args); };
    window.gtag('js', new Date());
    window.gtag('config', 'GA_MEASUREMENT_ID');
    (window as any).gtagLoaded = true;
  }

  private removeAnalytics() {
    Array.from(document.getElementsByTagName('script'))
      .filter(s => s.src.includes('googletagmanager'))
      .forEach(s => s.remove());

    window.gtag = (...args: any[]) => {};
    window.dataLayer = [];
    (window as any).gtagLoaded = false;
  }
}
