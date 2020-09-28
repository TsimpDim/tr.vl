import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

declare var google;

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage {

  isTracking = false;
  trackedRoute = [];
  positionSubscription: Subscription;

  constructor(public navCtrl: NavController, private plt: Platform, private geolocation: Geolocation) { }

  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];

    this.positionSubscription = this.geolocation.watchPosition()
      .pipe(filter((p: Geoposition) => p.coords !== undefined))
      .subscribe(data => {
        setTimeout(() => {
          this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
        }, 0);
      });

  }

  stopTracking() {
    this.isTracking = false;
    this.positionSubscription.unsubscribe();
  }
}
