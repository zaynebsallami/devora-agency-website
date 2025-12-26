import { CommonModule } from "@angular/common";
import { Component,HostBinding } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: "app-impressum",
  standalone: true,
  imports: [TranslateModule,CommonModule,RouterModule],
  templateUrl: "./impressum.html",
  styleUrls: ["./impressum.scss"]
})
export class Impressum {
  currentLang: "de" | "en" = "de";
  @HostBinding("class.dark-theme") isDarkTheme = false;

  // Translations directly in TS
 impressum = {
  de: {
    title: "Impressum Devora",
    legal: "Angaben gemäß § 5 TMG / § 55 RStV",
    company: `Devora GmbH
Musterstraße 12
12345 Berlin, Deutschland`,
    managing: ["Zayneb Sallami", "Max Mustermann"],
    contact: `Telefon: +49 30 12345678
E-Mail: kontakt@devora.de
Website: www.devora.de`,
    register: `Eintragung im Handelsregister.
Registergericht: Amtsgericht Berlin
Registernummer: HRB 987654`,
    ustid: "Umsatzsteuer-Identifikationsnummer: DE123456789",
    wirtschaftsid: "Wirtschafts-Identifikationsnummer: DE987654321",
    responsible: `Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
Zayneb Sallami, Max Mustermann
Musterstraße 12
12345 Berlin`,
    disclaimerTitle: "Haftungsausschluss",
    liability: [
      `1. Haftung für Inhalte
Als Diensteanbieter sind wir für eigene Inhalte auf dieser Website nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.`,
      `2. Haftung für Links
Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.`,
      `3. Urheberrecht
Die von uns erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Nutzung außerhalb der Grenzen des Urheberrechts bedarf der schriftlichen Zustimmung des jeweiligen Autors.`
    ],
    privacyNote: `Datenschutzhinweis
Details siehe Datenschutzerklärung (eigene Seite).

Wir nehmen den Schutz Ihrer Daten ernst. Personenbezogene Daten werden nur erhoben, verarbeitet und genutzt, wenn dies gesetzlich erlaubt ist oder Sie eingewilligt haben.`
    ,
    cookies: `Cookies & Tracking
Unsere Website verwendet Cookies und ähnliche Technologien, um Funktionen bereitzustellen und die Nutzung zu analysieren. Mit der Nutzung dieser Website erklären Sie sich damit einverstanden. Details finden Sie in unserer Datenschutzerklärung.`
  },
  en: {
    title: "Imprint Devora",
    legal: "Information according to § 5 TMG / § 55 RStV",
    company: `Devora GmbH
Musterstraße 12
12345 Berlin, Germany`,
    managing: ["Zayneb Sallami", "Max Mustermann"],
    contact: `Phone: +49 30 12345678
Email: kontakt@devora.de
Website: www.devora.de`,
    register: `Registered in the commercial register.
Court: Amtsgericht Berlin
Registration number: HRB 987654`,
    ustid: "VAT ID: DE123456789",
    wirtschaftsid: "Economic ID: DE987654321",
    responsible: `Responsible for content:
Zayneb Sallami, Max Mustermann
Musterstraße 12
12345 Berlin`,
    disclaimerTitle: "Disclaimer",
    liability: [
      `1. Liability for content
As a service provider, we are responsible for our own content on this website according to general laws. We are not obliged to monitor transmitted or stored third-party information or investigate circumstances indicating illegal activity. Obligations to remove or block information under general laws remain unaffected.`,
      `2. Liability for links
Our website contains links to external third-party websites over which we have no control. The respective provider or operator is always responsible for the content of linked pages.`,
      `3. Copyright
The content and works created by us on this website are subject to German copyright law. Contributions from third parties are marked as such. Reproduction, editing, distribution, and any use beyond copyright limits require written consent from the respective author.`
    ],
    privacyNote: `Privacy notice
See Privacy Policy (separate page).

We take data protection seriously. Personal data is only collected, processed, and used if legally permitted or if you have consented.`
    ,
    cookies: `Cookies & Tracking
Our website uses cookies and similar technologies to provide functionality and analyze usage. By using this website, you agree to this. See our Privacy Policy for details.`
  }
};

translations = {
    de: {
      backHome: 'Zur Startseite'

    },
    en: {
      backHome: 'Back to home'
    }
  };
  get current() {
    return this.impressum[this.currentLang];
  }

  switchLang(lang: "de" | "en") {
    this.currentLang = lang;
  }
switchTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle("dark-theme", this.isDarkTheme);
    this.cdr.detectChanges();
  }
  constructor(public translate: TranslateService,private cdr: ChangeDetectorRef) {}
  get logoSrc() {
  return this.isDarkTheme ? 'assets/dark-logo.png' : 'assets/light-logo.png';
}
get t() {
    return this.translations[this.currentLang];
  }
}
