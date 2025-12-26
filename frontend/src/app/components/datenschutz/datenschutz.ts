import { CommonModule } from "@angular/common";
import { Component,HostBinding } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: "app-datenschutz",
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: "./datenschutz.html",
  styleUrls: ["./datenschutz.scss"]
})
export class Datenschutz {
    @HostBinding("class.dark-theme") isDarkTheme = false;

  currentLang: "de" | "en" = "de";

privacyContent = {
  de: {
    title: "Datenschutzerklärung Devora",
    sections: [
      {
        heading: "1. Verantwortlicher",
        content: [
          "Verantwortlich für die Datenverarbeitung auf dieser Website ist:",
          "Devora GmbH\nMusterstraße 12\n12345 Berlin, Deutschland\nE-Mail: kontakt@devora.de",
          "Vertreten durch die Geschäftsführung: Zayneb Sallami, Max Mustermann"
        ]
      },
      {
        heading: "2. Allgemeine Hinweise zur Datenverarbeitung",
        content: [
          "Wir verarbeiten personenbezogene Daten (z. B. Name, Adresse, E-Mail-Adresse) ausschließlich im Einklang mit der DSGVO. Die Verarbeitung erfolgt nur, wenn:",
          "• Sie eingewilligt haben",
          "• sie zur Vertragserfüllung erforderlich ist",
          "• wir rechtlich dazu verpflichtet sind",
          "• oder ein berechtigtes Interesse vorliegt"
        ]
      },
      {
        heading: "3. Hosting und Server-Logfiles",
        content: [
          "Unsere Website wird bei einem externen Anbieter gehostet. Beim Besuch werden automatisch folgende Daten gespeichert:",
          "• IP-Adresse",
          "• Datum und Uhrzeit",
          "• Besuchte Seite / Ressource",
          "• Browsertyp und -version",
          "• Betriebssystem",
          "Diese Daten dienen der Sicherheit und werden regelmäßig gelöscht.",
          "Unsere Server befinden sich in Deutschland, sodass die Daten den europäischen Datenschutzstandards unterliegen."
        ]
      },
      {
        heading: "4. Cookies",
        content: [
          "Unsere Website nutzt Cookies zur Funktionalität und Analyse der Nutzung.",
          "• Notwendige Cookies: Unverzichtbar für den Betrieb der Website.",
          "• Analyse-/Marketing-Cookies: Nur mit Ihrer Zustimmung.",
          "Sie können Cookies jederzeit über die Browser-Einstellungen deaktivieren."
        ]
      },
      {
        heading: "5. Kontaktformular & Kommunikation",
        content: [
          "Wenn Sie unser Kontaktformular nutzen oder uns direkt kontaktieren, speichern wir Ihre Angaben (Name, Firma, E-Mail, Projektinformationen) zur Bearbeitung Ihrer Anfrage.",
          "Die Daten werden ohne Ihre Zustimmung nicht weitergegeben und nach Abschluss der Kommunikation gelöscht, soweit keine gesetzlichen Aufbewahrungspflichten bestehen."
        ]
      },
      {
        heading: "6. Verarbeitung von Kunden- und Vertragsdaten",
        content: [
          "Wir verarbeiten personenbezogene Daten zur Erfüllung unserer vertraglichen Pflichten und zur Auftragsabwicklung (z. B. Projektplanung, Rechnungsstellung)."
        ]
      },
      {
        heading: "7. Drittanbieter & Tools",
        content: [
          "Falls wir Analyse-Tools oder Zahlungsanbieter einsetzen, werden wir transparent informieren und ggf. Ihre Zustimmung einholen.",
          "(Aktuell sind keine Drittanbieter-Tools aktiv.)"
        ]
      },
      {
        heading: "8. Speicherdauer",
        content: [
          "Personenbezogene Daten werden nur so lange gespeichert, wie es für den Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen."
        ]
      },
      {
        heading: "9. Ihre Rechte",
        content: [
          "Sie haben das Recht auf:",
          "• Auskunft über gespeicherte Daten",
          "• Berichtigung falscher Daten",
          "• Löschung Ihrer Daten",
          "• Einschränkung der Verarbeitung",
          "• Widerspruch gegen die Verarbeitung",
          "• Datenübertragbarkeit",
          "• Beschwerde bei einer Datenschutzbehörde"
        ]
      },
      {
        heading: "10. Datensicherheit",
        content: [
          "Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten vor Manipulation, Verlust oder unbefugtem Zugriff zu schützen."
        ]
      },
      {
        heading: "11. Änderungen der Datenschutzerklärung",
        content: [
          "Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um geänderten rechtlichen oder technischen Anforderungen gerecht zu werden."
        ]
      }
    ]
  },
  en: {
    title: "Privacy Policy Devora",
    sections: [
      {
        heading: "1. Responsible",
        content: [
          "Responsible for data processing on this website is:",
          "Devora GmbH\nMusterstraße 12\n12345 Berlin, Germany\nEmail: kontakt@devora.de",
          "Represented by the management: Zayneb Sallami, Max Mustermann"
        ]
      },
      {
        heading: "2. General Information on Data Processing",
        content: [
          "We process personal data (name, address, email) only in accordance with GDPR. Processing occurs only if:",
          "• You have given consent",
          "• It is necessary for contract fulfillment",
          "• We are legally obligated",
          "• Or a legitimate interest exists"
        ]
      },
      {
        heading: "3. Hosting and Server Logfiles",
        content: [
          "Our website is hosted externally. The server automatically stores:",
          "• IP address",
          "• Date and time of access",
          "• Visited page / resource",
          "• Browser type and version",
          "• Operating system",
          "These data serve security purposes and are regularly deleted.",
          "Our servers are in Germany, so data is subject to strict European GDPR standards."
        ]
      },
      {
        heading: "4. Cookies",
        content: [
          "We use cookies for basic functionality and usage analysis.",
          "• Necessary cookies: Required for website operation.",
          "• Analytics/marketing cookies: Only after your consent.",
          "You can disable cookies anytime in your browser settings."
        ]
      },
      {
        heading: "5. Contact Form & Communication",
        content: [
          "If you use our contact form or contact us directly, we store your info (name, company, email, project details) to process your request.",
          "Data is not shared without consent and deleted after communication ends, unless legally required."
        ]
      },
      {
        heading: "6. Processing Customer and Contract Data",
        content: [
          "We process personal data to fulfill contractual obligations and manage orders (e.g., project planning, invoicing)."
        ]
      },
      {
        heading: "7. Third-party Providers and Tools",
        content: [
          "If we use analytics or payment providers in the future, we will inform you and request consent if needed.",
          "(Currently, no third-party tools are active.)"
        ]
      },
      {
        heading: "8. Data Retention",
        content: [
          "Personal data is only stored as long as necessary for the purpose or required by law."
        ]
      },
      {
        heading: "9. Your Rights",
        content: [
          "You have the right to:",
          "• Access your stored data",
          "• Rectify incorrect data",
          "• Delete your data",
          "• Restrict processing",
          "• Object to processing",
          "• Data portability",
          "• File a complaint with a data protection authority"
        ]
      },
      {
        heading: "10. Data Security",
        content: [
          "We implement technical and organizational measures to protect your data from manipulation, loss, or unauthorized access."
        ]
      },
      {
        heading: "11. Changes to Privacy Policy",
        content: [
          "We reserve the right to update this policy to meet changed legal or technical requirements."
        ]
      }
    ]
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
    return this.privacyContent[this.currentLang];
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
