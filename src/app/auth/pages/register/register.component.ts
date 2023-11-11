import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup;

  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router) {
    this.miFormulario = this.fb.group({
      rut: ['', [Validators.required, this.rutValidator]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator]],
      fecha_nacimiento: ['', [Validators.required, this.validarMayorDeEdad(18)]],
      telefono: ['', [Validators.required, this.telefonoValidator]],
      direccion: ['', Validators.required]
    });
  }

  validarMayorDeEdad(edadMinima: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const valor = control.value;
      const hoy = new Date();
      const fechaNacimiento = new Date(valor);
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const m = hoy.getMonth() - fechaNacimiento.getMonth();
  
      if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
  
      return edad >= edadMinima ? null : {'menorDeEdad': {value: control.value}};
    };
  }

  telefonoValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const telefonoRegex = /^\+56 9 \d{4}-\d{4}$/;

    return telefonoRegex.test(value) ? null : { telefonoInvalido: true };
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
    const value = control.value?.replace(/[.-]/g, ''); // Remover puntos y guiones
    if (!value) {
      return null;
    }

    let body = value.slice(0, -1);
    let dv = value.slice(-1).toUpperCase();

    // Si no es un RUT válido (por ejemplo, caracteres no numéricos en el cuerpo)
    if (body.match(/[^0-9]/)) {
      return { rutInvalid: true };
    }

    // Calcular dígito verificador
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

  // ...resto del código del componente...


  ngOnInit(): void {
  }


  registrar() {
    if (this.miFormulario.valid) {
        const formData = this.miFormulario.value;
        console.log(formData);

        // Llama al servicio AuthService para crear el usuario
        this.AuthService.crearUsuario(formData).subscribe(
            (respuesta) => {
                console.log(respuesta);

                // Mostrar una alerta de éxito usando SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro completado!',
                    text: 'Te has registrado exitosamente.',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    // Navegar al Dashboard ya que el registro fue EXITOSO!!
                    this.router.navigateByUrl('/');
                });

            },
            (err) => {
                Swal.fire('Error', err.error.msg, 'error'); 
            }
        );
    } 
}

}
