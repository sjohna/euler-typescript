import {filter, firstValueFrom, Observable, OperatorFunction, reduce, take} from "rxjs";

export namespace euler1 {
    export function usingReduce(): Observable<number> {
        return naturalsUpTo(999)
            .pipe(
                filter(n => n % 3 == 0 || n % 5 == 0),
                sum(),
            )
    }

    function range(lower: number, upper: number): Observable<number> {
        return new Observable<number>((subscriber) => {
            for (let i = lower; i <= upper; ++i) {
                subscriber.next(i);
            }
            subscriber.complete();
        })
    }

    function naturalsUpTo(n: number): Observable<number> {
        return range(1, n);
    }

    function sum(): OperatorFunction<number, number> {
        return reduce((acc: number, curr: number) => acc + curr, 0)
    }
}
