import { FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';


// export function PasswordRePasswordValidator(control: FormGroup): Observable<ValidationErrors | null> {
//     const password = control.get('password').value;
//     const rePassword = control.get('rePassword').value;

//     console.log('password', password);
//     console.log(rePassword);

//     let v: Observable<ValidationErrors | null>;

//     return v = new Observable(observer => {

//         if (password && rePassword) {
//             console.log('password exists');
//             if (password === rePassword) {
//                 observer.next(null);
//                 observer.complete();
//             } else {
//                 setTimeout(() => {
//                     observer.next({unMatchPassword : 'Password Doesn\'t Match'});
//                     observer.complete();
//                 }, 1500);
//             }
//         } else {
//             console.log('password isnt exists')
//             observer.next(null);
//             observer.complete();
//         }

//     });
// }



export function PasswordRePasswordValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password').value;
    const rePassword = control.get('rePassword').value;

    // console.log(password);
    // console.log(rePassword);

    if (password && rePassword && password !== rePassword) {
        return {unMatchPassword : 'Password Doesn\'t Match'};
    }

    return null;

}





// export function PasswordRePasswordValidator(control: FormGroup): Promise<ValidationErrors | null> {
//     const password = control.get('password').value;
//     const rePassword = control.get('rePassword').value;

//     console.log('password', password);
//     console.log(rePassword);

//     let v: Observable<ValidationErrors | null>;

//     return new Promise((res, rej) => {
//         if (password && rePassword) {
//             if (password === rePassword) {
//                 res(null);
//             } else {
//                 setTimeout(() => {
//                     res({unMatchPassword : 'Password Doesn\'t Match'});
//                 }, 1500);
//             }
//         } else {
//             res(null);
//         }
//     });

// }
