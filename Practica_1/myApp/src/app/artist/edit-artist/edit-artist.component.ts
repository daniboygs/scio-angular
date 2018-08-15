import { Component, OnInit } from '@angular/core';
import { Artist } from '../../shared/models/Artist';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { ArtistService } from '../../shared/services/external/artist/artist.service';
import { UserService } from '../../shared/services/internal/user/user.service';
import { FormGroup, FormControl } from '../../../../node_modules/@angular/forms';
import { ArtistParams } from '../../shared/models/ArtistParams';
import { Observable } from '../../../../node_modules/rxjs/Observable';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {

  editForm: FormGroup;
  artist;

  constructor(
    private _artistService: ArtistService,
    private _userService: UserService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => this.artist = params);
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl( this.artist.name ),
      gener: new FormControl( this.artist.geners)
   });

    console.log('Editando:  ' + this.artist.name);
  }

  onSubmit() {
    if (this.editForm.valid) {
      // Construct the object to send.
      const edit: ArtistParams = {
        _id: this.artist._id,
        name: this.editForm.get('name').value,
        geners: this.artist.geners,
        images: this.artist.images
        /*identifier: this.artist.identifier,
        timestamps: this.artist.timestamps,
        __v: this.artist.__v,
        updateAt: this.artist.updateAt,
        createAt: this.artist.createAt,*/
      };
      // Make call using live API
      let response: Observable<Artist>;
      response = this._artistService.update(edit);
      response.subscribe(
        (data) => {
          if (data.result === true) {
            // Save in user service.
            if (this._userService.setActiveToken(data.token)) {
              // Do redirect
              this._router.navigate(['/Artists']);
            }
          }
        },
        (error) => {
        }
      );
    }
  }

}
