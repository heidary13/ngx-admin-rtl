import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbAuthJWTToken, getDeepFromObject,
} from '@nebular/auth';
import {
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
} from '@nebular/theme';
import { NgxAuthRoutingModule } from './auth.routing.module';
import { NgxLoginComponent } from './login/login.component';
import {RestService} from '../../../Rest/rest.service';
import {HttpResponse} from '@angular/common/http';

export function tokenGetter(module: string, res: HttpResponse<Object>) {
  return JSON.stringify(res.body['success']['token']);
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        NgxAuthRoutingModule,
        NbAuthModule.forRoot({
            strategies: [
                NbPasswordAuthStrategy.setup({
                    name: 'email',

                    baseEndpoint: RestService.getUrl(),
                    token: {
                        class: NbAuthJWTToken,
                        key: 'token',
                        getter: tokenGetter,
                    },
                    login: {
                        // ...
                        endpoint: 'login',
                        redirect: {
                            success: '/pages/dashboard',
                        },
                    },
                    logout: {
                        method: 'POST',
                        endpoint: 'logout',
                    },
                }),
            ],
            forms: {},
        }),
    ],
    declarations: [NgxLoginComponent],
})
export class NgxAuthModule {}
