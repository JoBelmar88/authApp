import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
    }


    register() {
        console.log(this.miFormulario.value);
        console.log(this.miFormulario.valid);
    }

}
