import { interval, fromEvent } from 'rxjs';
import { map, filter, tap, take, takeLast, takeWhile, scan, reduce, switchMap } from 'rxjs/operators';

fromEvent(document, 'click')
    .pipe(
        switchMap(event => {
            return  interval(1000)
                .pipe(
                    tap(v => console.log('tap ', v)),
                    take(5),
                    reduce((acc, v) => acc + v, 0),
                );
        })
    )
    .subscribe({
        next: v => console.log('next ', v),
        complete: () => console.log('complite')
    });

