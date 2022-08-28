import {filter, finalize, Observable, share, take, takeWhile, tap} from "rxjs";
import {C, cancelWhenComplete, CPred, fibonacci_C, sum, takeWhile_C, ValueWithCancelToken} from "./utilities";

export namespace euler2 {
    export function solution(): Observable<number> {
        return fibonacci_C()
            .pipe(
                takeWhile(CPred<number>(num => num < 4000000)),
                cancelWhenComplete(),
                filter(n => n % 2 == 0),
                sum()
            )
    }
}