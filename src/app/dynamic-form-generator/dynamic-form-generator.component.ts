import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { FormService } from '../common/service/form.service';

import { FormInputType } from './../common/enum';
import { InputBase } from '../form-creator/input-base';

@Component({
  selector: 'app-dynamic-form-generator',
  templateUrl: './dynamic-form-generator.component.html',
  styleUrls: ['./dynamic-form-generator.component.scss']
})
export class DynamicFormGeneratorComponent implements OnInit {

  formName: string;
  dynamicform: FormGroup;
  inputTypes = FormInputType;
  formControls: InputBase[] = [];

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.dynamicform = new FormGroup({});

    this.formService.FormControls.subscribe((res: any) => {
      this.formName = res.formName;
      if (res && this.dynamicform) {
        this.formControls.push(res);
        // Sort formControls
        this.sortControls();
        // Add form field on update
        this.formControls.forEach((c: InputBase) => {
          this.dynamicform.addControl(c.name, new FormControl(c.defaultValue, []));
        });
      }
    });
  }

  sortControls() {
    return this.formControls.sort((a, b) => {
      return a.order - b.order;
    });
  }

  removeField(input: InputBase) {
    console.log(input);
    this.formControls.splice(this.formControls.indexOf(this.formControls.find(x => x.name === input.name)), 1)
    this.dynamicform.removeControl(input.name);
  }
}
