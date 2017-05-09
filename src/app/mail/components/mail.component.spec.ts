import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MailComponent } from './mail.component';
import { MailManagerService } from "../managers/mail-manager.service";
import { MailApiService } from "../api/mail-api.service";
import { MaterialModule } from '@angular/material';
import { SecurityService, CookiesService, LoggerService } from 'client-toolbox';
import { ConfigurationAPIService } from 'client-toolbox';
import { TextEditorComponent } from '../../shared/ui/texteditor/texteditor.component';

describe('MailComponent', () => {
  let component: MailComponent;
  let fixture: ComponentFixture<MailComponent>;
  let manager: MailManagerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailComponent, TextEditorComponent ],
      imports: [ MaterialModule ],
        providers: [
          MailApiService,
          MailManagerService,
          ConfigurationAPIService,
          SecurityService,
          CookiesService,
          LoggerService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailComponent);
    manager = TestBed.get(MailManagerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 