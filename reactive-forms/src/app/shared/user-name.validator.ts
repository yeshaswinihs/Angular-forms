import { AbstractControl, PatternValidator, ValidatorFn } from "@angular/forms";
import { ValueTransformer } from '@angular/compiler/src/util';

// The validator function returns either of two values, when the validation fails it returns an object 
// where the key is of type string and value is of type any.and if the validation pass it returns null.

// This validator function can accept only one parameter if.e., form control
// export function forbiddenNameValidator(control: AbstractControl): { [key: string]: any } | null {
//     // use the test operator on the 'admin' pattern. test operator returns boolean
//     const forbidden = /admin/.test(control.value);
//     return forbidden ? { 'forbiddenName': { value: control.value } } : null;
// }

// Created a factory function that returns a validator function
export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        // use the test operator on the 'admin' pattern. test operator returns boolean
        const forbidden = forbiddenName.test(control.value);
        return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    }
}