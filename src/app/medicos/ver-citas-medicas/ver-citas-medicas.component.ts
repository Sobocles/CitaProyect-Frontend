import { Component, OnInit } from '@angular/core';
import { CitaMedicaService } from '../../admin/pages/services/cita-medica.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-ver-citas-medicas',
  templateUrl: './ver-citas-medicas.component.html',
  styleUrls: ['./ver-citas-medicas.component.scss']
})
export class VerCitasMedicasComponent implements OnInit {

  citasMedicas: any[] = []; 
  public desde: number = 0;
  public totalCitas: number = 0;

  constructor(private CitaMedicaService: CitaMedicaService, private authService: AuthService){}

  ngOnInit() {
    if (this.authService.medico && this.authService.medico.rut) { 
        const rutMedico = this.authService.medico.rut;
        console.log('AQUI ESTA EL RUT DEL MEDICO', rutMedico );
        this.cargarCitasMedicas(rutMedico);
    } else {
        console.error("RUT del usuario no definido o usuario no autenticado");
    }
}

cargarCitasMedicas(rutMedico: string) {
  this.CitaMedicaService.obtenerCitaMedicaPorIdParaMedicos(rutMedico)
  .subscribe((response: any) => {
    console.log('AQUI ESTA LAS CITAS',response);
    this.citasMedicas = response.citas;
    console.log('AQUI ESTA LAS CITAS EN EL ARREGLO',this.citasMedicas);
   

  }, error => {
    console.error("Error al obtener el historial médico:", error);
  });
}

}
