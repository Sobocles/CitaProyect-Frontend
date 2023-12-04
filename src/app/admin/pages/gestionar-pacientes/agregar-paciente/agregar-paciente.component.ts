import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors  } from '@angular/forms';
import { PacienteService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.scss']
})
export class AgregarPacienteComponent {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private PacienteService: PacienteService, private router: Router) {
    this.formulario = this.formBuilder.group({
      rut: ['', [Validators.required, this.rutValidator]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      password: ['', [Validators.required, this.passwordStrengthValidator]],
      email: ['', [Validators.required, Validators.email, this.gmailValidator]],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, this.telefonoValidator]],
      direccion: ['', Validators.required],
    });
  }





  telefonoValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const telefonoRegex = /^\+56 9 \d{4}-\d{4}$/;
  
    return telefonoRegex.test(value) ? null : { telefonoInvalido: true };
  }

  gmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
  
    const isGmail = value.endsWith('@gmail.com');
    return !isGmail ? { 'notGmail': true } : null;
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
  
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecialChar = /[.,'!@#$%^&*()_+-]+/.test(value);
  
    const passwordValid = hasUpperCase && hasNumeric && hasSpecialChar;
    return !passwordValid ? { passwordStrength: true } : null;
  }

 

  rutValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.replace(/[.-]/g, '');
    if (!value) {
      return null;
    }
  
    let body = value.slice(0, -1);
    let dv = value.slice(-1).toUpperCase();
  
    if (body.match(/[^0-9]/)) {
      return { rutInvalid: true };
    }
  
    let sum = 0;
    let multiple = 2;
  
    for (let i = body.length - 1; i >= 0; i--) {
      sum = sum + body.charAt(i) * multiple;
      multiple = multiple < 7 ? multiple + 1 : 2;
    }
  
    let dvCalculated = 11 - (sum % 11);
    let dvExpected = dvCalculated === 11 ? '0' : dvCalculated === 10 ? 'K' : dvCalculated.toString();
  
    return dvExpected === dv ? null : { rutInvalid: true };
  }

  crearPaciente() {
    if (this.formulario.invalid) {
      // Marca todos los controles del formulario como tocados
      this.formulario.markAllAsTouched();
      return;
    }
  
    const formData = this.formulario.value;
    console.log(formData);
  
    this.PacienteService.crearPaciente(formData).subscribe(
      (respuesta: any) => {
        // Mensaje de éxito con SweetAlert
        Swal.fire({
          title: '¡Éxito!',
          text: 'El paciente ha sido creado con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          // Redireccionar a la ruta 'gestionar-pacientes' después de cerrar el SweetAlert
          if (result.isConfirmed) {
            this.router.navigate(['/gestionar-pacientes']);
          }
        });
  
      }, (err) => {
        // Mensaje de error con SweetAlert
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
  
  

}
