import {Observable, OperatorFunction, reduce} from "rxjs";

export function range(lower: number, upper: number): Observable<number> {
    return new Observable<number>((subscriber) => {
        for (let i = lower; i <= upper; ++i) {
            subscriber.next(i);
        }
        subscriber.complete();
    })
}

export function naturalsUpTo(n: number): Observable<number> {
    return range(1, n);
}

export function sum(): OperatorFunction<number, number> {
    return reduce((acc: number, curr: number) => acc + curr, 0)
}

export function fibonacciSequence(): Observable<number> {
    return new Observable<number>((subscriber) => {
        let prev = 0;
        let curr = 1;
        while(true) {
            subscriber.next(curr);
            const next = curr + prev;
            prev = curr;
            curr = next;
        }
    })
}