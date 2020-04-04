import {ListContainerComponent} from './containers/list-container/list-container.component';
import {TemplateComponent} from './containers/template/template.component';

export const routes = [
  {path: '', component: ListContainerComponent},
  {path: ':id', component: TemplateComponent},
];
