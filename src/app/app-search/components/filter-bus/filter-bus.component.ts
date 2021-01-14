import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';

import { SearchBusListModel } from './../../../models/search-bus-list.model';
// import { SearchBusListModel } from 'src/app/models/search-bus-list.model';

@Component({
  selector: 'app-filter-bus',
  templateUrl: './filter-bus.component.html',
  styleUrls: ['./filter-bus.component.scss']
})
export class FilterBusComponent implements OnInit, OnChanges {

  panelOpenState = false;
  availableBusesName: string[] = [];
  doFilter = false;

  @Input() busList: SearchBusListModel[];
  @Output() fiteredBusList = new EventEmitter<any[]>();

  @ViewChild('expansionPanel', {static: true}) expansionPanel: MatExpansionPanel;
  @ViewChild('filterItems', {static: true}) filterItems: ElementRef;
  originalBusList = [];

  journeyTime = [
    {value: 'All', viewValue: 'Any Time'},
    {value: '600-1159', viewValue: '6 am - 11.59 am'},
    {value: '1200-1759', viewValue: '12pm - 5.59 pm'},
    {value: '1800-2359', viewValue: '6pm - 11.59 pm'},
    {value: '0-559', viewValue: '12 am - 6 am'}
  ];


  filterForm: FormGroup;


  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.filterForm = this.fb.group({
      availableSeat: ['All'],
      busType: ['All'],
      busName: [''],
      price: ['All'],
      journeyTime: ['All']
    });
  }

  ngOnChanges(): void {
    // console.log('hit filter bus');
    this.originalBusList = [...this.busList];
    setTimeout(() => {
      this.clearFilter();
    });
    this.busList.forEach(bus => {
      !this.availableBusesName.includes(bus.busName) ? this.availableBusesName.push(bus.busName) : null;
    });

  }

  get filteredBusName(): string {
    return (this.filterForm.get('busName').value as string).replace(/\s+/g, ' ').trim();
  }
  get filteredBusType(): string {
    return this.filterForm.get('busType').value;
  }
  get filteredAvailableSeat(): string {
    return this.filterForm.get('availableSeat').value;
  }
  get filteredPrice(): string {
    return this.filterForm.get('price').value;
  }
  get filteredJourneyTime(): string {
    return this.filterForm.get('journeyTime').value;
  }


  clearFilter(): void {
    // this.expansionPanel.close();
    this.doFilter = false;
    this.filterForm.patchValue({
      availableSeat: 'All',
      busType: 'All',
      busName: '',
      price: 'All',
      journeyTime: 'All'
    });
    this.filterItems.nativeElement.innerHTML = '';
    this.fiteredBusList.emit(this.originalBusList);
    // console.log('originalbuslist', this.originalBusList);
  }
  openFilter(): void {
    this.expansionPanel.open();
    this.panelOpenState = true;
    // console.log(this.expansionPanel.opened.);
  }

  closeFilter(): void {
    this.expansionPanel.close();
    this.panelOpenState = false;
  }


  filterBus(): void {
    if (this.originalBusList.length === 0) {
      this.originalBusList = Object.assign([], this.busList);
    } else {
      this.busList = this.originalBusList;
    }
    let arr = [];
    const fv: FilterForm = this.filterForm.value;

    // filter out buses if there is preferred bus name
    const busName = fv.busName.replace(/\s+/g, ' ').trim();
    if (busName !== '' && busName !== null && busName !== undefined) {
      for (const bus of this.busList) {
        bus.busName.toLowerCase() === busName.toLowerCase() ? arr.push(bus) : null;
      }
    } else {
      arr = Object.assign([], this.busList);
    }

    // filter out buses if there is preferred journey time
    if (fv.journeyTime !== 'All') {
      // console.log('filtering bus time wise', fv.journeyTime);
      const time = fv.journeyTime.split('-');
      const newArr = [];
      for (const bus of arr) {
        // console.log(+bus.journeyStartTime);
        (+time[0] <= +bus.journeyStartTime && +time[1] >= +bus.journeyStartTime) ?  newArr.push(bus) : null;
      }

      // sort bus according to preferred journey start time
      for (const bus of newArr) {
        newArr.sort((a, b) => (a.journeyStartTime - +time[0]) - (b.journeyStartTime - +time[1]));
      }

      arr = newArr;
    }

    // filter out buses if there is preferred bus type
    if (fv.busType !== 'All') {
      // console.log('filtering bus type wise', fv.busType);
      const newArray = [];
      for (const bus of arr) {
        (bus.busType === fv.busType) ? newArray.push(bus) : null;
      }
      arr = newArray;
    }

    // sort out buses by available seat of there is a choice
    if (fv.availableSeat !== 'All') {
      // console.log('sorting available seat wise', fv.availableSeat);
      if (fv.availableSeat === 'H2L') {
        arr.sort((a, b) => {
          // console.log(b.availableSeat,  a.availableSeat);
          return b.availableSeat - a.availableSeat;
        });
      } else {
        arr.sort((a, b) => {
          // console.log(a.availableSeat,  b.availableSeat);
          return a.availableSeat - b.availableSeat;
        });
      }
    }

    // sort out buses by fare if there is a choice
    if (fv.price !== 'All') {
      // console.log('sorting fare wise', fv.price);
      if (fv.price === 'H2L') {
        arr.sort((a, b) => b.fare - a.fare);
      } else {
        arr.sort((a, b) => a.fare - b.fare);
      }
    }

    this.fiteredBusList.emit(arr);

    this.doFilter = true;
    this.creatFilterString();
    this.panelOpenState = false;
    this.expansionPanel.close();

    // console.log(this.filterForm.value);

  }



  private creatFilterString(): void {
    let filterString = 'Filters: ';

    filterString += this.filteredBusName !== '' ? `<small>Bus Name: </small>${this.filteredBusName} | ` : '';
    if (this.filteredBusType !== 'All') {
      if (this.filteredBusType === 'AC') {
        filterString += ' AC Buses | ';
      } else {
        filterString += ' Non AC Buses | ';
      }
    }
    if (this.filteredPrice !== 'All') {
      if (this.filteredPrice === 'H2L') {
        filterString += ' High to Low Price | ';
      } else {
        filterString += ' Low to High Price | ';
      }
    }
    if (this.filteredAvailableSeat !== 'All') {
      if (this.filteredAvailableSeat === 'H2L') {
        filterString += ' More to Less Available Seat | ';
      } else {
        filterString += ' Less to More Available Seat | ';
      }
    }
    // journeyTime = [
    //   {value: 'All', viewValue: 'Any Time'},
    //   {value: '600-1159', viewValue: '6 am - 11.59 am'},
    //   {value: '1200-1759', viewValue: '12pm - 5.59 pm'},
    //   {value: '1800-2359', viewValue: '6 pm - 11.59 pm'},
    //   {value: '0-559', viewValue: '12 am - 6 am'}
    // ];
    if (this.filteredJourneyTime !== 'All') {
      if (this.filteredJourneyTime === '600-1159') {
        filterString += '<small>Between: </small>6 am - 11.59 am';
      } else if (this.filteredJourneyTime === '1200-1759') {
        filterString += '<small>Between: </small>12 pm - 5.59 pm';
      } else if (this.filteredJourneyTime === '1800-2359') {
        filterString += '<small>Between: </small>6 pm - 11.59 pm';
      } else if (this.filteredJourneyTime === '0-559') {
        filterString += '<small>Between: </small>12 am - 6 am';
      }
    }
    this.filterItems.nativeElement.innerHTML = filterString;

  }

}

interface FilterForm {
  availableSeat: string;
  busType: string;
  busName: string;
  price: string;
  journeyTime: string;
}
