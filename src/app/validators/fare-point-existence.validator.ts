import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export function farePointValidity(control: FormGroup): ValidationErrors | null {
    const busStopArray = control.get('travelPoints') as FormArray;
    const fareArray = control.get('fare') as FormArray;

    const busStopNameArray = busStopArray.controls.map(bS => bS.get('busStopName').value);
    const fromArray = fareArray.controls.map(farePoint => farePoint.get('from').value);
    const toArray = fareArray.controls.map(farePoint => farePoint.get('to').value);

    for (const stop of fromArray) {
        if (!busStopNameArray.includes(stop)) {
            const index = fromArray.indexOf(stop);
            fareArray.at(index).get('from').setErrors({unexist: 'This Bus Stop Doesn\'t Exist'}, {emitEvent: false});
        }
    }
    for (const stop of toArray) {
        if (!busStopNameArray.includes(stop)) {
            const index = toArray.indexOf(stop);
            fareArray.at(index).get('to').setErrors({unexist: 'This Bus Stop Doesn\'t Exist'}, {emitEvent: false});
        }
    }
    return null;
}
