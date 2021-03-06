import {
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    HostBinding,
    SimpleChanges,
    ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Subject } from 'rxjs/Subject';
import { takeUntil, combineLatest, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Directive({
    selector: '[appLocalCard]',
})
export class LocalCardDirective implements OnInit, OnChanges, OnDestroy {
    @Input() id: string;
    @Input() prop: string;
    @HostBinding('innerText') text: string;

    id$ = new BehaviorSubject<string>(null);
    prop$ = new BehaviorSubject<string>(null);
    unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private store: Store<any>, private _ref: ChangeDetectorRef) {}

    ngOnInit() {
        this.store
            .select(fromRoot.getLocalCards)
            .pipe(
                combineLatest(this.id$, this.prop$),
                map(([cards, id, prop]) => cards[id][prop]),
                takeUntil(this.unsubscribe$),
            )
            .subscribe(text => {
                this.text = text;
                this._ref.markForCheck();
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.id) {
            this.id$.next(changes.id.currentValue);
        }
        if (changes.prop) {
            this.prop$.next(changes.prop.currentValue);
        }
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
