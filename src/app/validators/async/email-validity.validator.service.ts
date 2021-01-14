import { environment } from './../../../environments/environment';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidityValidatorService {

  constructor(
    private http: HttpClient
  ) { }

  checkEmailValidity(inUseEmail?: string): ValidationErrors | null {

    return (control: AbstractControl) => {

      if (inUseEmail && inUseEmail === control.value) {
        return null;
      }

      return control.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        take(1),
        switchMap(email => {
          return this.http.get(`${environment.validatorServerUrl}email-validity/${email}`);
        }),
        take(1),
        map( (data: {length: number}) => {
          return data.length ? {unAvailable: 'Email is Already In Use'} : null;
        }),
        catchError(error => throwError(error))
      );
    };
  }
}
