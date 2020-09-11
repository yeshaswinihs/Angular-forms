import { AbstractControl, ControlContainer, NgControlStatus } from "@angular/forms";

// Cross field validation
// A function accepts one parameter form control and returns an object or null.
// The control parameter does not refer to an individual form Control, instead it refers to the form group 
// for different fields to validate 
// To get hold of  both 'password' and 'confirmPassword' form controls, pass form group as  a parameter

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {

    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password.pristine || confirmPassword.pristine) {
        return null;
    }
    return password && confirmPassword && password.value != confirmPassword.value ? { 'misMatch': true } : null;
}