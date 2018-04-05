import { FormControl } from '@angular/forms';
 
export class InfaqValidator {
 
    static isMin(control: FormControl): any {
 
        if(isNaN(control.value)){
            return {
                "Not a number": true
            };
        }
 
        if(control.value < 5){
            return {
                "Minimum Transaction is RM5": true
            };
        }
 
        return null;
    }
 
}