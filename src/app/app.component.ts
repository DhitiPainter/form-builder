import { Component, OnInit } from '@angular/core';
import { InputBase } from './form-creator/input-base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cygnet-forms-web';
  controls: InputBase[] = [];
  formName: string;

  generateForm(formControl: any) {
    const value: any = formControl;
    this.formName = value.formName;
    delete value['formName'];
    this.controls.push(value);
  }
}
