import { async, TestBed } from "@angular/core/testing";
import { MailManagerService } from "./mail-manager.service";
import { MailApiService } from "../api/mail-api.service";
import { Observable } from "rxjs";
import { VendorList } from "../vendor-list.model";
import { Vendor } from "../vendor.model";
import { Account } from "../account.model";
import { HttpModule } from "@angular/http";
import { SecurityService, CookiesService, LoggerService } from 'client-toolbox';
import { ConfigurationAPIService, Configuration } from 'client-toolbox';


export let account: (() => Account) = () => {
    return {
        numOfNewVendors: 4,
        logo: "src/test",
        name: "test",
        fromEmail: "test@gmail.com",
        ccEmail: "test1@gmail.com"
    };
};

export let vendorList: (() => VendorList[]) = () => {
    return [
        {
            typeCode: '4',
            vendors: [
                { id: 1, name: "test1", rate: 2, countryCode: "UK" },
                { id: 2, name: "test2", rate: 3, countryCode: "Spain" }
            ]
        }
    ];
};

export let selectedVendorList: (() => Vendor[]) = () => {
    return [
        { id: 1, name: "test1", rate: 2, countryCode: "UK" },
        { id: 2, name: "test2", rate: 3, countryCode: "Spain" }
    ];
};


export let mailData: (() => [Configuration, Account, VendorList[]]) = () => {
    return [
        new Configuration(),
        account(),
        vendorList()
    ]
}

describe('Mail Manager Service', () => {

    let manager: MailManagerService;
    let api: MailApiService;
    let confApi: ConfigurationAPIService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                SecurityService,
                CookiesService,
                LoggerService,
                MailManagerService,
                MailApiService,
                ConfigurationAPIService
            ]
        }).compileComponents().then(() => {
            manager = TestBed.get(MailManagerService);
            api = TestBed.get(MailApiService);
            confApi = TestBed.get(ConfigurationAPIService);
        });
    }));

    describe('get Mail data', () => {
        it('should call the getConfiguration, getAccount, getVendorList api method and return the result', () => {
            spyOn(confApi, 'getConfiguration').and.callFake(() => {
                return Observable.of(new Configuration());
            });
            spyOn(api, 'getAccount').and.callFake(() => {
                return Observable.of(account());
            });
            spyOn(api, 'getVendorList').and.callFake(() => {
                return Observable.of(vendorList());
            });
            manager.getMailData().subscribe((list) => {
                if (typeof list[0] !== 'undefined' && typeof list[1] !== 'undefined' && typeof list[2] !== 'undefined') {
                    // Response
                    expect(list).toEqual(mailData());
                }
            }, () => {
                // Error
                expect(true).toBeFalsy();
            });
        });
    });

    describe('send mail data', () => {
        it('should call the sendMailData api method with the correct parameters', () => {
            spyOn(api, 'sendMailData').and.callFake(() => {
                return Observable.of(true);
            });
            manager.sendMailData(selectedVendorList()).subscribe(res => {
                if (typeof res !== 'undefined') {
                    expect(res).toBe(true);
                }
            }, () => {
                expect(true).toBeFalsy();
            });
        });
    });

});