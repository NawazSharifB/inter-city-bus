import { FormGroup, ValidationErrors } from '@angular/forms';

export class DateTimeValidityValidator {
    static validateDateTime(control: FormGroup): ValidationErrors | null {

        const currentDate = new Date();
        const inputDate = control.get('date');
        const time = control.get('time');

        if (
            inputDate.value !== null && inputDate.value !== '' && inputDate.value !== undefined &&
            time.value !== null && time.value !== '' && time.value !== undefined &&
            currentDate.getDate() === (inputDate.value as Date).getDate() &&
            currentDate.getFullYear() === (inputDate.value as Date).getFullYear() &&
            currentDate.getMonth() === (inputDate.value as Date).getMonth() &&

            (currentDate.getHours() === +(time.value as string).split(':')[0] ||
            currentDate.getHours() > +(time.value as string).split(':')[0]) &&

            (currentDate.getMinutes() === +(time.value as string).split(':')[1] ||
            currentDate.getMinutes() > +(time.value as string).split(':')[1])
        ) {
            return {passedTime: 'Time Has Already Passed'};
        }

        return null;
    }
}