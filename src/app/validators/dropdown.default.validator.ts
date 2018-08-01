import { AbstractControl } from '@angular/forms';

export function ValidateDropDownDefault(control: AbstractControl): { [key: string]: boolean } | null  {
  if (control.value == 'Please select...') {
    return { validDropDown: true };
  }
  return null;
}