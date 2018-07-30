import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ssnFormat'
})
export class SsnFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  }

}
