import { Routes, RouterModule } from '@angular/router';
import { MailComponent } from './components/mail.component';
import { ModuleWithProviders } from '@angular/core';


const mailRouter: Routes = [
  { path: 'mail', component: MailComponent }
];

export const MailRouting: ModuleWithProviders = RouterModule.forChild(mailRouter);
