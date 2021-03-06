import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { SurveyForm } from '../models/survey-form.model';

export enum SurveySubmitActionTypes {
    Add = '[Survey Submit] Add',
    Edit = '[Survey Submit] Edit',
    AddSuccess = '[Survey Submit] Add Success',
    EditSuccess = '[Survey Submit] Edit Success',
    Failure = '[Survey Submit] Failure',
}

export class Add implements Action {
    readonly type = SurveySubmitActionTypes.Add;

    constructor(public payload: { form: SurveyForm }) {}
}

export class AddSuccess implements Action {
    readonly type = SurveySubmitActionTypes.Add;

    constructor(public payload: string) {}
}

export class Edit implements Action {
    readonly type = SurveySubmitActionTypes.Edit;

    constructor(public payload: { id: string; form: SurveyForm }) {}
}

export class EditSuccess implements Action {
    readonly type = SurveySubmitActionTypes.EditSuccess;
}

export class Failure implements Action {
    readonly type = SurveySubmitActionTypes.Add;

    constructor(public payload: HttpErrorResponse) {}
}

export type SurveyActions = Add | AddSuccess | Edit | EditSuccess | Failure;
