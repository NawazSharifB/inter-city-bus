import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatTime'})

export class FormatTimePipe implements PipeTransform{

    constructor(private cdRef: ChangeDetectorRef) {}

    transform(value: string): string {
        this.cdRef.detectChanges();

        if (value) {
            const arr = value.split(':');
            let hour: any;
            const  min = arr[1];
            let meridiem = 'am';

            if (+arr[0] === 0) {
                hour = 12;
            } else if (+arr[0] === 12) {
                meridiem = 'pm';
                hour = 12;
            } else if (+arr[0] > 12) {
                meridiem = 'pm';
                hour = +arr[0] - 12;
            } else {
                hour = +arr[0];
            }

            return `${hour}.${min} ${meridiem}`;

        }

        return null;
    }
}

