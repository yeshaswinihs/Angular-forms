import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  topics = ['Angular', 'React', 'Vue'];
  userModel = new User('', 'rob@test.com', 5566778889, 'default', 'morning', true);
  //   Even though Angular creates its own object with form Values, there are usecases where it is necessary
  // to create our own model and bind that model data to the format. eg shipping address update when clicked on edit.

  constructor(private enrollmentService: EnrollmentService) { }
  topicHasError = true;
  submitted = false;
  errorMessage;

  validateTopic(value) {
    if (value === "default") {
      this.topicHasError = true;
    }
    else {
      this.topicHasError = false;
    }

  }
  onSubmit() {
    this.submitted = true;
    console.log(this.userModel);
    this.enrollmentService.enroll(this.userModel)
      .subscribe(
        data => console.log('Success', data),
        error => this.errorMessage = error.statusText
      )
  }
}
