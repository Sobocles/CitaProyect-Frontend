import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistorialService } from 'src/app/medicos/services/historial.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Historial, HistorialResponse } from 'src/app/medicos/historial';
import { Usuario } from 'src/app/models/usuario';
@Component({
  selector: 'app-historial-paciente',
  templateUrl: './historial-paciente.component.html',
  styleUrls: ['./historial-paciente.component.scss']
})
export class HistorialPacienteComponent implements OnInit {



  historialMedico: Historial[] = []; 

  constructor(private historialService: HistorialService, private authservice: AuthService){}

  ngOnInit() {
    if (this.authservice.usuario && this.authservice.usuario.rut) { 
        const rutUsuario = this.authservice.usuario.rut;
        this.cargarHistorialMedico(rutUsuario);
    } else {
        console.error("RUT del usuario no definido o usuario no autenticado");
    }
}



  cargarHistorialMedico(rut: string) {
    this.historialService.obtenerHistorialPorId(rut)
    .subscribe((historial:HistorialResponse) => {
      console.log(historial)
      this.historialMedico = historial.historiales;
     

    }, error => {
      console.error("Error al obtener el historial médico:", error);
    });
  }

}
