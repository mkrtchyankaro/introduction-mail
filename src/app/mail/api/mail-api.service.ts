import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Account } from "../account.model";
import { VendorList } from "../vendor-list.model";
import { Vendor } from "../vendor.model";
import { BaseApiService, LoggerService, SecurityService, ServerErrorResponse, ServerResponse } from 'client-toolbox';


export interface VendorListResponse extends ServerResponse {
    vendorList: VendorList[];
}

export interface AccountResponse extends ServerResponse {
    account: Account;
}

@Injectable()
export class MailApiService extends BaseApiService {
    public static VATBOX_SERVICE_NAME: string = "vendors";
    public static API_BASE = `/api/${MailApiService.VATBOX_SERVICE_NAME}/v1.0`;
    public static ACCOUNT_API = `${MailApiService.API_BASE}/account/amazon`;
    public static VENDOR_LIST_API = `${MailApiService.ACCOUNT_API}/vendors`;
    public static SEND_MAIL_API = `${MailApiService.ACCOUNT_API}/send/mail`;

    constructor(http: Http, security: SecurityService, logger: LoggerService) {
        super(http, logger, security);
    }

    /**
     * Get Account from the server
    */
    public getAccount(): Observable<AccountResponse> {
        return this.responseToServerResponse<AccountResponse, ServerErrorResponse>(
            this.http.get(MailApiService.ACCOUNT_API, { headers: this.defaultHeaders() }),
            (res: Response, resJson: any) => {
                return {
                    account: resJson
                };
            }
        );
    }
    /**
     * Get Vendor list from the server
    */
    public getVendorList(): Observable<VendorListResponse> {
        return this.responseToServerResponse<VendorListResponse, ServerErrorResponse>(
            this.http.get(MailApiService.VENDOR_LIST_API, { headers: this.defaultHeaders() }),
            (res: Response, resJson: any) => {
                return {
                    vendorList: resJson
                };
            }
        );
    }
    /**
    * Send mail to the server
    * @param selectedVendorList - the Vendor objects to send to server
    * @return Observable<boolean> - true if the object sent successfully
    */
    public sendMailData(selectedVendorList: Vendor[]): Observable<boolean> {
        return this.responseToServerResponse<ServerResponse, ServerErrorResponse>(
            this.http.post(`${MailApiService.SEND_MAIL_API}`, JSON.stringify(selectedVendorList), { headers: this.defaultHeaders() }))
            .map((res: ServerResponse) => {
                return res.httpStatus === 200;
            });
    }


}
