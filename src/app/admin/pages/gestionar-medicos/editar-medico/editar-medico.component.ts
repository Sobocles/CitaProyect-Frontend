import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoCitaService } from '../../services/tipo-cita.service';
import { Especialidad } from '../../gestionarCitasMedicas/agregar-cita-medica/agregar-cita-medica.component';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.scss']
})
export class EditarMedicoComponent implements OnInit {
  formulario: FormGroup;
  especialidades: string[] = []; // Agregado

  constructor(private formBuilder: FormBuilder, private MedicoService: MedicoService, private ActivatedRoute: ActivatedRoute, private router: Router, private TipoCitaService: TipoCitaService) {
    this.formulario = this.formBuilder.group({
      rut: ['', [Validators.required, this.rutValidator]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.gmailValidator]],
      telefono: ['', [Validators.required, this.telefonoValidator]],
      direccion: ['', [Validators.required, Validators.maxLength(66)]],
      nacionalidad: ['', Validators.required],
      especialidad_medica: [''], 
    });
  }
  ngOnInit() {
    this.cargaEspecialidades();
    this.ActivatedRoute.params.subscribe(params => {
      const medicoId = params['id'];
      console.log('AQUI ESTA EL ID DEL MEDICO',medicoId)
      if (medicoId) {
        // Obtén los datos del médico y llénalos en el formulario
        this.MedicoService.obtenerMedicoPorId(medicoId).subscribe((response: any) => {
          const medico = response.medico;
      
          this.formulario.patchValue({
            rut: medico.rut,
            nombre: medico.nombre,
            apellidos: medico.apellidos,
            email: medico.email,
            telefono: medico.telefono,
            direccion: medico.direccion,
            
            nacionalidad: medico.nacionalidad,
            titulo: medico.titulos,
          });
        });
      }

    });
  }

  telefonoValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const telefonoRegex = /^\+56 9 \d{4}-\d{4}$/; // Ajusta el regex según el formato deseado
  
    return telefonoRegex.test(value) ? null : { telefonoInvalido: true };
  }

  rutValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.replace(/[.-]/g, '');
    if (!value) {
      return null;
    }
  
    let body = value.slice(0, -1);
    let dv = value.slice(-1).toUpperCase();
  
    if (body.match(/[^0-9]/)) {
      return { rutInvalid: true };
    }
  
    let sum = 0;
    let multiple = 2;
  
    for (let i = body.length - 1; i >= 0; i--) {
      sum = sum + body.charAt(i) * multiple;
      multiple = multiple < 7 ? multiple + 1 : 2;
    }
  
    let dvCalculated = 11 - (sum % 11);
    let dvExpected = dvCalculated === 11 ? '0' : dvCalculated === 10 ? 'K' : dvCalculated.toString();
  
    return dvExpected === dv ? null : { rutInvalid: true };
  }

  gmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
  
    const isGmail = value.endsWith('@gmail.com');
    return !isGmail ? { 'notGmail': true } : null;
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

  cargaEspecialidades() {
    this.TipoCitaService.cargaEspecialidades().subscribe(
      data => {
       
        this.especialidades = data.especialidades.map((e: Especialidad) => e.especialidad_medica);
      }
    );
  }

}
