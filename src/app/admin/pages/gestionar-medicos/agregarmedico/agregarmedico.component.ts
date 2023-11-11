import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MedicoService } from '../../services/medico.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoCitaService } from '../../services/tipo-cita.service';

interface Especialidad {
  especialidad_medica: string;
}

@Component({
  selector: 'app-agregarmedico',
  templateUrl: './agregarmedico.component.html',
  styleUrls: ['./agregarmedico.component.scss']
})



export class AgregarmedicoComponent implements OnInit {
 
  especialidades: string[] = [];
  
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private MedicoService: MedicoService, private router: Router, private TipoCitaService: TipoCitaService) {
    this.formulario = this.formBuilder.group({
      rut: ['', [Validators.required, this.rutValidator]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.gmailValidator]],
      telefono: ['', [Validators.required, this.telefonoValidator]],
      direccion: ['', Validators.required],
  
      nacionalidad: [''], 
      password: ['', [Validators.required, this.passwordStrengthValidator]], // Aquí puedes agregar más validadores según tus necesidades
      especialidad_medica: [''], 
    });
  }

  telefonoValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const telefonoRegex = /^\+56 9 \d{4}-\d{4}$/; // Ajusta el regex según el formato deseado
  
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

  gmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
  
    const isGmail = value.endsWith('@gmail.com');
    return !isGmail ? { 'notGmail': true } : null;
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

  ngOnInit(): void {
    this.cargaEspecialidades();
  }
  

  crearMedico() {
    const formData = this.formulario.value;
    console.log(formData);

    this.MedicoService.crearMedico(formData).subscribe(
      (respuesta:any) => {
         // Navegar al Dashboard ya que el registro fue EXITOSO!!
         console.log(respuesta);
         Swal.fire('Mensaje', respuesta.msg, 'success');
      this.router.navigateByUrl('/gestionar-medicos');
      
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error'); //al incluir err.error.msg se Accede al mensaje de error incluido en el backenend en caso de que el correo ya este registrado
    } );
  }

  cargaEspecialidades() {
    this.TipoCitaService.cargaEspecialidades().subscribe(
      data => {
        console.log('ola', data);
        this.especialidades = data.especialidades.map((e: Especialidad) => e.especialidad_medica);
      }
    );
  }
  
  

  




  
}
