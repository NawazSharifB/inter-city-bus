import { FormArray, ValidationErrors } from '@angular/forms';
import { from } from 'rxjs';
export function travelPointFareExistance(control: FormArray): ValidationErrors | null {

    const fromArr: string[] = control.controls.map( group => {
        return group.get('from').value;
    });
    const toArr: string[] = control.controls.map( group => {
        return group.get('to').value;
    });

    const strArr: string[] = [];
    for (let i = 0; i < fromArr.length; i++) {
        if (fromArr[i] && toArr[i]) {
            strArr.push(fromArr[i] + toArr[i]);
        }
    }

    for (const str of strArr) {
        if (strArr.filter( st => st === str).length > 1) {
            const index = strArr.lastIndexOf(str);
            control.at(index).setErrors({alreadyExists: 'This Fare Module Already Exists'}, {emitEvent: false});
        }
    }

    // for (const busStop of arr) {
    //     if (arr.filter( stop => stop === busStop).length > 1) {
    //         const index = arr.lastIndexOf(busStop);
    //         console.log(index, busStop);
    //         control.at(index).get('busStopName').setErrors({nameExists: 'exist'}, {emitEvent: false});
    //         // return {nameExists: busStop};
    //     }
    // }
    return null;
}
