import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './message.service';
import { MessageErrorHandler } from './error-handler';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [MessageService, { provide: ErrorHandler, useClass: MessageErrorHandler}]
})
export class ServicesModule { }
