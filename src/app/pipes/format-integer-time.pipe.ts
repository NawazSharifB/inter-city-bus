import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatIntegerTime'})

export class FormatIntegerTimePipe implements PipeTransform {

    constructor(private cdRef: ChangeDetectorRef) {}

    transform(value: number): string {
        // this.cdRef.detectChanges();

        if (value) {
            let meridiem = 'am';

            if (value < 1200) {
                return createTime(value, meridiem);
            } else if (value < 1300) {
                meridiem = 'pm';
                return createTime(value, meridiem);
            } else {
                meridiem = 'pm';
                value = value - 1200;
                return createTime(value, meridiem);
            }

        }

        function createTime(time: number, meridiem: string): string {
            const timeStr = time.toString().padStart(4, '0');
            const arr = timeStr.split('');
            return `${arr[0]}${arr[1]}.${arr[2]}${arr[3]} ${meridiem}`;
        }

        return null;
    }
}
