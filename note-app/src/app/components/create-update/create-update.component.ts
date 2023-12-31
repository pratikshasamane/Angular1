import { Component, OnInit } from '@angular/core';
import { Notes } from 'src/app/notes';
import { NotesServicesService } from 'src/app/services/notes-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css'],
})
export class CreateUpdateComponent implements OnInit {
  notes: Notes[];

  isUpdating = false;
  public selectedNote: Notes = {
    title: '',
    paragraph: '',
  };

  constructor(
    private notesService: NotesServicesService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const note_id = params['id'];
      if (note_id) {
        
        this.isUpdating = true;
        
        console.log(note_id);
        this.getNote(note_id);
      }
    });
  }

  getNote(id: number) {
    this.notesService.getNoteById(id).subscribe(
      (data: Notes) => {
        console.log(data);

        this.selectedNote = data;
      },
      (error) => {
        console.log('Error present', error);
      }
    );
  }
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.isUpdating) {
      this.updateNote();
    } else {
      this.createNote();
    }
  }
  updateNote() {
    this.notesService.updateNotes(this.selectedNote).subscribe(
      (data) => {
        console.log('User updated successfully', data);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createNote() {
    this.notesService.createNotes(this.selectedNote).subscribe(
      (data) => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
