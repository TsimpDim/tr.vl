import { Component, OnInit } from '@angular/core';
import { RoutesMetadataService } from './routes.service';
import { RouteMetadata } from './routes.model';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
})
export class RoutesPage implements OnInit {

  routes: RouteMetadata[];

  constructor(private routesService: RoutesMetadataService) { }

  ngOnInit() {
    this.routes = this.routesService.getAllRouteMetadata();
  }

}
