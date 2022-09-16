import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './services/auth.guards';
import { PauseDirective } from './directives/pause.directive';



@NgModule({
  declarations: [
    PauseDirective
  ],
  imports: [
    CommonModule
  ],
  providers:[
    AuthGuard
  ]
})
export class SharedModule { }
