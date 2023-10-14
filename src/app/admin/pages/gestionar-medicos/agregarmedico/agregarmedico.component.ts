import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from '../../services/medico.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregarmedico',
  templateUrl: './agregarmedico.component.html',
  styleUrls: ['./agregarmedico.component.scss']
})
export class AgregarmedicoComponent {
 
  
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private MedicoService: MedicoService, private router: Router) {
    this.formulario = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.pattern(/^[0-9]*$/)],
      direccion: [''],
      foto: [''], 
      nacionalidad: [''], 
      titulo: [''], 
    });
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

  




  
}
