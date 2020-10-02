import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse, BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';

declare var google;

const config: BackgroundGeolocationConfig = {
  desiredAccuracy: 10,
  stationaryRadius: 20,
  distanceFilter: 30,
  debug: true, //  enable this hear sounds for background-geolocation life-cycle.
  stopOnTerminate: false, // enable this to clear background location settings when the app terminates
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

  constructor(public navCtrl: NavController, private plt: Platform, private geolocation: BackgroundGeolocation) { }

  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];

    this.geolocation.configure(config).then(() => {
      this.geolocation.on(BackgroundGeolocationEvents.location)
      .subscribe((location: BackgroundGeolocationResponse) => {
        this.trackedRoute.push({ lat: location.latitude, lng: location.longitude });
        this.geolocation.finish()
      });
    });

    this.geolocation.start();
  }

  stopTracking() {
    this.isTracking = false;
    this.geolocation.stop();
  }
}
