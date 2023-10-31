import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private PacienteService: PacienteService,) {
    this.formulario = this.formBuilder.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: [''],
      telefono: ['', Validators.pattern(/^[0-9]*$/)],
      genero: ['masculino'], // Valor predeterminado a 'masculino', puedes cambiarlo según tus necesidades
      direccion: [''],
    });
  }

  crearPaciente() {
    const formData = this.formulario.value;
    console.log(formData);

    this.PacienteService.crearPaciente(formData).subscribe(
      (respuesta:any) => {
         // Navegar al Dashboard ya que el registro fue EXITOSO!!
         console.log(respuesta);
         Swal.fire('Mensaje', respuesta, 'success');
      
      
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error'); //al incluir err.error.msg se Accede al mensaje de error incluido en el backenend en caso de que el correo ya este registrado
    } );
  }

}
