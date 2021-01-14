import { Component, Input, OnInit } from '@angular/core';

import { SearchBusListModel } from './../../../models/search-bus-list.model';
// import { SearchBusListModel } from './../../models/search-bus-list.model';

@Component({
  selector: 'app-available-bus',
  templateUrl: './available-bus.component.html',
  styleUrls: ['./available-bus.component.scss']
})
// export class AvailableBusComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

export class AvailableBusComponent implements OnInit {

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
  //   availableSeat: 32,
  //   unAvailableSeat: ["A1", "B1", "B2", "B3", "C1", "D3", "E1", "E2", "E3", "G3", "H1", "H2", "I1", "I2", "I3", "J1"],
  //   // seatsArray: ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3",
  // "D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3", "G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3", "J1"],
  //   seatPattern: '3x2',
  //   busType: 'AC',
  //   uid: '2339jfn23'
  // };

  constructor() { }

  ngOnInit(): void {
  }

}
