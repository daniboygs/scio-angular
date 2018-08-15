import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ArtistComponent } from './artist/artist.component';
import { EditArtistComponent } from './artist/edit-artist/edit-artist.component';

const routes: Routes = [
  /* LOGIN */
  { path: 'Login', component: LoginComponent },
  { path: 'login', redirectTo: 'Login', pathMatch: 'full' },
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  /* REGISTER */
  { path: 'Register', component: RegisterComponent },
  { path: 'register', redirectTo: 'Register', pathMatch: 'full' },
  /* ARTIST */
  { path: 'Artist', component: ArtistComponent },
  { path: 'artist', redirectTo: 'Artist', pathMatch: 'full' },
  /* EDIT ARTIST */
  { path: 'EditArtist', component: EditArtistComponent },
  { path: 'edit', redirectTo: 'EditArtist', pathMatch: 'full' },
  /* DEFAULT */
  { path: '**', redirectTo: '/' }  // lleva a la pagina de inicio cuando esta equivocada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
