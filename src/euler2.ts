import {filter, Observable, take, takeWhile} from "rxjs";
import {fibonacciSequence, sum} from "./utilities";

export namespace euler2 {
    export function solution(): Observable<number> {
        return fibonacciSequence()
            .pipe(
                takeWhile(num => num < 4000000),
                filter(n => n % 2 == 0),
                sum(),
                take(1)
            )
    }
}