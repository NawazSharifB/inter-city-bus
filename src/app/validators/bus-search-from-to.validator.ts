import { FormGroup, ValidationErrors } from '@angular/forms';

export class BusSearchFromToValidator {

    static fromToValidate(control: FormGroup): ValidationErrors | null {

        const startPoint = control.get('from');
        const endPoint = control.get('to');
        // console.log(startPoint.value);
        // console.log(endPoint.value);

        if (
            startPoint.touched && endPoint.touched && startPoint.value !== '' && startPoint.value !== null && startPoint.value !== undefined
            && endPoint.value !== '' && endPoint.value !== null && endPoint.value !== undefined
        ) {
            // console.log('got triggered');
            if ((startPoint.value as string).toLowerCase().replace(/\s+/g, ' ').trim() === (endPoint.value as string).toLowerCase().replace(/\s+/g, ' ').trim()) {
                // startPoint.setErrors({sameName: 'Same Name'});
                // endPoint.setErrors({sameName: 'Same Name'});
                return {sameName: 'Same Name'};
                // return null;
            } else {
                // console.log('got called');
                // startPoint.updateValueAndValidity({emitEvent: false});
                // endPoint.clearValidators();
                return null;
            }
        }
        return null;
    }
}
