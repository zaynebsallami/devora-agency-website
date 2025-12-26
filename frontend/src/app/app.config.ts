import { type ApplicationConfig, importProvidersFrom, APP_INITIALIZER } from "@angular/core"
import { provideRouter } from "@angular/router"
import { HttpClient, provideHttpClient, withFetch } from "@angular/common/http"
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core"
import { TranslateHttpLoader } from "@ngx-translate/http-loader"

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json")
}

export function initializeTranslations(translate: TranslateService) {
  return () => {
    translate.setDefaultLang("de")
    return translate.use("de").toPromise()
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: "de",
        useDefaultLang: true,
        isolate: false,
        extend: true,
      }),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslations,
      deps: [TranslateService],
      multi: true,
    },
  ],
}
