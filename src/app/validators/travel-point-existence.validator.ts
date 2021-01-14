import { FormArray, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function travelPointExistance(control: FormArray): ValidationErrors | null {

    const arr: string[] = control.controls.map( group => {
        return group.get('busStopName').value;
    });

    for (const busStop of arr) {
        if (arr.filter( stop => stop === busStop).length > 1) {
            const index = arr.lastIndexOf(busStop);
            // console.log(index, busStop);
            control.at(index).get('busStopName').setErrors({nameExists: 'exist'}, {emitEvent: false});
            // return {nameExists: busStop};
        }
    }
    return null;
}
