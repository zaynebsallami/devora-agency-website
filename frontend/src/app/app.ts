import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  @HostBinding('class.dark-theme') isDarkTheme = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
