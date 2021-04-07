import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  token:any;

  constructor(
    private http: HttpClient,
    private env: EnvService,
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

//   logout() {
//     const headers = new HttpHeaders({
//       'Authorization': this.token["token_type"]+" "+this.token["access_token"]
//     });

//     return this.http.get(this.env.API_URL + '/logout', { headers: headers })
//     .pipe(
//       tap(data => {
//         this.storage.remove("token");
//         this.isLoggedIn = false;
//         delete this.token;
//         return data;
//       })
//     )
//   }

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

  isLoggedIn() {
    this.token = Storage.get({key:'token'});

    if(this.token != null) {
      return true;
    }

    return false;
  }
}