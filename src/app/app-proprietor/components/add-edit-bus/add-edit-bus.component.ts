import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';

import { AddBusInfoModel } from './../../../models/add-bus-info.mode';
import { ErrorService } from './../../../services/error.service';
import { NotificationService } from './../../../services/notification.service';
import { AuthService } from './../../../services/auth.service';
import { BusProprietorService } from './../../../services/bus-proprietor.service';
import { travelPointExistance } from '../../../validators/travel-point-existence.validator';
import { travelPointFareExistance } from '../../../validators/travel-point-fare-existence.validatator';
import { farePointValidity } from '../../../validators/fare-point-existence.validator';
import { AmazingTimePickerService } from 'amazing-time-picker';
// import { ErrorService } from './../../services/error.service';
// import { NotificationService } from './../../services/notification.service';
// import { AuthService } from 'src/app/services/auth.service';
// import { BusProprietorService } from './../../services/bus-proprietor.service';
// import { AddBusInfoModel } from './../../models/add-bus-info.mode';


@Component({
  selector: 'app-add-edit-bus',
  templateUrl: './add-edit-bus.component.html',
  styleUrls: ['./add-edit-bus.component.scss']
})
export class AddEditBusComponent implements OnInit {

  busForm: FormGroup;
  mode = 'Add Bus';

  // busInfo = {
  //   busName: 'Desh Travels',
  //   busNumber: 'hs23',
  //   busType: 'AC',
  //   onDays: [6, 0],
  //   seatLimit: 30,
  //   seatPattern: '1x2',
  //   startPoint: 'Rajshahi',
  //   endPoint: 'Dhaka',
  //   busStopNames: ['Rajshahi', 'Puthia', 'Natore', 'Sirajgonj', 'Tangail', 'Gazipur', 'Kollanpur'],
  //   busStopSchedules: [700, 730, 800, 900, 1000, 1100, 1300, 1330],
  //   fromBusStopNamesForFare: ['Rajshahi', 'Sirajgonj', 'Tangail'],
  //   toBusStopNamesForFare : ['Dhaka', 'Dhaka', 'Dhaka'],
  //   fare: [1000, 800, 700],
  //   uid: 'jdjehee'
  // };

  busInfo;

