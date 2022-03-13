import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Programme } from 'src/app/class/programme';
import { Seance } from 'src/app/class/seance';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css']
})
export class ProgramFormComponent implements OnInit {

  @Output("programmeOnSubmit") programmeOnSubmit: EventEmitter<Programme> = new EventEmitter();

  seancesList: Seance[] = [];
  programme: Programme = new Programme();

  programmeFormGroup: FormGroup = new FormGroup({
    id: new FormControl(this.programme.id),
    nom: new FormControl(this.programme.nom),
    dateCreation: new FormControl(this.programme.dateCreation),
    dateModification: new FormControl(this.programme.dateModification)
  });

  constructor() { }

  ngOnInit(): void { }

  onSubmit() {
    var programme: Programme = new Programme();
    if (this.programmeFormGroup.value.id) {
      programme.id = this.programmeFormGroup.value.id;
    }
    programme.nom = this.programmeFormGroup.value.nom;
    if (this.programmeFormGroup.value.dateCreation) {
      programme.dateCreation = this.programmeFormGroup.value.dateCreation;
    }
    else {
      programme.dateCreation = new Date().toISOString().substring(0, 10);
    }
    programme.dateModification = new Date().toISOString().substring(0, 10);
    this.programmeOnSubmit.emit(programme);
  }

  onUpdate(programme: Programme) {
    this.programme.id = programme.id;
    this.programme.nom = programme.nom;
    this.programme.dateCreation = programme.dateCreation;
    this.programme.dateModification = new Date().toISOString().substring(0, 10);
  }
}
