import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IncomingGoodsPage } from './incoming-goods.page';

const routes: Routes = [
  {
    path: '',
    component: IncomingGoodsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IncomingGoodsPage]
})
export class IncomingGoodsPageModule {}
