import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public mainFormGroup: FormGroup;
  public submitAttempt: boolean = false;
  public loginError: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.mainFormGroup = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    }

  login(){
    this.submitAttempt = true;

    if(this.mainFormGroup.valid){
        this.authService.login(this.mainFormGroup.value.username, this.mainFormGroup.value.password).subscribe(
          data => {
            this.alertService.presentToast("Logged in");
            this.router.navigate(['/']);
          }, 
          error => {
            this.loginError = true;
            console.log(error);
          }
        )
    }
  }
}
