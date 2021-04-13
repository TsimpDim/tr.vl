import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  token:any;

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private router: Router,
    private alert: AlertService
  ) { }

  login(username: String, password: String) {
    return this.http.post(this.env.API_URL + '/login',
      {username: username, password: password}
    ).pipe(
      tap(response => {
        let token = response['token'];
        Storage.set({key:'token', value:JSON.stringify(token)})
        .then(() => {
            console.log('Token Stored');
          }, error => console.error('Error storing item', error)
        );
        this.token = token;

        return token;
      }),
    );
  }

  register(username: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + '/sign-up',
      {username: username, email: email, password: password}
    )
  }

  logout() {
    this.http.get(this.env.API_URL + '/logout');
    Storage.remove({key: "token"}).then(() => {
      this.alert.presentToast("logged out");
      delete this.token;

      this.router.navigate(['/auth/login']);
    });
  }

//   user() {
//     const headers = new HttpHeaders({
//       'Authorization': this.token["token_type"]+" "+this.token["access_token"]
//     });

//     return this.http.get<User>(this.env.API_URL + '/user', { headers: headers })
//     .pipe(
//       tap(user => {
//         return user;
//       })
//     )
//   }

  async isLoggedIn() {
    this.token = await Storage.get({key:'token'});

    if(this.token.value != null) {
      return true;
    }

    return false;
  }
}