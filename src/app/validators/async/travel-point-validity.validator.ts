import { debounceTime, distinctUntilChanged, map, take } from 'rxjs/operators';
import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { of, Observable, BehaviorSubject } from 'rxjs';

export function travelPointValidityValidator(busStopNames: string[]): ValidatorFn {
    // return (control: AbstractControl): Promise<ValidationErrors | null> => {
    //     const value: string = control.value;
    //     const v = new Promise((res, rej) => {
    //         setTimeout(() => {
    //             res( (value && !busStopNames.includes(value)) ? {busUnavailable: `${value}`} : null);
    //         }, 1500);
    //     });
    //     return v;
    // };

    // console.log('from validator. busstopnames', busStopNames);

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const value: string = control.value;
        let v: Observable<ValidationErrors | null>;
        return v = new Observable(observer => {
            setTimeout(() => {
                observer.next((value && !busStopNames.includes(value)) ? {busUnavailable: `${value}`} : null);
                observer.complete();
            }, 1500);
        });

    };
}
