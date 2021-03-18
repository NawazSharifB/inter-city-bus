import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formateDatePipe'
})


export class FormatDatePipe implements PipeTransform{

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    transform(value: any): string {

        if (value !== undefined && value !== null) {
            if (value['_seconds']) {
                const date = new Date(value['_seconds']);
                return `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            } else {
                const date = new Date(value);
                // console.log(date);
                return `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            }

        }

        return null;
    }
}
