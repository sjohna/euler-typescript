import {Observable, takeWhile} from "rxjs";
import {cancelWhenComplete, CPred, primes_I, sum} from "./utilities";

export namespace euler10 {
    export function solution(): Observable<number> {
        return primes_I().pipe(
            takeWhile(CPred<number>(n => n < 2000000)),
            cancelWhenComplete(),
            sum()
        )
    }
}