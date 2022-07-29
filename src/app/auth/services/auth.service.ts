import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interface.auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = environment.baseUrl;
    private _usuario!: Usuario;

    get usuario() {
        return { ...this._usuario };
    }

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        const url = `${this.baseUrl}/auth`;
        const body = { email, password };

        return this.http.post<AuthResponse>(url, body)
            .pipe(
                tap(resp => {
                    localStorage.setItem('token', resp.token!)
                    if (resp.ok) {
                        this._usuario = {
                            nombre: resp.nombre!,
                            uid: resp.uid!
                        }
                    }
                }),
                map(resp => resp),
                catchError(err => of(err.error)
                ));
    }

    validarToken(): Observable<boolean>{
        const url = `${this.baseUrl}/auth/renew`;
        const headers = new HttpHeaders()
            .set('x-token', localStorage.getItem('token') || '');
        return this.http.get<AuthResponse>( url, { headers } )
            .pipe(
                map( resp => {
                    localStorage.setItem('token', resp.token!)
                    if (resp.ok) {
                        this._usuario = {
                            nombre: resp.nombre!,
                            uid: resp.uid!
                        }
                    }
                    return resp.ok;
                }),
                catchError( err => of(false))
            );
    }

    createUser(nombre: string, email: string, password: string) {
        const url = `${this.baseUrl}/auth/new`;
        const body = { nombre, email, password };

        return this.http.post<AuthResponse>(url, body)
            .pipe(
                map( resp => {
                    localStorage.setItem('token', resp.token!)
                    if(resp.ok) {
                        this._usuario = {
                            uid: resp.uid!,
                            nombre,
                            email,
                            password
                        }
                    }
                    return resp.ok;
                }),
                catchError( err => of(err.error))
            );
    }

    logout(){
        localStorage.clear();
    }
}
