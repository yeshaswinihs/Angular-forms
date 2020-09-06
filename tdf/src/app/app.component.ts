import { Component } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  topics = ['Angular', 'React', 'Vue'];
  userModel = new User('', 'rob@test.com', 556677888, '', 'morning', true);
//   Even though Angular creates its own object with form Values, there are usecases where it is necessary
// to create our own model and bind that model data to the format. eg shipping address update when clicked on edit.


}
