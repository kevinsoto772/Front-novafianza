import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function soloUnoEntre(nombreOtroControl:string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if(control.parent){
            console.log('el control solo uno entre si tiene un formulario padre')
            const otroControl = (control.parent.controls as any)[nombreOtroControl];
            /* Si el otro control está vacío */
            if(otroControl.value === '' || otroControl.value === undefined || otroControl.value === null){
                return control.value !== '' && control.value !== undefined && control.value !== null 
                ? null : { soloUnoEntre: {value: control.value} }
            }
            /* Si el otro control tiene un valor */
            if(otroControl.value !== '' && otroControl.value !== undefined && otroControl.value !== null){
                return control.value !== '' && control.value !== undefined && control.value !== null 
                ? {soloUnoEntre: {value: control.value}} : null
            }
        }
        return null
    };
  }