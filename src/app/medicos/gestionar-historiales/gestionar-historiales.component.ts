import { Component } from '@angular/core';
import { Historial, HistorialResponse } from '../historial';
import { HistorialService } from '../services/historial.service';

@Component({
  selector: 'app-gestionar-historiales',
  templateUrl: './gestionar-historiales.component.html',
  styleUrls: ['./gestionar-historiales.component.scss']
})
export class GestionarHistorialesComponent {
  
  public historiales: Historial[] = [];

  constructor(private HistorialService: HistorialService){}

  ngOnInit(): void {
    this.cargarHistoriales();
  }

  cargarHistoriales(): void {
    this.HistorialService.cargarHistorial().subscribe(
      (resp: HistorialResponse) => {
        this.historiales = resp.historiales;
      },
      (err) => {
        console.error('Error al cargar historiales:', err);
      }
    );
  }
}
