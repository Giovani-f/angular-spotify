import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { Router, RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';
import { SidebarNavigationComponent } from 'src/app/components/sidebar-navigation/sidebar-navigation.component';

@NgModule({
  declarations: [PlayerComponent, SidebarNavigationComponent],
  imports: [CommonModule, RouterModule.forChild(PlayerRoutes)],
})
export class PlayerModule {}
