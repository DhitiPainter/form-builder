import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

import { SnackbarService } from '../common/service/snackbar.service';
import { FormService } from '../common/service/form.service';
import { EnumHelper } from './../common/helper/enum.helper';

import { FormInputType } from './../common/enum';
import { InputBase } from './input-base';
import { InputOption } from './input-option';

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss']
})
export class FormCreatorComponent implements OnInit {

  isSubmitted: boolean = false;
  inputTypes: any;
  cygnetForm: FormGroup;
  options: InputOption[] = [];
  formName: string = '';
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private snackService: SnackbarService, private formService: FormService) { }

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
      formName: new FormControl('', [Validators.maxLength(50), Validators.required]),
      type: new FormControl('', [Validators.required]),
      defaultValue: new FormControl('', []),
      name: new FormControl('', [Validators.required]),
      order: new FormControl('', [Validators.required]),
    });
  }

  addOptions(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add option
    if ((value || '').trim()) {
      this.options.push({ name: value.trim(), value: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.cygnetForm.controls.options.setValue(this.options);
  }

  removeOptions(option: InputOption): void {
    const index = this.options.indexOf(option);
    if (index >= 0) {
      this.options.splice(index, 1);
    }
    this.cygnetForm.controls.options.setValue(this.options);
  }

  onSubmit() {
    const buildForm: InputBase = this.cygnetForm.value;
    if (parseInt(buildForm.type, 10) === FormInputType.select
      || parseInt(buildForm.type, 10) === FormInputType.radio) {
      buildForm.options = this.options;
    }
    this.isSubmitted = true;
    if (this.cygnetForm.valid) {
      if (!this.cygnetForm.controls.type.value) {
        this.snackService.notify('Input type is missing');
        return;
      }
      this.formName = this.cygnetForm.value.formName;
      this.isSubmitted = false;
      // this.cygnetForm.reset();
      this.clearValidators('type');
      this.clearValidators('name');
      this.clearValidators('order');
      // Set default values
      this.cygnetForm.controls.formName.setValue(this.formName);
      this.cygnetForm.controls.type.setValue('');
      this.cygnetForm.controls.type.setValidators([Validators.required]);
      this.cygnetForm.controls.name.setValue('');
      this.cygnetForm.controls.name.setValidators([Validators.required]);
      this.cygnetForm.controls.order.setValue('');
      this.cygnetForm.controls.order.setValidators([Validators.required]);
      // Add value to subscribe
      this.formService.update(buildForm);
    } else {
      this.snackService.notify('Form is not valid');
    }
  }

  clearValidators(controllerName) {
    this.cygnetForm.controls[controllerName].clearValidators();
    this.cygnetForm.controls[controllerName].updateValueAndValidity({ emitEvent: false, onlySelf: true });
    this.cygnetForm.updateValueAndValidity({ emitEvent: false, onlySelf: true });
  }

}
