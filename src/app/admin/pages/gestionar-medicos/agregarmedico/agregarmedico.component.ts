import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MedicoService } from '../../services/medico.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoCitaService } from '../../services/tipo-cita.service';
import { rutValidator } from 'src/app/shared/Validators/rut-validator';
import { phoneValidator } from 'src/app/shared/Validators/phone-validator';
import { passwordStrengthValidator } from 'src/app/shared/Validators/password-strength-validator';

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
      rut: ['', [Validators.required, rutValidator()]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.gmailValidator]],
      telefono: ['', [Validators.required, phoneValidator()]],
      direccion: ['', [Validators.required, Validators.maxLength(66)]], 
      nacionalidad: ['', Validators.required],
      password: ['', [Validators.required, passwordStrengthValidator()]], 
      especialidad_medica: ['', Validators.required], 
    });
  }


  gmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
  
    const isGmail = value.endsWith('@gmail.com');
    return !isGmail ? { 'notGmail': true } : null;
  }



  ngOnInit(): void {
    this.cargaEspecialidades();
  }
  

  crearMedico() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
  
    const formData = this.formulario.value;
    console.log(formData);
  
    this.MedicoService.crearMedico(formData).subscribe(
      (respuesta:any) => {
        console.log(respuesta);
        Swal.fire('Mensaje', respuesta.msg, 'success');
        this.router.navigateByUrl('/gestionar-medicos');
      }, 
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      } 
    );
  }
  
  

  cargaEspecialidades() {
    this.TipoCitaService.cargaEspecialidades().subscribe(
      data => {
       
        this.especialidades = data.especialidades.map((e: Especialidad) => e.especialidad_medica);
      }
    );
  }
  
  

  




  
}
