import { async, TestBed } from "@angular/core/testing";
import { HttpModule, ResponseOptions, XHRBackend, Response, Headers } from "@angular/http";
import { MailApiService, VendorListResponse, AccountResponse } from "./mail-api.service";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { vendorList, account, selectedVendorList } from "../managers/mail-manager.service.spec";
import { SecurityService, CookiesService, LoggerService } from 'client-toolbox';
import { ConfigurationAPIService } from 'client-toolbox';

let jsonHeaders = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
};

describe('Mail API service', () => {

    let backend: MockBackend;
    let api: MailApiService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                SecurityService,
                CookiesService,
                LoggerService,
                { provide: XHRBackend, useClass: MockBackend },
                MailApiService,
                ConfigurationAPIService
            ]
        }).compileComponents().then(() => {
            backend = TestBed.get(XHRBackend);
            api = TestBed.get(MailApiService);
        });
    }));

    describe('getVendorList method', () => {
        it('should return a list of vendors', () => {
            backend.connections.subscribe((c: MockConnection) => {
                expect(c.request.url).toEqual(`${MailApiService.VENDOR_LIST_API}`);
                c.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    headers: jsonHeaders(),
                    body: vendorList()
                })));
            });

            api.getVendorList().subscribe((res: VendorListResponse) => {
                if (typeof res !== 'undefined') {
                    expect(res.vendorList).toEqual(vendorList());
                }
            });
        });
    });
    describe('getAccount method', () => {
        it('should return a account', () => {
            backend.connections.subscribe((c: MockConnection) => {
                expect(c.request.url).toEqual(`${MailApiService.ACCOUNT_API}`);
                c.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    headers: jsonHeaders(),
                    body: account()
                })));
            });

            api.getAccount().subscribe((res: AccountResponse) => {
                if (typeof res !== 'undefined') {
                    expect(res.account).toEqual(account());
                }
            });
        });
    });
    describe('send mail data', () => {
        it('should return true', () => {
            backend.connections.subscribe((c: MockConnection) => {
                expect(c.request.url).toBe(`${MailApiService.SEND_MAIL_API}`);
                c.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    headers: jsonHeaders(),
                    body: {}
                })));
            });

            api.sendMailData(selectedVendorList()).subscribe((res: boolean) => {
                expect(res).toBeTruthy();
            });
        });
    });
});
