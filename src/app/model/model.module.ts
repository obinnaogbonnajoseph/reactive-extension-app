import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RestDataSource, REST_URL } from './rest.datasource';
import { Model } from './repository.model';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [Model, RestDataSource, { provide: REST_URL, useValue: `http://localhost:3500/products`}]
})
export class ModelModule { }
