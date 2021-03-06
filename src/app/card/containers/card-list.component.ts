import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromCard from '../reducers';
import * as FilterAction from '../actions/filter.actions';
import { CardFilter } from '../models/filter.model';
@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styles: [`.list-wrapper { max-width: 1056px; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent implements OnInit {
    filter$ = this.store.select(fromCard.getFilter);
    list$ = this.store.select(fromCard.getLimitedFilteredCards);

    constructor(private store: Store<any>) {}

    ngOnInit() {}

    onFilterChange(cardFilter: CardFilter) {
        this.store.dispatch(new FilterAction.SetFilter(cardFilter));
    }
}
