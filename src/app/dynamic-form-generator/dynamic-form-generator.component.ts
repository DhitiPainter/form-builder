import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { FormService } from '../common/service/form.service';

import { FormInputType } from './../common/enum';
import { InputBase } from '../form-creator/input-base';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common/service/common.service';
import { LocalStorage } from '../common/common.constant';
import { ExcelService } from '../common/service/excel.service';

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

  @Output() isSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formService: FormService, private route: ActivatedRoute,
    private router: Router, private commonService: CommonService, private exportService: ExcelService) { }

  ngOnInit() {
    this.dynamicform = new FormGroup({});

    this.route.data.subscribe((data: any) => {
      this.formName = data && data.formName ? data.formName : '';
      this.formControls = data && data.formControls ? data.formControls : [];
    });

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
      this.commonService.setLocalStorageString(LocalStorage.formName, this.formName);
      this.commonService.setLocalStorageObject(LocalStorage.formControls, this.formControls);
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

  shareForm() {
    // this.router.navigate(['form-response'], { replaceUrl: true });
    window.open('http://localhost:4200/form-response', '_blank');
  }

  submitResponse() {
    this.isSubmitted.emit(true);
    this.exportService.exportAsExcelFile([this.dynamicform.value], this.formName);
  }
}
