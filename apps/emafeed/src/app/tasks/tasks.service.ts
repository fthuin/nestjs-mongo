import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskDto } from '@emafeed/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks$ = new BehaviorSubject<TaskDto[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  create(task: TaskDto) {
    return this.http.post<TaskDto>('/api/tasks/', task).toPromise().then(() => this.getAll());
  }

  getAll(): Observable<TaskDto[]> {
    this.http.get<TaskDto[]>('/api/tasks')
      .pipe(take(1))
      .subscribe((tasks) => this.tasks$.next(tasks));

    return this.tasks$;
  }

  update(task: TaskDto) {
    return this.http.put<TaskDto>(`/api/tasks/${task.id}`, task).toPromise().then(() => this.getAll());
  }

  delete(task: TaskDto) {
    return this.http.delete<void>(`/api/tasks/${task.id}`).toPromise().then(() => this.getAll());
  }
}
