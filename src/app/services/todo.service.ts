import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.appURL + `/todos`)
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(environment.appURL + `/todo`, todo)
  }

  updateTodo(todoId: number): Observable<Todo> {
    return this.http.put<Todo>(environment.appURL + `/todo`, todoId)
  }

  deleteTodo(todoId: number): Observable<any> {
    return this.http.delete(environment.appURL + `/todo/${todoId}`)
  }

}
