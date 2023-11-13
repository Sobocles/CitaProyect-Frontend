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
        this.cargarCitasMedicas(rutMedico, 0);
    } else {
        console.error("RUT del usuario no definido o usuario no autenticado");
    }
}

cargarCitasMedicas(rutMedico: string, desde: number) {
  this.CitaMedicaService.obtenerCitaMedicaPorIdParaMedicos(rutMedico, desde)
  .subscribe((response: any) => {
    console.log('AQUI ESTA LAS CITAS',response);
    this.citasMedicas = response.citas;
    this.totalCitas = response.total;
    console.log('AQUI ESTA EL TOTAL DE CITAS',this.totalCitas);
    console.log('AQUI ESTA LAS CITAS EN EL ARREGLO',this.citasMedicas);
   

  }, error => {
    console.error("Error al obtener el historial médico:", error);
  });
}

cambiarPagina(valor: number) {
  console.log("Valor actual de 'desde':", this.desde);
  this.desde += valor;

  if (this.desde < 0) {
    this.desde = 0;
  } else if (this.desde >= this.totalCitas) {
    this.desde -= valor;
  }

  console.log("Nuevo valor de 'desde':", this.desde);
  this.cargarCitasMedicas(this.authService.medico.rut, this.desde);
}

}
