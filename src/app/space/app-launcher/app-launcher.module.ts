import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

import {
  AuthHelperService,
  Config,
  DependencyEditorTokenProvider,
  HelperService,
  TokenProvider,
  URLProvider
} from 'ngx-launcher';
import { AUTH_API_URL, AuthenticationService } from 'ngx-login-client';

import { ApiLocatorService } from '../../shared/api-locator.service';
import { AppLauncherRoutingModule } from './app-launcher-routing.module';
import { AppLauncherComponent } from './app-launcher.component';
import { CreateAppModule } from './create-app/create-app.module';
import { ImportAppModule } from './import-app/import-app.module';
import { AuthAPIProvider } from './services/app-launcher-authprovider.service';
import { KeycloakTokenProvider } from './services/token-provider.service';
import { analyticsLicenseApiUrlProvider, analyticsRecommendeApiUrlProvider, AnalyticsUrlService } from './shared/analytics-url.service';
import { NewForgeConfig } from './shared/new-forge.config';


@NgModule({
  imports: [
    AppLauncherRoutingModule,
    CommonModule,
    CreateAppModule,
    ImportAppModule
  ],
  providers: [
    HelperService,
    { provide: Config, useClass: NewForgeConfig },
    analyticsLicenseApiUrlProvider,
    analyticsRecommendeApiUrlProvider,
    {
      provide: TokenProvider,
      useFactory: (auth: AuthenticationService) => new KeycloakTokenProvider(auth),
      deps: [AuthenticationService]
    },
    {
      provide: AuthHelperService,
      useFactory: (AUTH_API_URL) => new AuthAPIProvider(AUTH_API_URL),
      deps: [AUTH_API_URL]
    },
    {
      provide: URLProvider,
      useFactory: (api: ApiLocatorService) => new AnalyticsUrlService(api),
      deps: [ApiLocatorService]
    },
    { provide: DependencyEditorTokenProvider, useExisting: TokenProvider }
  ],
  declarations: [ AppLauncherComponent ]
})
export class AppLauncherModule {}
