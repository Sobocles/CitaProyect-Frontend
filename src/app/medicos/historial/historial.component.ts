import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistorialService } from '../services/historial.service';
import { PacienteService } from 'src/app/admin/pages/services/usuario.service';
import { MedicoService } from 'src/app/admin/pages/services/medico.service';
import { UsuariosResponse } from '../usuarios';
import { MedicoResponse } from 'src/app/admin/pages/interface/medicos';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  historialMedicoForm: FormGroup;
    medicos: any[] = [];
    pacientes: any[] = [];

  constructor(private fb: FormBuilder, private HistorialService: HistorialService, private usuarioService: PacienteService, private medico: MedicoService) { 
    this.historialMedicoForm = this.fb.group({
      id_historial_medico: ['', Validators.required],
      diagnostico: ['', Validators.required],
      medicamento: ['', Validators.required],
      notas: ['', Validators.required],
      fecha_consulta: ['', Validators.required],
      archivo: ['', Validators.required],
      rut_paciente: ['', Validators.required],
      rut_medico: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.usuarioService.cargarPacientes()
    .subscribe((pacientes: UsuariosResponse) => {
      this.pacientes = pacientes.usuarios;
      console.log(pacientes);
    });
    
    this.medico.cargarMedicos()
      .subscribe( (medicos: MedicoResponse )=> {
      this.medicos = medicos.medicos;
    });
  }
  

  guardarHistorial() {
    this.HistorialService.crearHistorial(this.historialMedicoForm.value).subscribe(response => {
      console.log(response);
      // Aquí manejas lo que quieres hacer después de guardar el historial. Por ejemplo, mostrar un mensaje de éxito.
    }, error => {
      console.error(error);
      // Maneja aquí los errores. Por ejemplo, mostrar un mensaje de error.
    });
  }

  
}

