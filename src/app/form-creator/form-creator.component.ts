import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormInputType } from './../common/enum';
import { EnumHelper } from './../common/helper/enum.helper';
import { InputBase } from './input-base';
import { InputOption } from './input-option';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { SnackbarService } from '../common/service/snackbar.service';

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss']
})
export class FormCreatorComponent implements OnInit {

  inputTypes: any;
  cygnetForm: FormGroup;
  options: InputOption[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Output() formControls: EventEmitter<InputBase> = new EventEmitter<InputBase>();

  constructor(private snackService: SnackbarService) { }

  ngOnInit() {
    this.inputTypes = EnumHelper.getEnumWithDescriptions(FormInputType);
    console.log(this.inputTypes);
    this.createForm();

    this.cygnetForm.controls.type.valueChanges.subscribe((t: any) => {
      if (parseInt(t) === FormInputType.select || parseInt(t) === FormInputType.radio) {
        this.cygnetForm.addControl('options', new FormControl('', Validators.required));
      } else {
        this.cygnetForm.removeControl('options');
      }
    });
  }

  createForm() {
    this.cygnetForm = new FormGroup({
      formName: new FormControl('', [Validators.maxLength(50)]),
      // typeArray: new FormArray([])
      type: new FormControl('', [Validators.required]),
      defaultValue: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      // options: new FormControl('', []),
      order: new FormControl('', [Validators.required]),
    });
  }

  addOptions(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.options.push({ name: value.trim(), value: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeOptions(option: InputOption): void {
    const index = this.options.indexOf(option);
    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }

  onSubmit() {
    const buildForm: InputBase = this.cygnetForm.value;
    if (parseInt(buildForm.type, 10) === FormInputType.select
      || parseInt(buildForm.type, 10) === FormInputType.radio) {
      buildForm.options = this.options;
    }
    // if (this.cygnetForm.valid) {
    //   this.formControls.emit(buildForm);
    // } else {
    //   this.snackService.notify('Form is not valid');
    // }
    this.formControls.emit(buildForm);
    console.log(this.formControls);
  }

}
