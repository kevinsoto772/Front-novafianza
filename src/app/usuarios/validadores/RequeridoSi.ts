import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export function requeridoSi(nombreOtroControl: string, valorOtroControl: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formulario = control.parent
        if(formulario){
            const otroControl = formulario.get(nombreOtroControl)
            if (otroControl && otroControl.value == valorOtroControl){
                if(control.value === '' || control.value === null || control.value === undefined){
                    return { requeridoSi: true }
                }
            }
            return null;
        }
        return null;
    }
}