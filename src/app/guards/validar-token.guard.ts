import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
    constructor (private as: AuthService,
                private router: Router) {}

    canActivate(): Observable<boolean> | boolean {
        console.log('canActive');
        return this.as.validarToken()
            .pipe(
                tap(valid => {
                    if( !valid ){
                        this.router.navigateByUrl('/auth')
                    }
                })
            );
    }
    canLoad(): Observable<boolean> | boolean {
        console.log('canLoad');
        return true;
    }
}
