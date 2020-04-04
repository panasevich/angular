import { createAction, props } from '@ngrx/store';

export const setTemplates = createAction('[List Container] Set data', props<{ data }>());
export const changeTemplates = createAction('[List Container] Change data', props<{template, modified, id}>());
