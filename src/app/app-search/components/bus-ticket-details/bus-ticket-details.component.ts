import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from 'src/app/services/user.service';
import { PurchaseTicketModel } from './../../../models/purchase-ticket.mode';
import { ErrorService } from './../../../services/error.service';
import { NotificationService } from './../../../services/notification.service';
import { SearchBusListModel } from './../../../models/search-bus-list.model';
// import { ErrorService } from './../../services/error.service';
// import { NotificationService } from './../../services/notification.service';
// import { SearchBusListModel } from './../../models/search-bus-list.model';
// import { PurchaseTicketModel } from './../../models/purchase-ticket.mode';

@Component({
  selector: 'app-bus-ticket-details',
  templateUrl: './bus-ticket-details.component.html',
  styleUrls: ['./bus-ticket-details.component.scss']
})

export class BusTicketDetailsComponent implements OnInit {

  alphabetArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  maximumSeatPurchaseMessage = false;
  seatArr = [];
  @Input() busInfo: SearchBusListModel;
  // busInfo = {
  //   busName: 'Desh Travels',
  //   busNumber: 'kha325',
  //   busStartPoint: 'Rajshahi',
  //   busEndPoint: 'Dhaka',
  //   journeyStartPoint: 'Natore',
  //   journeyEndPoint: 'Dhaka',
  //   journeyStartTime: 345,
  //   date: '2020-12-07T18:00:00.000Z',
  //   fare: 480,
  //   availableSeat: 33,
  //   unAvailableSeat: ["A1", "B1", "B2", "B3", "C1", "D3", "E1", "E2", "E3", "G3", "H1", "H2", "I1", "I2", "I3", "J1"],
  //   seatsArray: ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2",
  // "C3", "D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3", "G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3", "J1"],
  //   seatPattern: '2x2',
  //   busType: 'AC',
  //   uid: '2339jfn23'
  // };
  totalSeat: number;

  selectedSeat = [];
  selectedSeatString: string;
  noSeatSelected = false;
  totalFare = 0;


  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.totalSeat = this.busInfo.availableSeat + this.busInfo.unAvailableSeat.length;
    this.makeArr();
  }

  makeArr(): void {
    const seArr = this.busInfo.seatPattern.split('x');
    const numberOfSeatInRow = +seArr[0] + +seArr[1];

    if (this.totalSeat % numberOfSeatInRow === 0) {
      // console.log('condition 1');
      for (let i = 0; i < this.totalSeat / numberOfSeatInRow; i++) {
        const seatRow = [];
        for (let j = 1; j <= +seArr[0]; j++) {
          seatRow.push(this.alphabetArr[i] + j);
        }
        seatRow.push(null);
        for (let j = 1; j <= +seArr[1]; j++) {
          seatRow.push(this.alphabetArr[i] + (j + +seArr[0]));
        }
        this.seatArr.push(seatRow);
      }
    } else if (this.totalSeat % numberOfSeatInRow === 1 && numberOfSeatInRow === 3) {
        // console.log('condition 2');
        for (let i = 0; i <= Math.floor(this.totalSeat / numberOfSeatInRow); i++) {
          const seatRow = [];
          if (i === Math.floor(this.totalSeat / numberOfSeatInRow)) {
            seatRow.push(null);
            seatRow.push(null);
            seatRow.push(this.alphabetArr[i] + 1);
            seatRow.push(null);
            seatRow.push(null);

          } else {
            for (let j = 1; j <= +seArr[0]; j++) {
              seatRow.push(this.alphabetArr[i] + j);
            }
            seatRow.push(null);
            for (let j = 1; j <= +seArr[1]; j++) {
              seatRow.push(this.alphabetArr[i] + (j + +seArr[0]));
            }
          }
          this.seatArr.push(seatRow);
        }

    } else {
        // console.log('condition 3');
        for (let i = 0; i < Math.floor(this.totalSeat / numberOfSeatInRow); i++) {
          const seatRow = [];
          if (i === (Math.floor(this.totalSeat / numberOfSeatInRow) - 1)) {
              for (let k = 1; k <= (this.totalSeat % numberOfSeatInRow + numberOfSeatInRow); k++) {
                seatRow.push(this.alphabetArr[i + 1] + k);
              }
              this.seatArr.push(seatRow);
          } else {
            for (let j = 1; j <= +seArr[0]; j++) {
              seatRow.push(this.alphabetArr[i] + j);
            }
            seatRow.push(null);
            for (let j = 1; j <= +seArr[1]; j++) {
              seatRow.push(this.alphabetArr[i] + (j + +seArr[0]));
            }
            this.seatArr.push(seatRow);
          }
        }
    }
    // console.log(this.seatArr);
  }


  seatSelected(seatNumber: string): void {
    // console.log(seatNumber);
    if (!this.selectedSeat.includes(seatNumber) && this.selectedSeat.length < 5) {
      this.selectedSeat.push(seatNumber);
    } else if (this.selectedSeat.includes(seatNumber)) {
      const index = this.selectedSeat.indexOf(seatNumber);
      this.selectedSeat.splice(index, 1);

      this.maximumSeatPurchaseMessage = false;
    } else {
      this.maximumSeatPurchaseMessage = true;
      setTimeout(() => {
        this.maximumSeatPurchaseMessage = false;
      }, 5000);
    }

    this.selectedSeatString = '';
    this.selectedSeat.forEach(seat => {
      this.selectedSeatString += seat + ', ';
    });

    if (this.selectedSeat.length) {
      this.noSeatSelected = false;
    }

    this.calculateTotalFare();
  }

  private calculateTotalFare(): void {
    this.totalFare = this.selectedSeat.length * this.busInfo.fare;
  }

  purchaseTicket(): void {
    if (!this.selectedSeat.length) {
      // console.log(this.selectedSeat);
      this.noSeatSelected = true;
      setTimeout(() => {
        this.noSeatSelected = false;
      }, 2000);
      // return;
    }
    this.notificationService.pageBlocker.next(true);
    const purchaseInfo = new PurchaseTicketModel(this.busInfo.busName, this.busInfo.uid, this.busInfo.date,
      this.selectedSeat, this.busInfo.journeyStartTime, this.busInfo.arrivalTime, this.busInfo.journeyStartPoint,
      this.busInfo.journeyEndPoint, this.totalFare, this.busInfo.busType, this.busInfo.busNumber);
    // console.log(purchaseInfo);
    this.userService.purchaseTicket(purchaseInfo)
      .subscribe( data => {
        // managing state
        this.totalSeat = 0;
        this.busInfo.unAvailableSeat.push(...this.selectedSeat);
        this.selectedSeat = [];
        this.selectedSeatString = null;
        this.noSeatSelected = false;
        this.totalFare = 0;
        this.notificationService.pageBlocker.next(false);
        this.notificationService.successful(data.message, 'cancel');
        // console.log(data);
      }, (error: HttpErrorResponse) => {
        this.notificationService.pageBlocker.next(false);
        if (error.status === 400) {
          this.errorService.badRequest(error.error.message);
        } else {
          throw error;
        }
        // console.log(error);
      });
  }


}



// this.busName = busName;
// this.busNumber = busNumber;
// this.busStartPoint = busStartPoint;
// this.busEndPoint = busEndPoint;
// this.journeyStartPoint = journeyStartPoint;
// this.journeyEndPoint = journeyEndPoint;
// this.journeyStartTime = journeyStartTime;
// this.date = date;
// this.fare = fare;
// this.availableSeat = availableSeat;
// this.seatsArray = seatsArray;
// this.seatPattern = seatPattern;
// this.busType = busType;
// this.uid = uid;
