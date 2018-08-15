import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/internal/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '../../../node_modules/@angular/router';
import { LoginParams } from '../shared/models/LoginParams';
import { LoginService } from '../shared/services/external/login/login.service';
import { Register } from '../shared/models/Register';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    console.log('LOGIN COMPONENT', this._userService.getActiveToken('token'));
    this.loginForm = new FormGroup({
      'email': new FormControl(
        '',
        [Validators.required]
      ),
      'password': new FormControl(
        '',
        [Validators.required]
      )
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      // Construct the object to send.
      const login: LoginParams = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
      };
      // Make call using simulated API
      /*let response: Register;
      response = this._registerService.Register(register);
      console.log(response);
      if (response.result === true) {
        if (this._userService.setActiveToken(response.token)) {
          this._router.navigate(['/Login']);
        }
      }*/
      // Make call using live API
      let response: Observable<Register>;
      response = this._loginService.login(login);
      response.subscribe(
        (data) => {
          if (data.result === true) {
            // Save in user service.
            /*if (this._userService.setActiveToken(data.token)) {
              // Do redirect
              this._router.navigate(['/Login']);
            }*/
            console.log('Acceso correcto!');
            this._router.navigate(['/Artist']);
          }
        },
        (error) => {

        }
      );
    }
  }
}
