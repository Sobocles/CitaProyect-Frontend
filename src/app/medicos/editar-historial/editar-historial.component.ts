import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AuthService } from '../../auth/services/auth.service';
import { HistorialService } from '../services/historial.service';
import { PacienteService } from 'src/app/admin/pages/services/usuario.service';
import { UsuariosResponse } from '../usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-historial',
  templateUrl: './editar-historial.component.html',
  styleUrls: ['./editar-historial.component.scss']
})
export class EditarHistorialComponent implements OnInit {

      historialMedicoForm: FormGroup;
      medicos: any[] = [];
      pacientes: any[] = [];
      public formularioIntentadoEnviar = false;

  constructor(private fb: FormBuilder,private formBuilder: FormBuilder, private ActivatedRoute: ActivatedRoute, private router: Router, public AuthService: AuthService, private HistorialService: HistorialService, private usuarioService: PacienteService,){ 
   
    const fechaActual = new Date().toISOString().split('T')[0];
  
    this.historialMedicoForm = this.fb.group({
      id_historial_medico: ['', ],
      diagnostico: ['', Validators.required],
      medicamento: ['', ],
        notas: ['',],
        fecha_consulta: [fechaActual, Validators.required],
    
      rut_paciente: ['', Validators.required],
      rut_medico: [this.AuthService.medico.rut, Validators.required],
    });
  }

  ngOnInit() {
    const rut_medico = this.AuthService.medico.rut
    this.usuarioService.cargarAllPacientesEnCurso(rut_medico)
    .subscribe((pacientes: UsuariosResponse) => {
  
      this.pacientes = pacientes.usuarios;
     
    });
    this.ActivatedRoute.params.subscribe(params => {
      const historialId = params['id'];
      if (historialId) {
        this.HistorialService.getHistorialPorId(historialId).subscribe((response: any) => {
          console.log('Respuesta recibida:', response);
          const historialData = response;
  
          // Rellenar el formulario con los datos recibidos
          this.historialMedicoForm.patchValue({
            id_historial_medico: historialData.id_historial,
            diagnostico: historialData.diagnostico,
            medicamento: historialData.medicamento,
            notas: historialData.notas,
            fecha_consulta: historialData.fecha_consulta,
           
            rut_medico: historialData.rut_medico, // Opción alternativa: this.AuthService.medico.rut si se espera que sea el mismo
          });         
        });    
      }
    });
  }
  

  editarHistorial() {
    if (this.historialMedicoForm.invalid) {
      this.formularioIntentadoEnviar = true; // El usuario ha intentado enviar el formulario
      return; // No continuar si el formulario es inválido
    }
   
    Swal.fire({
      title: '¿Editar historial?',
      text: 'Esta a punto de editar los datos del historial. ¿Desea continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
      
      
          const historialEditado = this.historialMedicoForm.value;
          console.log('AQUI ESTA EL USUARIO EDITADO',historialEditado);
          this.HistorialService.editarHistorial(historialEditado).subscribe(
            (response) => {
              Swal.fire('Éxito', 'historial editado exitosamente', 'success');
              this.router.navigateByUrl('/gestionar-historiales');
            },
            (error) => {
              Swal.fire('Error', 'Hubo un error al editar el médico', 'error');
              // Manejar errores, como mensajes de error o reversiones de cambios en el formulario.
            }
          );
      
      }
    });
  }
}