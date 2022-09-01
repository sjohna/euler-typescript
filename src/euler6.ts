import {map, Observable, zip} from "rxjs";
import {range, sum} from "./utilities";

export namespace euler6 {
    export function solution(): Observable<number> {
        return zip(
            range(1,100).pipe(map(n => n*n), sum()),
            range(1,100).pipe(sum(), map(n => n*n))
        ).pipe(map(([sumOfSquares, squareOfSum]) => squareOfSum - sumOfSquares))
    }
}