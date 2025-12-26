import { Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ContactService } from "../../services/contact.service";
import { CookieBannerComponent } from "../cookie-banner/cookie-banner";
import { CookieService } from "../../services/cookie";
import { RouterModule } from "@angular/router";
import { ChangeDetectorRef } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
  open?: boolean;
}

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterModule, CookieBannerComponent],
  templateUrl: "./home.html",
  styleUrls: ["./home.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  @HostBinding("class.dark-theme") isDarkTheme = false;

  currentLang = "de";
  isLoading = false;
  isContactFormOpen = false;
  translationsLoaded = false;

  stats = [
    { valueKey: "statsValues.projectsCompleted", label: "stats.projectsCompleted" },
    { valueKey: "statsValues.happyClients", label: "stats.happyClients" },
    { valueKey: "statsValues.yearsExperience", label: "stats.yearsExperience" },
    { valueKey: "statsValues.averageIncrease", label: "stats.averageIncrease" },
  ];

  services = [
    { icon: "🔍", title: "serviceAnalysisTitle", text: "serviceAnalysisText" },
    { icon: "💻", title: "serviceDevelopmentTitle", text: "serviceDevelopmentText" },
    { icon: "🎧", title: "serviceSupportTitle", text: "serviceSupportText" },
  ];

  portfolio = [
    { img: "../assets/up.jpeg", title: "portfolio.project1", category: "portfolio.category.web" },
    { img: "../assets/p1.jpeg", title: "portfolio.project2", category: "portfolio.category.design" },
    { img: "../assets/shop.png", title: "portfolio.project3", category: "portfolio.category.ecommerce" },
    { img: "../assets/scg1.jpeg", title: "portfolio.project4", category: "portfolio.category.webapp" },
  ];

  lightboxOpen = false;
  lightboxImage = "";
  lightboxIndex = 0;

  testimonials = [
    { quote: "testimonials.q1", name: "Anna M.", role: "testimonials.r1" },
    { quote: "testimonials.q2", name: "Markus T.", role: "testimonials.r2" },
    { quote: "testimonials.q3", name: "Sophie K.", role: "testimonials.r3" },
  ];
  activeTestimonial = 0;
  testiInterval: any;

  contactData = {
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  };

  // FAQ
  faqItems: FaqItem[] = [];
  faqTranslations: any = {
    de: {
      faqTitle: "Häufige Fragen (FAQ)",
      faqSubtitle: "Antworten auf die häufigsten Fragen zu unserer Zusammenarbeit.",
      faqOpenQuestion: "Noch Fragen offen?",
      faqCTA: "Dann schreib uns – wir sind nur eine Nachricht entfernt",
      faq: [
        {
          question: "Was macht ihr anders als große Agenturen?",
          answer:
            "Wir sind klein, fokussiert und nahbar. Bei uns bist du keine Nummer im System, wir hören zu, denken mit und setzen deine Idee so um, wie sie wirklich zu dir passt.",
        },
        {
          question: "Entwickelt ihr nur für bestimmte Branchen?",
          answer:
            "Nein. Unser Ansatz ist branchenunabhängig. Ob Dienstleister, Start-up oder etabliertes Unternehmen, wir passen unsere Lösungen individuell an deine Anforderungen an.",
        },
        {
          question: "Wie läuft die Zusammenarbeit ab?",
          answer:
            "Ganz unkompliziert: Wir starten mit einem persönlichen Gespräch, in dem wir deine Ziele und Ideen verstehen. Danach entwickeln wir einen klaren Fahrplan und setzen Schritt für Schritt um – immer transparent und auf Augenhöhe.",
        },
        {
          question: "Was kostet die Zusammenarbeit mit euch?",
          answer:
            "Das hängt vom Projektumfang ab. Wir erstellen dir ein individuelles Angebot, das genau zu deinem Bedarf passt – ohne versteckte Kosten.",
        },
        {
          question: "Was, wenn ich noch gar keine genaue Vorstellung habe?",
          answer:
            "Kein Problem! Wir helfen dir, deine Idee zu strukturieren und gemeinsam herauszufinden, welche Lösung den größten Mehrwert bringt.",
        },
      ],
    },
    en: {
      faqTitle: "Frequently Asked Questions (FAQ)",
      faqSubtitle: "Answers to the most common questions about working with us.",
      
      faqOpenQuestion: "Any questions left?",
      faqCTA: "Then write us – we are just a message away",
      faq: [
        {
          question: "What makes you different from big agencies?",
          answer:
            "We are small, focused, and approachable. With us, you are not just a number. We listen, think along, and implement your idea the way it truly fits you.",
        },
        {
          question: "Do you develop only for specific industries?",
          answer:
            "No. Our approach is industry-independent. Whether service providers, start-ups, or established companies, we tailor our solutions to your requirements.",
        },
        {
          question: "How does collaboration work?",
          answer:
            "Simple: We start with a personal conversation to understand your goals and ideas. Then we create a clear roadmap and implement step by step – always transparent and at eye level.",
        },
        {
          question: "How much does it cost to work with you?",
          answer:
            "It depends on the project scope. We provide a custom offer tailored to your needs – no hidden costs.",
        },
        {
          question: "What if I don’t have a clear idea yet?",
          answer:
            "No problem! We help you structure your idea and find the solution that brings the most value.",
        },
      ],
    },
  };
aboutTranslations: any = {
  de: {
    aboutTitle: "Warum Devora?",
    aboutLead: `Devora ist eine fiktive Digitalagentur, die im Rahmen eines Portfolio-Projekts entstanden ist.

Der Fokus liegt auf moderner Webentwicklung, klarer Architektur und benutzerfreundlichem Design. Dieses Projekt zeigt, wie reale Agenturprozesse technisch umgesetzt werden können – von der Idee bis zur fertigen Anwendung.

Devora steht für sauberen Code, strukturierte Lösungen und zeitgemäße Technologien.`,
   
    aboutSub: `Dieses Projekt dient ausschließlich Demonstrations- und Lernzwecken.`,
    
    contactButton: "Projekt ansehen"
  },
  en: {
    aboutTitle: "Why Devora?",
    aboutLead: `Devora is a fictional digital agency created as part of a professional portfolio project.

The focus is on modern web development, clean architecture, and user-centered design. This project demonstrates how real-world agency workflows can be implemented technically – from concept to deployment.

Devora represents clean code, structured solutions, and modern technologies.`,

    aboutSub: `This project is intended solely for demonstration and educational purposes.`,

    contactButton: "View Project"
  }
};

footerTranslations: any = {
  de: {
    rights: "Alle Rechte vorbehalten",
    contact: "Kontakt: kontakt@devora.de",
    impressum: "Impressum",
    datenschutz: "Datenschutzerklärung"
  },
  en: {
    rights: "All rights reserved",
    contact: "Contact: kontakt@devora.de",
    impressum: "Imprint",
    datenschutz: "Privacy Policy"
  }
};



  constructor(
    private translate: TranslateService,
    private contactService: ContactService,
    private cookieService: CookieService,private cdr: ChangeDetectorRef
  ) {
    this.translate.setDefaultLang(this.currentLang);

    // Ensure translations are loaded before app renders
    this.translate.onLangChange.subscribe(() => {
      this.translationsLoaded = true;
      this.updateFAQ();
    });

    this.translate.use(this.currentLang).subscribe({
      next: () => {
        this.translationsLoaded = true;
        this.updateFAQ();
      },
      error: (error) => {
        console.error("Translation loading failed:", error);
        this.translationsLoaded = true;
        this.updateFAQ();
      },
    });
  }

  ngOnInit() {
    this.updateFAQ();
  }

  ngOnDestroy() {
    this.stopTestimonialAutoplay();
  }
// Getter for current footer translations
get footer() {
  return this.footerTranslations[this.currentLang];
}

  // FAQ update
  updateFAQ() {
    const langData = this.faqTranslations[this.currentLang];
    this.faqItems = langData.faq.map((item: FaqItem) => ({ ...item, open: false }));
  }

  switchTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle("dark-theme", this.isDarkTheme);
    this.cdr.detectChanges();
  }

  switchLang(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.currentLang = select.value;

    this.translationsLoaded = false;
    this.translate.use(this.currentLang).subscribe({
      next: () => {
        this.translationsLoaded = true;
        this.updateFAQ();
      },
      error: () => {
        this.translationsLoaded = true;
        this.updateFAQ();
      },
    });
  }

  navigateToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

   successMessage = "";


