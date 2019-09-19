import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TasksService } from './tasks.service';
import { Observable } from 'rxjs';
import { TaskDto } from '@emafeed/api-interfaces';
import { take } from 'rxjs/operators';

@Component({
  selector: 'emafeed-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @ViewChildren('taskTitle') taskTitles: QueryList<ElementRef<HTMLInputElement>>;
  tasks$: Observable<TaskDto[]>;

  constructor(
    private tasksService: TasksService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.tasks$ = this.tasksService.getAll();
  }

  trackByIds(task: TaskDto) {
    return task.id;
  }

  create() {
    this.tasksService.create({
      title: '',
      description: '',
      done: false,
    }).then(() => {
      this.taskTitles.changes.pipe(take(1)).subscribe(() => {
        const inputElement = this.taskTitles.last.nativeElement;
        inputElement.select();
      })
    });
  }

  update(task: TaskDto) {
    this.tasksService.update(task);
  }

  delete(task: TaskDto) {
    this.tasksService.delete(task);
  }

}
