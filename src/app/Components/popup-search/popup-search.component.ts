import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-search',
  templateUrl: './popup-search.component.html',
  styleUrls: ['./popup-search.component.scss'],
})
export class PopupSearchComponent implements OnInit {
  keyword: string = '';
  fileFormat: string = '';
  constructor(
    public dialogRef: MatDialogRef<PopupSearchComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog() {
    debugger;
    let data = {
      keyword: this.keyword,
      fileFormat: this.fileFormat,
    };
    debugger;
    this.dialogRef.close(data);
  }
  ngOnInit(): void {}
}

