import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MusculationService } from 'src/app/service/musculation.service';
import { MatTableDataSource } from '@angular/material/table';
import { Programme } from 'src/app/class/programme';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/class/pagination';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css'],
})
export class ProgramListComponent implements OnChanges {
  displayedColumns: string[] = ['dateCreation', 'nom', 'update', 'deletion'];
  dataSource: MatTableDataSource<Programme> = new MatTableDataSource();
  indexToUpdate: number = 0;
  programmeToUpdate: Programme = new Programme();
  nomUpdated: string = '';

  // MatPaginator Inputs
  @Input() pagination: Pagination = new Pagination(0, 0, [], 0, '');
  @Input() programmes: Programme[] = [];

  @Output() paginationChange = new EventEmitter<Pagination>();

  @Output('programmeGetPage') programmeGetPage: EventEmitter<Pagination> =
    new EventEmitter();
  @Output('programmeOnUpdate') programmeOnUpdate: EventEmitter<Programme> =
    new EventEmitter();

  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();

  constructor(private musculationService: MusculationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changeees', changes);
    if (changes['programmeCount']) {
      this.pagination.itemCount = changes['programmeCount'].currentValue;
    }
    if (changes['programmes']) {
      this.programmes = changes['programmes'].currentValue;
      this.dataSource = new MatTableDataSource(this.programmes);
    }
    if (changes['pageSize']) {
      this.pagination.pageSize = changes['pageSize'].currentValue;
    }
    if (changes['pageSizeOptions']) {
      this.pagination.pageSizeOptions = changes['pageSizeOptions'].currentValue;
    }
    if (changes['currentPage']) {
      this.pagination.currentPage = changes['currentPage'].currentValue;
    }
    if (changes['programmeSort']) {
      this.pagination.sort = changes['programmeSort'].currentValue;
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.programmes);
    this.pageEvent.pageIndex = this.pagination.currentPage;
    this.pageEvent.pageSize = this.pagination.pageSize;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pagination.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
      this.paginationChange.emit(this.pagination);
    }
  }

  setToUpdate(programme: Programme) {
    this.programmeToUpdate = programme;
    this.nomUpdated = programme.nom;
  }

  onUpdate() {
    console.log('child update event', this.nomUpdated);
    this.programmeToUpdate.nom = this.nomUpdated;
    this.programmeOnUpdate.emit(this.programmeToUpdate);
    this.programmeToUpdate = new Programme();
    this.nomUpdated = '';
  }

  cancelUpdate() {
    this.programmeToUpdate = new Programme();
    this.nomUpdated = '';
  }

  onDelete(idProgramme: number) {
    this.musculationService.deleteProgramme(idProgramme).subscribe(() => {
      this.musculationService
        .getProgrammes(
          this.pageEvent.pageIndex,
          this.pageEvent.pageSize,
          this.pagination.sort
        )
        .subscribe((response) => {
          this.dataSource = new MatTableDataSource(response);
          this.pagination.itemCount = response.length;
        });
    });
  }

  getPage(event: PageEvent) {
    // Creer une class page pour emit les infos plus
    let pagination: Pagination = new Pagination(
      event.length,
      event.pageSize,
      this.pagination.pageSizeOptions,
      event.pageIndex,
      this.pagination.sort
    );
    this.pagination = pagination;
    this.programmeGetPage.emit(pagination);
  }
}
