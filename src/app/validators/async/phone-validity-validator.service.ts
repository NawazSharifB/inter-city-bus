import { environment } from './../../../environments/environment';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors, AbstractControl } from '@angular/forms';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneValidityValidatorService {

  constructor(
    private http: HttpClient
  ) { }

  checkPhoneValidity(inUsePhone?: number): ValidationErrors | null {
    return (control: AbstractControl) => {
      if (inUsePhone && inUsePhone === control.value) {
        return null;
      }
      return control.valueChanges.pipe(
        debounceTime(4000),
        distinctUntilChanged(),
        switchMap( value => {
          return this.http.get(`${environment.validatorServerUrl}phone-validity/${value}`);
        }),
        take(1),
        map( (data: {length: number}) => {
          return data.length ? {unAvailable: 'Phone is Already In Use'} : null;
        }),
        catchError(error => throwError(error))
      );
    };
  }
}
