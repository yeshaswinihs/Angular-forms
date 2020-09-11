import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PasswordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { Observable } from 'rxjs';
import { RegistartionService } from './registartion.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  registrationForm: FormGroup;


  constructor(private fb: FormBuilder,
    private registrationService: RegistartionService) {
  }

  ngOnInit() {
    // Using FormBuilder way of creating form model
    this.registrationForm = this.fb.group({
      // The first element in the array is the default value for the form control , 2nd element is the 
      // array is where u specify the validation rules for the form control.
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      // defined it as a form array
      alternateEmails: this.fb.array([])
    }, { validators: PasswordValidator });

    //  Apply conditional validation- if user clicks on checkbox, email field is required field, else not mandatory
    // valueChanges returns an Observable, need to subscribe it.
    // Important properties and methods are valueChanges, setValidators, clearValidators, updateValueAndValidity.
    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if (checkedValue) {
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }
      // This is called to ensure correct status is reflected
      email.updateValueAndValidity();
    });
  }

  // Using formGroup and formControl classes for building form model

  // registrationForm = new FormGroup(
  //   {
  //     userName: new FormControl('Vishwas'),
  //     password: new FormControl(''),
  //     confirmPassword: new FormControl(''),
  //     address: new FormGroup({
  //       city: new FormControl(),
  //       state: new FormControl(),
  //       postalCode: new FormControl()
  //     })
  //   }
  // );

  // Managing control values

  // The setValue method accepts an object that matches the structure of the form group with control names as Keys.
  // setValue method can be called either on the form control class or form group class.
  // If we remove address, will get an error "Must supply a value for form control with name: 'address'", setValue is very strict about maintaining the structure of the form group.You have to pass all the form control values .
  // But if we have to set value for only few of the field, make use of patchValue() MethodCall.

  loadApiData() {
    this.registrationForm.setValue({
      userName: 'Bruce',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'city',
        state: 'State',
        postalCode: '1213'
      }
    });
  }
  //  Validation rules are specified in the component class instead of the template
  // 1. Apply validation rules to a form control.
  // 2. provide visual feedback for teh validation.- in the template
  // 3. Display the appropriate error message for the validation. - in the template


  //getter for userName control
  get userName() {
    return this.registrationForm.get('userName');
  }

  //getter for email control
  get email() {
    return this.registrationForm.get('email');
  }

  //getter for email control
  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  // Create a method that can be called to dynamically insert form controls into the form array

  addAlternateEmails() {
    this.alternateEmails.push(this.fb.control(''));
  }
  // Custom validation
  // Defined  separate validation functions in PasswordValidator.validator.ts and user-name.validator.ts

  onSubmit() {
    console.log(this.registrationForm.value);
    this.registrationService.register(this.registrationForm.value)
      .subscribe(response => console.log('Success', response),
        error => console.log('Error', error));
  }
}
