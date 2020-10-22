import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { 
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents 
} from '@ionic-native/background-geolocation/ngx';
import { Geoposition, Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';

declare var google;

const config: BackgroundGeolocationConfig = {
  desiredAccuracy: 0,
  stationaryRadius: 0,
  distanceFilter: 0,
  debug: true, //  enable this hear sounds for background-bgGeolocation life-cycle.
  stopOnTerminate: false, // enable this to clear background location settings when the app terminates
  interval: 5000,
  stopOnStillActivity: false
};

const foregroundConfig: GeolocationOptions = {
  maximumAge: 5000,
  enableHighAccuracy: false
};

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage {

  isTracking = false;
  trackedRoute = [];
  positionSubscription: Subscription;
  watch:any = null;

  constructor(
    public navCtrl: NavController,
    private plt: Platform,
    private bgGeolocation: BackgroundGeolocation,
    private geolocation: Geolocation
  ) { }

  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];

    this.bgGeolocation.configure(config).then(() => {
      this.bgGeolocation.on(BackgroundGeolocationEvents.location)
      .subscribe((location: BackgroundGeolocationResponse) => {
        this.trackedRoute.push(
          {
            lat: location.latitude,
            lng: location.longitude,
            alt: location.latitude,
            spd: location.speed
          }
        );
      });
    });

    this.bgGeolocation.start();

    this.positionSubscription = this.geolocation.watchPosition()
      .pipe(filter((p: Geoposition) => p.coords !== undefined))
      .subscribe(data => {
        this.trackedRoute.push(
          {
            lat: data.coords.latitude,
            lng: data.coords.longitude,
            alt: data.coords.altitude,
            spd: data.coords.speed
          }
        );
      });
  }

  stopTracking() {
    this.isTracking = false;
    this.bgGeolocation.stop();
    this.bgGeolocation.finish()
  }
}
