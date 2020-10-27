import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    NbAuthModule,
    NbPasswordAuthStrategy,
    NbAuthJWTToken,
} from '@nebular/auth';
import {
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
} from '@nebular/theme';
import { NgxAuthRoutingModule } from './auth.routing.module';
import { NgxLoginComponent } from './login/login.component';

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
                    name: 'mobile',

                    baseEndpoint:
                        'http://localhost:8000/',
                    token: {
                        class: NbAuthJWTToken,
                        key: 'token',
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
