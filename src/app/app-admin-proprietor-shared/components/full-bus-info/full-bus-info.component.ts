import { FullBusInfoModel } from './../../../models/full-bus-info.model';
import { Component, Input, OnInit } from '@angular/core';
// import { FullBusInfoModel } from '../../models/full-bus-info.model';

@Component({
  selector: 'app-full-bus-info',
  templateUrl: './full-bus-info.component.html',
  styleUrls: ['./full-bus-info.component.scss']
})
export class FullBusInfoComponent implements OnInit {

  displayBusStopColumn = ['name', 'schedule'];
  displayBusFareColumn = ['from', 'to', 'fare'];
  weekDays = ['SunDay', 'MonDay', 'TuesDay', 'WednesDay', 'ThursDay', 'FriDay', 'SaturDay'];
  offDays = '';
  @Input() busInfo: FullBusInfoModel;
  // busInfo: FullBusInfoModel = {
  //   busName: 'Desh Travels',
  //   busNumber: 'kha23434343',
  //   seatLimit: 30,
  //   busStopNames: ['Rajshahi', 'Puthia', 'Natore', 'Sirajgonj', 'Gazipur', 'Dhaka'],
  //   busStopSchedules: [700, 730, 800, 900, 1100, 1130],
  //   busType: 'AC',
  //   endPoint: 'Dhaka',
  //   startPoint: 'Rajshahi',
  //   fare: [350, 450, 480],
  //   fromBusStopNamesForFare: ['Rajshahi', 'Rajshahi', 'Rajshahi'],
  //   onDays: [0, 1, 2, 3, 4],
  //   seatPattern: '1x2',
  //   toBusStopNamesForFare: ['Sirajgonj', 'Gazipur', 'Dhaka'],
  //   uid: 'sjsjsje'

  // };
  busStopArray = [];
  busFareArray = [];
  constructor() { }

  ngOnInit(): void {
    this.createArray();
  }

  createArray(): void {
    for (let i = 0; i < this.busInfo.busStopNames.length; i++) {
      const obj = {
        name: this.busInfo.busStopNames[i],
        schedule: this.busInfo.busStopSchedules[i]
      };
      this.busStopArray.push(obj);

    }

    for (let i = 0; i < this.busInfo.fare.length; i++) {
      const obj = {
        from: this.busInfo.fromBusStopNamesForFare[i],
        to: this.busInfo.toBusStopNamesForFare[i],
        fare: this.busInfo.fare[i]
      };
      this.busFareArray.push(obj);
    }

    for (let i = 0; i < this.weekDays.length; i ++) {
      if ( !this.busInfo.onDays.includes(i)) {
        this.offDays += `${this.weekDays[i]}, `;
      }
    }

  }




}
