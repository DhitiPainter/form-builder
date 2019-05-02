import { Component, OnInit, OnChanges, Input, SimpleChange, SimpleChanges, DoCheck } from '@angular/core';
import { InputBase } from '../form-creator/input-base';
import { FormGroup, FormControl } from '@angular/forms';
import { EnumHelper } from './../common/helper/enum.helper';
import { FormInputType } from './../common/enum';

@Component({
  selector: 'app-dynamic-form-generator',
  templateUrl: './dynamic-form-generator.component.html',
  styleUrls: ['./dynamic-form-generator.component.scss']
})
export class DynamicFormGeneratorComponent implements OnInit, OnChanges, DoCheck {

  private _formControls: any;
  dynamicform: FormGroup;
  inputTypes = FormInputType;
  // Intercept input property changes with a setter
  @Input() formControls: InputBase[] = []
  // set formControls(formControls: InputBase[]) {
  //   this._formControls = formControls || null;
  // }

  // get formControls(): InputBase[] | null {
  //   return this._formControls;
  // }

  constructor() { }

  ngDoCheck() {
    if (this.formControls && this.formControls.length > 0 && this.dynamicform) {
      this.dynamicform = new FormGroup({});
      this.formControls.forEach((c: InputBase) => {
        this.dynamicform.addControl(c.name, new FormControl(c.defaultValue, []));
      })

    }
    console.log(this.formControls, this.dynamicform);
  }

  ngOnChanges(change: any) {
    // if (this.formControls && this.formControls.length > 0) {
    //   this.dynamicform = new FormGroup({});
    //   this.formControls.forEach((c: InputBase) => {
    //     this.dynamicform.addControl(c.name, new FormControl(c.defaultValue, []));
    //   })

    // }
    // console.log(this.formControls, this.dynamicform);
    // this.dynamicform.addControl()
  }

  ngOnInit() {
    this.dynamicform = new FormGroup({});
    // this.inputTypes. // =  EnumHelper.get(FormInputType);
  }

}
