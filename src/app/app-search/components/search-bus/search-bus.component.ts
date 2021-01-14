import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { SearchDataModel } from './../../../models/search-info.model';
import { NotificationService } from './../../../services/notification.service';
import { UserService } from './../../../services/user.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { DateTimeValidityValidator } from '../../../validators/bus-search-date-time-validity.validator';
import { travelPointValidityValidator } from '../../../validators/async/travel-point-validity.validator';
import { BusSearchFromToValidator } from '../../../validators/bus-search-from-to.validator';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// import { NotificationService } from './../../services/notification.service';
// import { BusSearchFromToValidator } from '../../validators/bus-search-from-to.validator';
// import { DateTimeValidityValidator } from '../../validators/bus-search-date-time-validity.validator';
// import { SearchDataModel } from 'src/app/models/search-info.model';
// import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.scss']
})
export class SearchBusComponent implements OnInit {


  filterForm: FormGroup;
  // destination = ['Chapai Nawabgonj', 'Rajshahi', 'Natore', 'Puthia', 'Sirajgonj', 'Tangail', 'Gazipur', 'Nabin Nagar', 'Dhaka'];
  destination = [];

  filterFrom$: Observable<string[]>;
  filterTo$: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private atp: AmazingTimePickerService,
    private userService: UserService,
    private cdRef: ChangeDetectorRef,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.notificationService.pageBlocker.next(true);
    // this.userService.getTravelPoints()
    //   .subscribe((data: {travelPoints: string[]}) => {
    //     this.notificationService.pageBlocker.next(false);
    //     this.destination = data.travelPoints;
    //     console.log('travel points', this.destination)
    //   }, error => {
    //     this.notificationService.pageBlocker.next(false);
    //     this.router.navigate(['/server-error']);
    //     throw Error;
    //   });
    this.route.data
      .subscribe((data: {busStops: {travelPoints: string[]}}) => {
        this.destination = data.busStops.travelPoints;
        this.notificationService.pageBlocker.next(false);
      }, error => {
        this.notificationService.pageBlocker.next(false);
        this.router.navigate(['/server-error']);
      });
    this.creatForm();
    this.optionFilter();
  }

  creatForm(): void {
    this.filterForm = this.fb.group({
      from: [null, [Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20)],
                    [travelPointValidityValidator(this.destination)]],
      to: [null, [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(20)],
                  [travelPointValidityValidator(this.destination)]],
      date: [null, [Validators.required]],
      time: ['07:00'],
      busType: ['All'],
    }, {validators: [BusSearchFromToValidator.fromToValidate,
                     DateTimeValidityValidator.validateDateTime]});
  }

  get from(): AbstractControl {
    return this.filterForm.get('from');
  }
  get to(): AbstractControl {
    return this.filterForm.get('to');
  }
  get time(): AbstractControl {
    return this.filterForm.get('time');
  }
  get date(): AbstractControl {
    return this.filterForm.get('date');
  }
  get busType(): AbstractControl {
    return this.filterForm.get('busType');
  }


  optionFilter(): void {
    this.filterFrom$ = this.from.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.destination.filter(option => option.toLowerCase().includes(value.toLowerCase())))
    );


    this.filterTo$ = this.to.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.destination.filter(option => option.toLowerCase().includes(value.toLowerCase())))
    );
  }


  // limit date - 30 days only
  dateFilter = (date: Date | null) => {
    const today = new Date();
    const time = (date || new Date());
    return (time.getTime() >= today.getTime() || time.getDate() === today.getDate()) && (time.getTime() < (today.getTime() + 2592000000));
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

  openTimePicker(): void {
    const aTP = this.atp.open();
    aTP.afterClose().subscribe(time => {
      this.time.setValue(time);
    });
  }

  filter(): void {
    // this.cdRef.detectChanges();
    // console.log(this.filterForm.errors);

    if (this.filterForm.invalid) {
      console.log('filter form is not valid');
      return;
    }

    const fv = this.filterForm.value;
    const info = new SearchDataModel(fv.from, fv.to, new Date(fv.date).getTime(), this.fixTime(fv.time), fv.busType);
    // console.log(info);
    this.userService.searchInfo.next(info);
  }

  private fixTime(time: string): number {
    return +(time.split(':')[0] + time.split(':')[1]);
  }

}
