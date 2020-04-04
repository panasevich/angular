import { createReducer, on } from '@ngrx/store';
import {setTemplates, changeTemplates} from './listContainer.actions';

export const initialState = {
  data: [],
};

const listContainer = createReducer(initialState,
  on(setTemplates, (state, value) => ({...state, data: value.data})),
  on(changeTemplates, (state, value) => {
    const newData = state.data.map(item => {
      console.log(item, value, 'asdasdasdasdasdasdasd');
      if (+item.id === +value.id) {
        return ({...item, template: value.template, modified: value.modified});
      }
      return item;
    });
    return ({...state, data: newData});
    }),
);

export function listContainerReducer(state, action) {
  return listContainer(state, action);
}
