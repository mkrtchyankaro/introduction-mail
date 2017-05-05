import { Injectable } from "@angular/core";
import { MailApiService, VendorListResponse, AccountResponse } from "../api/mail-api.service";
import { Observable } from "rxjs";
import { VendorList } from "../vendor-list.model";
import { Vendor } from "../vendor.model";
import { Account } from "../account.model";
import { ConfigurationAPIService, Configuration, ConfigurationResponse } from 'client-toolbox';

@Injectable()
export class MailManagerService {

  constructor(private _api: MailApiService, private _config: ConfigurationAPIService) { }

  /**
   * Gets Configuration, Account, Vendor list from the api service
   * @return Observable<[Configuration, Account, VendorList[]]>
   */
  public getMailData(): Observable<[Configuration, Account, VendorList[]]> {
    return Observable.forkJoin(
      this._config.getConfiguration().map((configData: ConfigurationResponse) => configData.config),
      this._api.getAccount().map((accountData: AccountResponse) => accountData.account),
      this._api.getVendorList().map((list: VendorListResponse) =>  list.vendorList)
    );
  }

  /**
   * Send the vendors list object to the api
   * @param VendorList
   */
  public sendMailData(selectedVendorList: Vendor[]): Observable<boolean> {
      return this._api.sendMailData(selectedVendorList);
  }
}
