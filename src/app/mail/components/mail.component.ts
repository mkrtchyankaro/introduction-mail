import { Component, OnInit, ViewChild } from '@angular/core';
import { Account } from "../account.model";
import { VendorList } from "../vendor-list.model";
import { Vendor } from "../vendor.model";
import { MailManagerService } from "../managers/mail-manager.service";
import { Configuration } from 'client-toolbox';
import { Observable } from "rxjs";
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TextEditorComponent } from '../../shared/ui/texteditor/texteditor.component';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  @ViewChild(TextEditorComponent) textEditor: TextEditorComponent;
  public mailData: Observable<[Configuration, Account, VendorList[]]>;
  public vendorList: VendorList[];
  public checkedVendorList: Vendor[] = [];
  public checkedVendorListCount: Object = {};
  public account: Account;
  public config: Configuration;
  public stars: Array<number>;
  public isSubjectDisabled: boolean = true;
  public isFromtDisabled: boolean = true;
  public isContentDisabled: boolean = true;
  public mailText = `<p><strong>It is a long established fact that</strong> a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> <p>&nbsp;</p> <p><strong>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</strong> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> <p>&nbsp;</p> <p><em>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</em></p> <p>&nbsp;</p> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <strong>Lorem Ipsum has been the industry's</strong> standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.&nbsp;</p> <p>&nbsp;</p>`;

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
    } else if (element === 'content') {
      if (isDisabled) {
        // this.textEditor.editor.getBody().setAttribute('contenteditable', false);
      }
      this.isContentDisabled = !isDisabled;
    }
  }

  setTextFormat(event) {
    this.textEditor.editor.formatter.toggle(event.value);
    this.textEditor.editor.focus();
  }

  closeTextEditor() {
    this.isContentDisabled = true;
  }

  saveTextEditor() {
    this.mailText = this.textEditor.editor.getContent();
    this.isContentDisabled = true;
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
  constructor(public dialogRef: MdDialogRef<ConfirmationComponent>) { }
}
