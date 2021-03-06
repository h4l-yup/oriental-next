import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import {
    ExpansionActions,
    ExpansionActionTypes,
} from '../actions/expansion.actions';
import { Expansion } from '../models/expansion.model';

export interface State extends EntityState<Expansion> {
    selectedId: string | null;
}

export const adapter: EntityAdapter<Expansion> = createEntityAdapter<Expansion>(
    {
        selectId: (expansion: Expansion) => expansion.code,
        sortComparer: false,
    },
);

export const initialState: State = adapter.getInitialState({
    selectedId: null,
});

export function reducer(state = initialState, action: ExpansionActions): State {
    switch (action.type) {
        case ExpansionActionTypes.LoadSuccess: {
            return {
                ...adapter.addAll(action.payload.expansions, state),
                selectedId: state.selectedId,
            };
        }

        case ExpansionActionTypes.Select: {
            return {
                ...state,
                selectedId: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedId;
