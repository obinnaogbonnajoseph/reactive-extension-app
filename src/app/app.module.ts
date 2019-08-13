import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormComponent } from './core/form/form.component';
import { TableComponent } from './core/table/table.component';
import { MessageComponent } from './message/message.component';
import { CoreModule } from './core/core.module';
import { ModelModule } from './model/model.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ModelModule,
    ServicesModule
  ],
  declarations: [MessageComponent],
  providers: [],
  bootstrap: [TableComponent, FormComponent, MessageComponent]
})
export class AppModule { }
