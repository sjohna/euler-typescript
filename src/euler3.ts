import {Observable, takeLast} from "rxjs";
import {primeFactorsOf} from "./utilities";

export namespace euler3 {
    export function solution(): Observable<number> {
        return primeFactorsOf(600851475143 )
            .pipe(
                takeLast(1)
            )
    }
}