import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ssnFormat'
})
export class SsnFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    rawSsn: string = value;
    return rawSsn.substring(0,3) + '-' + rawSsn.substring(3,6)  + '-' + rawSsn.substring(6,9);
  }

}
