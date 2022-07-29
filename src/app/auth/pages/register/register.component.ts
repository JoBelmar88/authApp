import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: []
})
export class RegisterComponent {

    miFormulario: FormGroup = this.fb.group({
        nombre: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    constructor(private fb: FormBuilder,
        private as: AuthService) { };

    register() {
        const { nombre, email, password } = this.miFormulario.value;

        this.as.createUser(nombre, email, password)
            .subscribe(ok => {
                if (ok === true) {
                    Swal.fire('Guardado correctamente', `¡Usuario ${nombre} guardado con éxito!`, 'warning');
                } else {
                    Swal.fire('Error', ok.msg, 'error');
                }
            });

    };



}
