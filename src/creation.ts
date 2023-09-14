import { of, from, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

const stream$ = of(1, 2, 3, 4);

stream$.subscribe({
    next(v) {
        console.log(v)
    },
})

const arr$ = from([1, 2, 3, 4]).pipe(
    scan((acc: number[], v: number) => acc.concat(v), []),
);

arr$.subscribe(v => console.log(v));

const stream_observable$ = new Observable(observer => {
    observer.next('first value');
    setTimeout(() => observer.next('After 1000 ms'), 1000);
    setTimeout(() => observer.complete(), 1500);
    setTimeout(() => observer.error('Somthing went wrong'), 2000);
    setTimeout(() => observer.next('After 3000 ms'), 3000);
});

stream_observable$.subscribe({
   next: v => console.log('Val: ', v),
   error: e => console.error(e),
   complete: () => console.log('Complete'),
});