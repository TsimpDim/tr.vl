import { Injectable } from '@angular/core';
import { RouteMetadata } from './routes.model';

@Injectable({
  providedIn: 'root'
})
export class RoutesMetadataService {

  private routesMetadata: RouteMetadata[] = [
    {
      id: 2,
      title: 'aTitle',
      generalLocation: 'Prouts',
      distanceTravelled: 23,
      distanceUnit: 'km',
      time: '3h5m14s',
      speedUnit: 'km/h',
      minSpeed: 20,
      avgSpeed: 13,
      maxSpeed: 34,
      trophies: [
        'top speed',
        'distance travelled'
      ]
    },
    {
      id: 3,
      title: 'aTitle2',
      generalLocation: 'Kastra',
      distanceTravelled: 4,
      distanceUnit: 'km',
      time: '2d3h5m14s',
      speedUnit: 'km/h',
      minSpeed: 30,
      avgSpeed: 23,
      maxSpeed: 44,
      trophies: [
        'top speed',
      ]
    },
  ];
  
  constructor() { }

  getAllRouteMetadata() {
    return [...this.routesMetadata];
  }

  getRouteMetadata(routeId: number) {
    return {
      ...this.routesMetadata.find(route => {
        return route.id === routeId;
      })
    };
  }
}