openLightbox(src: string, title: string | null = null) {
  this.lightboxOpen = true
  this.lightboxImage = src
  this.lightboxIndex = this.portfolio.findIndex((p) => p.img === src)
  // optionally use title if you want: console.log(title)
}


  closeLightbox() {
    this.lightboxOpen = false;
  }

  prevLightbox() {
    this.lightboxIndex = (this.lightboxIndex - 1 + this.portfolio.length) % this.portfolio.length;
    this.lightboxImage = this.portfolio[this.lightboxIndex].img;
  }

  nextLightbox() {
    this.lightboxIndex = (this.lightboxIndex + 1) % this.portfolio.length;
    this.lightboxImage = this.portfolio[this.lightboxIndex].img;
  }

  startTestimonialAutoplay() {
    this.testiInterval = setInterval(() => {
      this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
    }, 5000);
  }

  stopTestimonialAutoplay() {
    if (this.testiInterval) clearInterval(this.testiInterval);
  }

  prevTestimonial() {
    this.stopTestimonialAutoplay();
    this.activeTestimonial = (this.activeTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
    this.startTestimonialAutoplay();
  }

  nextTestimonial() {
    this.stopTestimonialAutoplay();
    this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
    this.startTestimonialAutoplay();
  }
  get logoSrc() {
  return this.isDarkTheme ? 'assets/dark-logo.png' : 'assets/light-logo.png';
}
// In your header component TypeScript
isMobileMenuOpen = false;

toggleMobileMenu() {
  this.isMobileMenuOpen = !this.isMobileMenuOpen;
  
  // Prevent body scrolling when menu is open
  if (this.isMobileMenuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}

closeMobileMenu() {
  this.isMobileMenuOpen = false;
  document.body.style.overflow = 'auto';
}

// Close menu when clicking on nav links
onNavClick() {
   document.body.style.overflow = 'auto';
  this.isMobileMenuOpen = false; 
}

}
