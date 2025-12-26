import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ConsentType = 'all' | 'essential' | 'revoked';

@Injectable({ providedIn: 'root' })
export class CookieService {
  private apiUrl = 'https://nmc-backend-9gu9.onrender.com/api/cookie-consent';

  constructor(private http: HttpClient) {}

  logConsent(type: ConsentType): Observable<any> {
    return this.http.post(this.apiUrl, { type }, { withCredentials: true });
  }

  setConsent(type: 'all' | 'essential') {
    const consent = { accepted: true, type };
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    const secureFlag = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `nmc_cookie_consent=${encodeURIComponent(JSON.stringify(consent))}; path=/; expires=${d.toUTCString()}; SameSite=Lax${secureFlag}`;
  }

  getConsent(): { accepted: boolean; type: 'all' | 'essential' | null } {
    const match = document.cookie.match(/(^| )nmc_cookie_consent=([^;]+)/);
    if (!match) return { accepted: false, type: null };
    try { return JSON.parse(decodeURIComponent(match[2])); }
    catch { return { accepted: false, type: null }; }
  }

  revokeConsent() {
    const secureFlag = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `nmc_cookie_consent=; path=/; expires=${new Date(0).toUTCString()}; SameSite=Lax${secureFlag}`;
  }
}
