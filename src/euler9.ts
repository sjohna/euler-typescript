import {filter, map, Observable} from "rxjs";
import {crossProduct, range} from "./utilities";

export namespace euler9 {
    export function solution(): Observable<number> {
        return crossProduct(
            range(1,1000),
            range(1,1000)
        ).pipe(
            filter(([a,b]) => b >= a),
            map(([a,b]) => [a,b,1000-a-b]),
            filter(([a,b,c]) => c >= b),
            filter(([a,b,c]) => a*a + b*b == c*c),
            map(([a,b,c]) => a*b*c)
        )
    }
}