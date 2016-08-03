import { Pipe, PipeTransform } from '@angular/core';
/*
 Take an array of values and return arithmetic mean (if type number), or list of unique values (if string)
 */
@Pipe({name: 'summarise'})
export class SummarisePipe implements PipeTransform {
    transform(value) {
        console.log(value);
        if(value[0]!=undefined){
            if(typeof(value[0])=='number'){
                value=numberSummary(value);
            }
        }
        return value.toPrecision(3)
    }
}

function numberSummary(array){
    let total=null;
    for(let x of array){total=total+x}
    let mean=total/array.length;
    return mean
}