  busOnDays = {
    everyDay: {
      somDays: false,
      everyDay: true,
      name: 'Everyday'
    },
    weekDays : [
    {name: 'Sunday', value: 0, selected: true},
    {name: 'Monday', value: 1, selected: true},
    {name: 'Tuesday', value: 2, selected: true},
    {name: 'Wednesday', value: 3, selected: true},
    {name: 'Thursday', value: 4, selected: true},
    {name: 'Friday', value: 5, selected: true},
    {name: 'Saturday', value: 6, selected: true},
  ]
};
  invalidData = false;
  busCantStayOffAllDayInAWeek = false;
  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private atp: AmazingTimePickerService,
    private busProprietorService: BusProprietorService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.valuechanges();
    // if (this.route.snapshot.url[0].path === 'edit-bus' && this.route.snapshot.paramMap.has('id')) {
    if (this.route.snapshot.paramMap.has('id')) {
      // console.log('edit bus info');
      this.notificationService.pageBlocker.next(true);
      this.mode = 'Edit Bus';
      this.busProprietorService.getEditBusInfo(this.route.snapshot.paramMap.get('id'))
      .subscribe( data => {
          this.notificationService.pageBlocker.next(false);
          this.busInfo = data;
          this.patchValue();
      }, (error: HttpErrorResponse) => {
        this.notificationService.pageBlocker.next(false);
        if (error.status === 403) {
          this.errorService.forBidden();
          this.router.navigate(['/login']);
        } else if (error.status === 401) {
          this.errorService.unAuthorized();
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/proprietor/panel']);
          throw error;
        }
      });
    }
  }

  createForm(): void {
    this.busForm = this.fb.group({
      busName: [this.authService.userProprietoryBusName() || null, [Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20)]],
      busNumber: [null, [Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(20)]],
      busType: [null, [Validators.required]],
      onDays: [[0, 1, 2, 3, 4, 5, 6], []],
      seatLimit: [null, [Validators.required,
                        Validators.min(5),
                        Validators.max(60)]],
      seatPattern: [null, [Validators.required]],
      startPoint: [null, [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(20)]],
      endPoint: [null, [Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(20)]],
      travelPoints: this.fb.array([
        this.fb.group({
          busStopName: [null, [Validators.required,
                              Validators.minLength(3),
                              Validators.maxLength(20)]],
          schedule: [null, [Validators.required]]
        }),

        this.fb.group({
          busStopName: [null, [Validators.required,
                              Validators.minLength(3),
                              Validators.maxLength(20)]],
          schedule: [null, [Validators.required]]
        })
      ], [Validators.required, Validators.minLength(2), travelPointExistance]),
      fare: this.fb.array([
        this.fb.group({
          from: [null, [Validators.required,
                            Validators.minLength(3),
                            Validators.maxLength(20)]],
          to: [null, [Validators.required,
                      Validators.minLength(3),
                      Validators.maxLength(20)]],
          fareAt: [null, [Validators.required,
                        Validators.min(0)]]
        })
      ], [Validators.required, Validators.minLength(1), travelPointFareExistance]),

    }, {validators: [farePointValidity]});
    // this.toogleEveryDay();
  }

  valuechanges(): void {
    this.travelPoints.valueChanges.subscribe(() => {
      this.travelPoints.updateValueAndValidity({emitEvent: false});
    });
  }

  get busName(): AbstractControl {
    return this.busForm.get('busName');
  }
  get busNumber(): AbstractControl {
    return this.busForm.get('busNumber');
  }
  get busType(): AbstractControl {
    return this.busForm.get('busType');
  }
  get onDays(): AbstractControl {
    return this.busForm.get('onDays');
  }
  get seatLimit(): AbstractControl {
    return this.busForm.get('seatLimit');
  }
  get seatPattern(): AbstractControl {
    return this.busForm.get('seatPattern');
  }
  get startPoint(): AbstractControl {
    return this.busForm.get('startPoint');
  }
  get endPoint(): AbstractControl {
    return this.busForm.get('endPoint');
  }
  get travelPoints(): FormArray {
    return this.busForm.get('travelPoints') as FormArray;
  }
  get busStopName(): AbstractControl {
    return this.busForm.get('travelPoints').get('busStopName');
  }
  get schedule(): AbstractControl {
    return this.busForm.get('travelPoints').get('schedule');
  }
  get fare(): FormArray {
    return this.busForm.get('fare') as FormArray;
  }
  get from(): AbstractControl {
    return this.busForm.get('fare').get('from');
  }
  get to(): AbstractControl {
    return this.busForm.get('fare').get('to');
  }
  get fareAt(): AbstractControl {
    return this.busForm.get('fare').get('fareAt');
  }

  patchValue(): void {
    this.cdRef.detectChanges();
    this.busForm.patchValue({
      busName : this.busInfo.busName,
      busNumber: this.busInfo.busNumber,
      busType: this.busInfo.busType,
      onDays: this.busInfo.onDays,
      seatLimit: this.busInfo.seatLimit,
      seatPattern: this.busInfo.seatPattern,
      startPoint: this.busInfo.startPoint,
      endPoint: this.busInfo.endPoint,
      // travelPoints: [],
      // fare: []
    });
    this.creatArrayInputs();
    this.fixOnDays();
  }

  creatArrayInputs(): void {
    this.travelPoints.clear();
    this.fare.removeAt(0);

    for (let i = 0; i < this.busInfo.fromBusStopNamesForFare.length; i++) {
      this.addBusStopFare(this.busInfo.fromBusStopNamesForFare[i], this.busInfo.toBusStopNamesForFare[i], this.busInfo.fare[i]);
    }

    for (let i = 0; i < this.busInfo.busStopNames.length; i ++) {
      let schedule: any = this.busInfo.busStopSchedules[i].toString().padStart(4, '0').split('');
      schedule.splice(2, 0, ':');
      schedule = schedule.join('');
      this.addTravelPoint(this.busInfo.busStopNames[i], schedule);
    }

  }

  fixOnDays(): void {
    this.busOnDays.weekDays.forEach( day => {
      if (this.busInfo.onDays.includes(day.value)) {
        day.selected = true;
      } else {
        day.selected = false;
      }
    });

    if (this.busOnDays.weekDays.every(day => day.selected)) {
      this.busOnDays.everyDay.everyDay = true;
      this.busOnDays.everyDay.somDays = false;
    } else if (this.busOnDays.weekDays.some(day => day.selected)) {
      this.busOnDays.everyDay.everyDay = false;
      this.busOnDays.everyDay.somDays = true;
    } else {
      this.busOnDays.everyDay.everyDay = false;
      this.busOnDays.everyDay.somDays = false;
    }
  }


  addTravelPoint(busStopName?, schedule?): void {
    const newTravelPoint = this.fb.group({
      busStopName: [busStopName ? busStopName : null,
                        [ Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(20)]],
      schedule: [schedule ? schedule : null, [Validators.required]]
    });

    this.travelPoints.push(newTravelPoint);
  }

  addBusStopFare(from?, to?, fare?): void {
    const newTravelPointFare = this.fb.group({
      from: [from ? from : null, [Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(20)]],
      to: [to ? to : null, [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(20)]],
      fareAt: [fare ? fare : null, [Validators.required,
                    Validators.min(0)]]
    });

    this.fare.push(newTravelPointFare);
  }

  toogleEveryDay(): void {
    this.busCantStayOffAllDayInAWeek = false;
    this.busOnDays.everyDay.somDays = false;
    this.busOnDays.everyDay.everyDay = !this.busOnDays.everyDay.everyDay;
    if (this.busOnDays.everyDay.everyDay) {
      this.busOnDays.weekDays.forEach(days => days.selected = true);
    } else {
      this.busOnDays.weekDays.forEach(days => days.selected = false);
      this.busCantStayOffAllDayInAWeek = true;
    }
    const onDays = [];
    this.busOnDays.weekDays.forEach(day => {
      day.selected ? onDays.push(day.value) : null;
    });
    this.onDays.setValue(onDays.length ? onDays : null);
  }

  toogleWeekDays(weekday: any): void {
    this.busCantStayOffAllDayInAWeek = false;
    const index = this.busOnDays.weekDays.indexOf(weekday);
    this.busOnDays.weekDays[index].selected = !this.busOnDays.weekDays[index].selected;

    if (this.busOnDays.weekDays.every(day => day.selected === true)) {
      this.busOnDays.everyDay.somDays = false;
      this.busOnDays.everyDay.everyDay = true;
    } else if (this.busOnDays.weekDays.every(day => day.selected === false)) {
      this.busOnDays.everyDay.everyDay = false;
      this.busOnDays.everyDay.somDays = false;
      this.busCantStayOffAllDayInAWeek = true;
    } else if (this.busOnDays.weekDays.some(day => day.selected === true)) {
      this.busOnDays.everyDay.everyDay = false;
      this.busOnDays.everyDay.somDays = true;
    }
    const onDays = [];
    this.busOnDays.weekDays.forEach(day => {
      day.selected ? onDays.push(day.value) : null;
    });
    this.onDays.setValue(onDays.length ? onDays : null);
  }


  removeFormArrayItem(control: string, i: any): void {
    this[control].removeAt(i);
  }

  enhanceName(fC: string): void {
    const control: FormControl = this[fC];
    if (control.value) {
      const value = (control.value as string).replace(/\s+/g, ' ').trim().split(' ').map( word => {
        return word.charAt(0).toUpperCase() + word.slice(1, word.length).toLowerCase();
      }).join(' ');
      // console.log(value);

      control.setValue(value);
    }
  }
  enhanceArrayControlName(arrayName: string, i: any, fC: string): void {
    const control: FormControl = this[arrayName].at(i).get(fC);
    if (control.value) {
      const value = (control.value as string).replace(/\s+/g, ' ').trim().split(' ').map( word => {
        return word.charAt(0).toUpperCase() + word.slice(1, word.length).toLowerCase();
      }).join(' ');

      control.setValue(value);
    }
  }

  openTimePicker(i: number): void {
    const aTP = this.atp.open();
    aTP.afterClose().subscribe(time => {
      this.travelPoints.at(i).get('schedule').setValue(time);

      // console.log(this.travelPoints.get([i]).get('schedule').value);
    });
  }


  // for development only
  // submit(): void {
  //   console.log(this.busForm);
  // }

  submit(): void {
    // console.log(this.busForm.value);
    if (this.busForm.invalid) {
      this.invalidData = true;
      // console.log(this.busForm);
      return;
    }
    this.notificationService.pageBlocker.next(true);
    this.invalidData = false;
    // console.log(this.busForm.value);
    const value = this.busForm.value;
    const array = this.creatBusStopInfo();
    const info = new AddBusInfoModel(
      value.busName,
      value.busNumber,
      value.busType,
      value.onDays,
      value.seatLimit,
      value.seatPattern,
      value.startPoint,
      value.endPoint,
      array.busStopNames,
      array.busStopSchedules,
      array.fromBusStopNamesForFare,
      array.toBusStopNamesForFare,
      array.fare
    );

    // console.log(info);

    if (this.mode === 'Add Bus') {
      // console.log('adding bus');
      this.busProprietorService.addBus(info)
      .subscribe(
        data => {
            this.notificationService.pageBlocker.next(false);
            // console.log(data);
            this.router.navigate(['/proprietor', this.authService.userProprietoryBusName().split(' ').join('_'), 'all-bus-list']);
          }, (error: HttpErrorResponse) => {
            this.notificationService.pageBlocker.next(false);
            if (error.status === 403) {
              this.authService.logout();
              this.errorService.forBidden();
              this.router.navigate(['/auth/login']);
            } else if (error.status === 401) {
              this.authService.logout();
              this.errorService.unAuthorized();
              this.router.navigate(['/auth/login']);
            } else {
              // this.router.navigate(['/proprietor/panel']);
              throw error;
            }
        });
    } else {
      // console.log('editing bus');
      this.busProprietorService.editInfo({...info, uid: this.busInfo.uid}).subscribe(data => {
        this.notificationService.pageBlocker.next(false);
        // console.log(data);
        this.router.navigate(['/proprietor', this.authService.userProprietoryBusName().split(' ').join('_'), 'all-bus-list']);
      }, (error: HttpErrorResponse) => {
        this.notificationService.pageBlocker.next(false);
        if (error.status === 403) {
          this.authService.logout();
          this.errorService.forBidden();
          this.router.navigate(['/auth/login']);
        } else if (error.status === 401) {
          this.authService.logout();
          this.errorService.unAuthorized();
          this.router.navigate(['/auth/login']);
        } else {
          // this.router.navigate(['/proprietor/panel']);
          throw error;
        }
      });
    }
  }


  private creatBusStopInfo(): any {
    const busStopNames = [];
    const busStopSchedules = [];
    const fromBusStopNamesForFare = [];
    const toBusStopNamesForFare = [];
    const fare = [];

    this.travelPoints.controls.forEach(busStop => {
      busStopNames.push(busStop.get('busStopName').value);
      let time: any = (busStop.get('schedule').value as string).split('');
      time.splice(2, 1);
      time = time.join('');
      busStopSchedules.push(+time);
    });

    const fareValue: {from: string, to: string, fareAt: number}[] = this.fare.value;

    fareValue.sort((a, b) => {
      return a.fareAt - b.fareAt;
    });

    fareValue.forEach(busStop => {
      fromBusStopNamesForFare.push(busStop.from);
      toBusStopNamesForFare.push(busStop.to);
      fare.push(busStop.fareAt);
    });

    return {
      busStopNames,
      busStopSchedules,
      fromBusStopNamesForFare,
      toBusStopNamesForFare,
      fare
    };
  }


}
