import './rxjs-extensions';

// Globals
import { GlobalSettings } from './shared/globals';

import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'ng2-dropdown';
import { TabsModule } from 'ng2-bootstrap/components/tabs';
import { ModalModule } from 'ng2-modal';
import { TooltipModule } from 'ng2-bootstrap/components/tooltip';
import {
  AuthenticationService,
  Broadcaster,
  Logger,
  UserService
} from 'ngx-login-client';

// Shared
import { authApiUrlProvider } from './shared/standalone/auth-api.provider';
import { SpaceService } from './shared/mock-spaces.service';

// App components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Footer
import { FooterComponent } from './footer/footer.component';

// Header
import { HeaderComponent } from './header/header.component';

// Login
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

// Work
import { WorkItemSearchComponent } from './work-item/work-item-search/work-item-search.component';
import { WorkItemService } from './work-item/work-item.service';
import { WorkItemModule } from './work-item/work-item.module';

// Mock data
import { MockDataService } from './shared/mock-data.service';

// Main areas
import { ChatModule } from './chat/chat.module';
import { CodeModule } from './code/code.module';
import { HomeModule } from './home/home.module';
import { HypothesisModule } from './hypothesis/hypothesis.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PipelineModule } from './pipeline/pipeline.module';
import { SettingsModule } from './settings/settings.module';
import { TestModule } from './test/test.module';
import { ObsidianModule } from './obsidian/obsidian.module';

//SubMenu
import { DashboardModule } from './dashboard/dashboard.module';
import { LearnModule } from './learn/learn.module';

import { ToastNotificationComponent } from './toast-notification/toast-notification.component';

// conditionally import the inmemory resource module
let serviceImports: Array<any[] | any | ModuleWithProviders>;

// The inmemory environment variable is checked and if present then the in-memory dataset is added.
if (process.env.ENV == 'inmemory') {
  serviceImports = [
    Logger,
    AuthenticationService,
    Broadcaster,
    LoginService,
    UserService,
    WorkItemService,
    MockDataService,
    SpaceService,
    authApiUrlProvider
  ];
} else {
  serviceImports = [
    Logger,
    AuthenticationService,
    Broadcaster,
    LoginService,
    UserService,
    WorkItemService,
    MockDataService,
    SpaceService,
    authApiUrlProvider
  ];
}

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChatModule,
    CodeModule,
    DashboardModule,
    DropdownModule,
    FormsModule,
    HomeModule,
    HypothesisModule,
    HttpModule,
    LearnModule,
    ModalModule,
    NotificationsModule,
    // ObsidianModule,
    // Having this module cause the
    // functional tests fail
    // randomly with timeout
    PipelineModule,
    SettingsModule,
    TabsModule,
    TestModule,
    TooltipModule,
    WorkItemModule
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    ToastNotificationComponent,
    WorkItemSearchComponent
  ],
  providers: serviceImports,
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(private globalSettings: GlobalSettings) {
    this.globalSettings.setTestMode(process.env.ENV == 'inmemory' ? true : false);
  }
}
