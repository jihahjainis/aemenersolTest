import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  isLoginValid = true;

  loginFormGroup: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    public formBuilder: FormBuilder,
    public formGroup: ReactiveFormsModule,
  ) { }

  ngOnInit() {

    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

  }

  login() {

    const userName = this.loginFormGroup.controls['username'].value;
    const pw = this.loginFormGroup.controls['password'].value;

    if (userName === null || userName === '' || pw === null || pw === '') {
      this.isLoginValid = false;
    } else {

      this.loading = true;
    
      this.authenticationService.login(userName, pw)
        .subscribe(
            data => {
                console.log('inside login: ', this.returnUrl);
                this.router.navigate([this.returnUrl]);
            });
    }

    
  }

}
