import { Component } from '@angular/core';
import { RequestService } from '../../../../Rest/request.service';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-login',
    template: ``,
})
export class NgxLogoutComponent {
    constructor(
        Request: RequestService,
        protected router: Router,
        private authService: NbAuthService,
        private nbTokenService: NbTokenService,
    ) {
        this.authService.getToken().subscribe((token) => {
            Request.UserLogout(token.getValue()).subscribe((ok) => {
                this.nbTokenService.clear().subscribe(async (result) => {
                    await this.router.navigateByUrl('auth');
                    return window.location.reload();
                });
            }); // here we receive a payload from the token and assigns it to our `user` variable
        });
    }
}
