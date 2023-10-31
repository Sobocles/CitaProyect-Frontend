import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.scss']
})
export class EditarMedicoComponent implements OnInit {
  formulario: FormGroup;;

  constructor(private formBuilder: FormBuilder, private MedicoService: MedicoService, private ActivatedRoute: ActivatedRoute, private router: Router) {
    this.formulario = this.formBuilder.group({
      rut: ['', Validators.required],
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
  ngOnInit() {
    this.ActivatedRoute.params.subscribe(params => {
      const medicoId = params['id'];
      if (medicoId) {
        // Obtén los datos del médico y llénalos en el formulario
        this.MedicoService.obtenerMedicoPorId(medicoId).subscribe((response: any) => {
          const medico = response.medico;
          console.log(medico);
          this.formulario.patchValue({
            id: medico.id,
            nombre: medico.nombre,
            apellidos: medico.apellidos,
            email: medico.email,
            telefono: medico.telefono,
            direccion: medico.direccion,
            foto: medico.foto,
            nacionalidad: medico.nacionalidad,
            titulo: medico.titulos,
          });
        });
      }

    });
  }

  editarMedico() {
    Swal.fire({
      title: '¿Editar médico?',
      text: 'Esta a punto de editar los datos del médico. ¿Desea continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        if (this.formulario.valid) {
          const medicoEditado = this.formulario.value;
          this.MedicoService.editarMedico(medicoEditado).subscribe(
            (response) => {
              Swal.fire('Éxito', 'Médico editado exitosamente', 'success');
              this.router.navigateByUrl('/gestionar-medicos');
            },
            (error) => {
              Swal.fire('Error', 'Hubo un error al editar el médico', 'error');
              // Manejar errores, como mensajes de error o reversiones de cambios en el formulario.
            }
          );
        }
      }
    });
  }

}
