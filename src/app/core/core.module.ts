import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { StatePipe } from './state.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from '../model/model.module';
import { SHARED_STATE, SharedState, MODES } from './shared-state.model';
import { ServicesModule } from '../services/services.module';
import { MessageService } from '../services/message.service';
import { Model } from '../model/repository.model';
import { Subject } from 'rxjs';
import { Message } from '../model/message.model';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [FormComponent, TableComponent, StatePipe],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ModelModule,
    ServicesModule,
    PaginationModule.forRoot()
  ],
  exports: [TableComponent, FormComponent],
  providers: [{
    provide: SHARED_STATE,
    deps: [MessageService, Model],
    useFactory: (messageService, model) => {
      const subject = new Subject<SharedState>();
      subject.subscribe(m => {
        messageService.reportMessage(
        // tslint:disable-next-line: triple-equals
        new Message(MODES[m.mode] + ' ' +  (m.id != undefined
          ? `${model.getProduct(m.id).name}` : '')));
      });
      return subject;
    }
  }]
})
export class CoreModule { }
