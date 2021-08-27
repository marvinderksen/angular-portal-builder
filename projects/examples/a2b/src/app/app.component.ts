import { Component } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { trips } from './data';
import { Trip } from './types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    private readonly fromStream = new Subject<string>();
    private readonly toStream = new Subject<string>();

    readonly trip: Observable<Trip | undefined>;

    constructor() {
        this.trip = combineLatest([this.fromStream, this.toStream]).pipe(
            map(([from, to]) => trips.find((it) => it.from === from && it.to === to)),
            startWith<Trip | undefined>(undefined)
        );
    }

    selectFrom(city: string) {
        this.fromStream.next(city);
    }

    selectTo(city: string) {
        this.toStream.next(city);
    }
}
