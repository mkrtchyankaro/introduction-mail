import { RouterModule, Routes } from '@angular/router';
import { MailModule } from "../mail/mail.module";

const routes: Routes = [
  { path: 'mail', component: MailModule },
  { path: '', redirectTo: 'mail', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(routes);
