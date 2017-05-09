import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MailRouting } from './mail.routes';
import { MailComponent } from './components/mail.component';
import { ConfirmationComponent } from './components/mail.component';
import { MailManagerService } from "./managers/mail-manager.service";
import { MailApiService } from "./api/mail-api.service";
import { ConfigurationAPIService } from 'client-toolbox';
// directives
import { DROPDOWN_DIRECTIVES } from '../shared/ui/dropdown/dropdown.directive';

import { TextEditorComponent } from '../shared/ui/texteditor/texteditor.component';

@NgModule({
  imports: [
    SharedModule,
    MailRouting
  ],
  providers: [
    MailManagerService,
    MailApiService,
    ConfigurationAPIService
  ],
  entryComponents: [ConfirmationComponent],
  declarations: [MailComponent, DROPDOWN_DIRECTIVES, ConfirmationComponent, TextEditorComponent]
})
export class MailModule { }


