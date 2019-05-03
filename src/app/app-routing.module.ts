import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicFormGeneratorComponent } from './dynamic-form-generator/dynamic-form-generator.component';
import { FormResolverService } from './common/service/form-resolver.service';

const routes: Routes = [
  {
    path: 'form-response',
    component: DynamicFormGeneratorComponent,
    pathMatch: 'full',
    resolve: { formName: FormResolverService },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
