import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.pattern(/^[0-9]*$/)],
      direccion: [''],
      foto: [''], 
      nacionalidad: [''], 
      password: ['', [Validators.required, Validators.minLength(8)]], // Aquí puedes agregar más validadores según tus necesidades
      especialidad_medica: [''], 
    });
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
