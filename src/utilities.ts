import {map, MonoTypeOperatorFunction, Observable, OperatorFunction, reduce, takeWhile} from "rxjs";
import {operate} from "rxjs/internal/util/lift";
import {createOperatorSubscriber} from "rxjs/internal/operators/OperatorSubscriber";

export class CancelToken {
    cancelled: boolean = false;
}

export class ValueWithCancelToken<T> {
    token: CancelToken;
    value: T;

    constructor(token: CancelToken, value: T) {
        this.token = token;
        this.value = value;
    }
}

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

export function fibonacci_I(): Observable<ValueWithCancelToken<number>> {
    const token = new CancelToken();
    return new Observable<ValueWithCancelToken<number>>((subscriber) => {
        let prev = 0;
        let curr = 1;
        while(!token.cancelled) {
            subscriber.next(new ValueWithCancelToken<number>(token, curr));
            const next = curr + prev;
            prev = curr;
            curr = next;
        };
        subscriber.complete();
    })
}

export function primes_I(): Observable<ValueWithCancelToken<number>> {
    const token = new CancelToken();
    return new Observable<ValueWithCancelToken<number>>((subscriber) => {
        subscriber.next(new ValueWithCancelToken(token, 2));

        let curr = 3;
        while (!token.cancelled) {
            const factorLimit = Math.sqrt(curr);
            let prime = true;
            for (let factor = 2; factor <= factorLimit && !token.cancelled; ++factor) {
                if (curr % factor == 0) {
                    prime = false;
                    break;
                }
            }
            !token.cancelled && prime && subscriber.next(new ValueWithCancelToken<number>(token, curr));
            curr += 2;
        }

        subscriber.complete();
    });
}

export function takeWhile_C<T>(predicate: (value: T, index: number) => boolean): MonoTypeOperatorFunction<ValueWithCancelToken<T>> {
    return takeWhile((valueWithToken: ValueWithCancelToken<T>, index: number) => predicate(valueWithToken.value, index))
}

export function CPred<T>(f: (value: T, index: number) => boolean): (value: ValueWithCancelToken<T>, index: number) => boolean {
    return (value: ValueWithCancelToken<T>, index: number) => f(value.value, index)
}

export function C<T, R>(f: (value: T) => R): (value: ValueWithCancelToken<T>) => ValueWithCancelToken<R> {
    return (value: ValueWithCancelToken<T>) => new ValueWithCancelToken<R>(value.token, f(value.value))
}

export function cancelWhenComplete<T>(): OperatorFunction<ValueWithCancelToken<T>, T> {
    return operate((source, subscriber) => {
        let token: CancelToken;
        source.subscribe(
            createOperatorSubscriber(subscriber, (valueWithCancelToken: ValueWithCancelToken<T>) => {
                    token = valueWithCancelToken.token;
                    subscriber.next(valueWithCancelToken.value)
                }, () => {
                    token.cancelled = true;
                    subscriber.complete()
                }
            )
        )
    })
}

export function primeFactorsOf(n: number): Observable<number> {
    return new Observable<number>((subscriber) => {
        primes_I().subscribe((prime) => {
            while (n > 1 && n % prime.value == 0) {
                n /= prime.value;
                subscriber.next(prime.value);
            }
            if (n <= 1) {
                subscriber.complete();
                prime.token.cancelled = true;
            }
        });
    });
}

export function crossProduct<T>(...args: Observable<T>[]): Observable<T[]> {
    let ret = args[0].pipe(inArray());

    for (let i = 1; i < args.length; ++i) {
        ret = ret.pipe(
            crossProductWith(args[i])
        )
    }

    return ret
}

export function crossProductWith<T>(rhs: Observable<T>): MonoTypeOperatorFunction<T[]> {
    return operate((source, subscriber) => {
        source.subscribe(
            createOperatorSubscriber(subscriber, (arr: T[]) => {
                    rhs.subscribe(val => {
                        const cp = [...arr];
                        cp.push(val);
                        subscriber.next(cp);
                    })
                }
            )
        )
    })
}

export function inArray<T>(): OperatorFunction<T, T[]> {
    return map(val => [val]);
}

export function isPalindromeNumber(n: number): boolean {
    const nStr = n.toString();
    for (let i = 0; i < nStr.length/2; ++i) {
        if (nStr[i] !== nStr[nStr.length - 1 - i]) {
            return false;
        }
    }
    return true;
}