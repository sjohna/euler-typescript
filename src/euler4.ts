import {crossProduct, isPalindromeNumber, naturalsUpTo} from "./utilities";
import {filter, map, max, Observable} from "rxjs";

export namespace euler4 {
    export function solution(): Observable<number> {
        return crossProduct(
            naturalsUpTo(999),
            naturalsUpTo(999)
        )
            .pipe(
                map(([n1, n2]) => n1*n2),
                filter(isPalindromeNumber),
                max()
            )
    }
}