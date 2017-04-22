import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Register } from './register.component';
import { RegisterService } from './register.service'
import { routing }       from './register.routing';

import { Angular2TokenService } from '../../services/token-service/auth-token.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Register
  ],
  providers:[
    RegisterService,
    Angular2TokenService
  ]
})
export class RegisterModule {}
