import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutesDetailPageRoutingModule } from './routes-detail-routing.module';

import { RoutesDetailPage } from './routes-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutesDetailPageRoutingModule
  ],
  declarations: [RoutesDetailPage]
})
export class RoutesDetailPageModule {}
