import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { Register } from '../shared/models/Register';
import { UserService } from '../shared/services/internal/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Artist } from '../shared/models/Artist';
import { ArtistParams } from '../shared/models/ArtistParams';
import { ArtistService } from '../shared/services/external/artist/artist.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artistas: Array<ArtistParams>;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _ArtistService: ArtistService
  ) {  }

  ngOnInit() {
    let response: Observable<Array<ArtistParams>>;
      response = this._ArtistService.getArtist();
      response.subscribe(
        (data) => {
          if (data) {
            // Save in user service.
            /*if (this._userService.setActiveToken(data.token)) {
              // Do redirect
              this._router.navigate(['/Login']);
            }*/
            this.artistas = data;
            console.log('artistas jalooooooooooooooo!');
            // this._router.navigate(['/Artist']);
          }
        },
        (error) => {

        }
      );
  }

  edit(artist: ArtistParams) {
    this._router.navigate(['/EditArtist', artist]);
    console.log(artist.name + ' Editado');
  }

  /*delete(artist: ArtistParams) {
    console.log('Borrando ' + artist._id + ' ...');
    let response: Observable<Artist>;
    response = this._ArtistService.delete(artist);
    response.subscribe(
      (data) => {
        if (data.result === true) {
          // Save in user service.
          if (this._userService.setActiveToken(data.token)) {
            // Do redirect
            // this._router.navigate(['/Artists']);
            location.reload();
            console.log(artist._id + ' Borrado');
          }
        }
      },
      (error) => {

      }
    );
  }*/

}
