import { Component, OnInit } from '@angular/core';
import { Account } from "../account.model";
import { VendorList } from "../vendor-list.model";
import { Vendor } from "../vendor.model";
import { MailManagerService } from "../managers/mail-manager.service";
import { Configuration } from 'client-toolbox';
import { Observable } from "rxjs";
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  public mailData: Observable<[Configuration, Account, VendorList[]]>;
  public vendorList: VendorList[];
  public checkedVendorList: Vendor[] = [];
  public checkedVendorListCount: Object = {};
  public account: Account;
  public config: Configuration;
  public stars: Array<number>;
  public isSubjectDisabled: boolean = true;
  public isFromtDisabled: boolean = true;

  constructor(private _manager: MailManagerService, public dialog: MdDialog) {
    this.stars = new Array(5);
  }

  selectVendorList(event, categoryIndex) {
    let vendorsList = this.vendorList[categoryIndex].vendors;
    vendorsList.forEach(vendor => {
      let index = this.checkedVendorList.indexOf(vendor);
      if (event.checked) {
        if (index === -1) {
          this.checkedVendorListCount[this.vendorList[categoryIndex].typeCode] += 1;
          this.checkedVendorList.push(vendor);
        }
      } else {
        if (index !== -1) {
          this.checkedVendorListCount[this.vendorList[categoryIndex].typeCode] -= 1;
          this.checkedVendorList.splice(index, 1);
        }
      }
    });
  }

  selectVendor(event, vendor, categoryIndex) {
    if (event.checked) {
      this.checkedVendorListCount[this.vendorList[categoryIndex].typeCode] += 1;
      this.checkedVendorList.push(vendor);
    }
    else {
      this.checkedVendorListCount[this.vendorList[categoryIndex].typeCode] -= 1;
      let index = this.checkedVendorList.indexOf(vendor);
      this.checkedVendorList.splice(index, 1);
    }
  }

  isVendorChecked(vendor) {
    return this.checkedVendorList.indexOf(vendor) > -1;
  }

  isVendorListChecked(categoryIndex) {
    let vendorsList = this.vendorList[categoryIndex].vendors;
    let isChecked = true;
    vendorsList.forEach(vendor => {
      let index = this.checkedVendorList.indexOf(vendor);
      if (index === -1) {
        isChecked = false;
      }
    });
    return isChecked;
  }

  getCheckedVendorsListCount(typeCode) {
    let count = 0;
    if (this.checkedVendorListCount[typeCode] !== undefined) {
      count = this.checkedVendorListCount[typeCode];
    } else {
      this.checkedVendorListCount[typeCode] = 0;
    }
    return count;
  }

  toogleDisable(element: string, isDisabled: boolean) {
    if (element === 'subject') {
      this.isSubjectDisabled = !isDisabled;
    } else if (element === 'from') {
      this.isFromtDisabled = !isDisabled;
    }
  }

  sendEmail(): void {
    this._manager.sendMailData(this.checkedVendorList).subscribe((res: boolean) => {
      if (res) {
        let config = new MdDialogConfig();
        let dialogRef: MdDialogRef<ConfirmationComponent> = this.dialog.open(ConfirmationComponent, config);
        dialogRef.componentInstance.count = this.checkedVendorList.length;
      } else {
        alert("NO");
      }
    });
  }


  ngOnInit() {
    this.mailData = this._manager.getMailData();
    this.mailData.subscribe(data => {
      this.config = data[0];
      this.account = data[1];
      this.vendorList = data[2];
    });
  }

}

@Component({
  selector: 'dialog-result-example-dialog',
  template: `
  <h5 md-dialog-title>Introduction email was send to {{count}} selected vendors</h5>
  <md-dialog-actions><button md-button color="primary" md-dialog-close>OK</button></md-dialog-actions>`,
})
export class ConfirmationComponent {
  count: number;
  constructor(public dialogRef: MdDialogRef<ConfirmationComponent>) {}
}
