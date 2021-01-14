import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// import { PurchaseTicketModel } from 'src/app/models/purchase-ticket.mode';
import { PurchaseTicketModel } from './../../../models/purchase-ticket.mode';

@Component({
  selector: 'app-purchased-ticket-detail',
  templateUrl: './purchased-ticket-detail.component.html',
  styleUrls: ['./purchased-ticket-detail.component.scss']
})
export class PurchasedTicketDetailComponent implements OnInit {

  busInfo: PurchaseTicketModel;
  // busInfo: PurchaseTicketModel = {
  //   busName: 'DESH TRAVELS NATIONAL',
  //   busUid: 'string',
  //   date: 'string',
  //   seatArray: [],
  //   journeyTime: 1230,
  //   arrivalTime: 2330,
  //   startPoint: 'Uttor kumari',
  //   endPoint: 'Khan babar dorbar',
  //   totalFare: 10000,
  //   busType: 'Non AC',
  //   busNumber: 'kham343422'
  // };
  selectedSeatString: string;
  constructor(
    public dialogRef: MatDialogRef<PurchasedTicketDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: PurchaseTicketModel) {
      this.busInfo = data;
      this.selectedSeatString = this.busInfo.seatArray.toString();
    }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
