import {Observable, skip, take} from "rxjs";
import {cancelWhenComplete, primes_I} from "./utilities";

export namespace euler7 {
    export function solution(): Observable<number> {
        return primes_I().pipe(
            skip(10000),
            take(1),
            cancelWhenComplete()
        )
    }
}