import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formateDatePipe'
})


export class FormatDatePipe implements PipeTransform{

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    transform(value: number): string {
        if (value !== undefined && value !== null) {
            // console.log(value);
            const date = new Date(value);

            return `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        }

        return null;
    }
}
