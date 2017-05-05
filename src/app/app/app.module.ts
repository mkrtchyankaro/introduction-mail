import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

// Angular Material
import 'hammerjs';

// Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app-component/app.component';
import { routing } from './app.routing';

import { MailModule } from "../mail/mail.module";

import { MailApiService } from "../mail/api/mail-api.service";
import { MockMailApiService } from "../mail/api/mock-mail-api.service";

import { BackendConfiguration, ConfigurationAPIService, CTBBackendService, MockConfigurationAPIBackend } from 'client-toolbox';


export let config: BackendConfiguration = {
    integrationServices: [],
    mockBackendServices: [
        { serviceName: MailApiService.VATBOX_SERVICE_NAME, serviceClass: MockMailApiService },
        { serviceName: ConfigurationAPIService.VATBOX_SERVICE_NAME, serviceClass: MockConfigurationAPIBackend }
    ]
};



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MailModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routing,
    FlexLayoutModule
  ],
  providers: [
    CTBBackendService.GET_PROVIDERS(config, true)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.info('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
