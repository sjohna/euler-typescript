import {filter, Observable} from "rxjs";
import {naturalsUpTo, sum} from "./utilities";

export namespace euler1 {
    export function solution(): Observable<number> {
        return naturalsUpTo(999)
            .pipe(
                filter(n => n % 3 == 0 || n % 5 == 0),
                sum(),
            )
    }
}
