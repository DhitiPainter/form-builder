import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';
import { LocalStorage } from '../common.constant';

@Injectable({ providedIn: 'root' })
export class FormResolverService implements Resolve<any> {
    constructor(private commonService: CommonService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return {
            formName: this.commonService.getLocalStorageString(LocalStorage.formName),
            formControls: this.commonService.getLocalStorageObject(LocalStorage.formControls)
        };
    }
}
