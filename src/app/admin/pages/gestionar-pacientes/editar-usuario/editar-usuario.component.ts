import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private PacienteService: PacienteService, private ActivatedRoute: ActivatedRoute, private router: Router) {
    this.formulario = this.formBuilder.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: [''],
      telefono: ['', Validators.pattern(/^[0-9]*$/)],
      direccion: [''],
    });
  }
  ngOnInit() {
    this.ActivatedRoute.params.subscribe(params => {
      const usuarioId = params['id'];
      console.log('id',usuarioId)
      if (usuarioId) {
        // Obtén los datos del médico y llénalos en el formulario
        this.PacienteService.obtenerUsuarioPorId(usuarioId).subscribe((response: any) => {
          const usuario = response.medico;
          console.log('Usuario completo:', usuario);
          console.log('RUT del usuario:', usuario.rut);
          this.formulario.patchValue({
            rut: usuario.rut,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            email: usuario.email,
            fecha_nacimiento: usuario.fecha_nacimiento,
            telefono: usuario.telefono,
            direccion: usuario.direccion,  
          });
        });
      }

    });
  }

}
