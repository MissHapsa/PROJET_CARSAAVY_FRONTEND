import {Component, inject, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";



@Component({
  selector: 'app-ajoutvehicule',
  standalone: true,
    imports: [
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        ReactiveFormsModule,
        FormsModule,
        MatError,
        MatIcon,
        MatIconButton,
        MatSuffix

    ],
  templateUrl: './ajoutvehicule.component.html',
  styleUrl: './ajoutvehicule.component.scss'
})
export class AjoutVehiculeComponent implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  formulaire: FormGroup = this.formBuilder.group({
    immat: ['', [Validators.required]],
  });

  listeMarque: any[] = [];
  listeModele: any[] = [];
  listeModeleFiltre: any[] = [];



  selectedMarque: any = null;
  selectedModele: any = null;

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:8080/marque')
      .subscribe((listeMarque) => (this.listeMarque = listeMarque));
    this.http
      .get<any[]>('http://localhost:8080/modele')
      .subscribe((listeModele) => (this.listeModele = listeModele));


  }

  onSelectionMarque(){
    this.listeModeleFiltre = this.listeModele.filter(model => model.marque.nom == this.selectedMarque.nom)
  }

  onSubmit() {
    console.log(this.formulaire);
    if (this.formulaire.valid) {

      const vehicule = this.formulaire.value;
      vehicule.id_Modele = this.selectedModele

      this.http
        .post('http://localhost:8080/vehicule', vehicule)
        .subscribe((resultat) => console.log(resultat));
      this.router.navigateByUrl('/mesvehicules');


    }
  }





}
