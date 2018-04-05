import { FormControl } from '@angular/forms';
 
export class NumberValidator {
 
    static isValid(control: FormControl): any {
 
        if(isNaN(control.value)){
            return {
                "Not a number": true
            };
        }
 
        if(control.value % 1 !== 0){
            return {
                "Must be a whole number": true
            };
        }
 
        if(control.value < 0){
            return {
                "Not Realistic": true
            };
        }
 
        return null;
    }
 
}