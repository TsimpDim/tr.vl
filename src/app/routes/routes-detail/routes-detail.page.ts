import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutesMetadataService } from '../routes.service';
import { RouteMetadata } from '../routes.model';

@Component({
  selector: 'app-routes-detail',
  templateUrl: './routes-detail.page.html',
  styleUrls: ['./routes-detail.page.scss'],
})
export class RoutesDetailPage implements OnInit {

  loadedRoute: RouteMetadata;

  constructor(
      private activatedRoute: ActivatedRoute,
      private routesMetadataService: RoutesMetadataService
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('routeId')) {
        // Redirect to home
        return ;
      }

      const routeId = paramMap.get('routeId');
      this.loadedRoute = this.routesMetadataService.getRouteMetadata(parseInt(routeId));
    });
  }

}
