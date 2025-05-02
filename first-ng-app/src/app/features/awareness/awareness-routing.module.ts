import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AwarenessComponent } from '../../components/awareness/awareness.component';

const routes: Routes = [
  { path: '', component: AwarenessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwarenessRoutingModule {}
