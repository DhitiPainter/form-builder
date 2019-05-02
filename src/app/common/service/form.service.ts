import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

import { InputBase } from 'src/app/form-creator/input-base';

@Injectable()
export class FormService {
    constructor() { }

    private _formControls = new Subject<InputBase>();
    FormControls = this._formControls.asObservable()

    update(controls: InputBase) {
        this._formControls.next(controls);
    }
} 
