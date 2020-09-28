import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutesMetadataService } from '../routes.service';
import { RouteMetadata } from '../routes.model';
import { Subscription } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, Platform } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-routes-detail',
  templateUrl: './routes-detail.page.html',
  styleUrls: ['./routes-detail.page.scss'],
})
export class RoutesDetailPage implements OnInit {

  loadedRoute: RouteMetadata;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
  isTracking = false;
  trackedRoute = [];
  positionSubscription: Subscription;
  
  constructor(
      private activatedRoute: ActivatedRoute,
      private routesMetadataService: RoutesMetadataService,
      public navCtrl: NavController,
      private plt: Platform,
      private geolocation: Geolocation
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

  ionViewDidEnter() {
    this.plt.ready().then(() => {
      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.geolocation.getCurrentPosition().then(pos => {
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        console.log(pos);
        this.map.setCenter(latLng);
        this.map.setZoom(16);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }

  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }

    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }
}
