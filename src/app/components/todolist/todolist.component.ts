import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from 'src/app/model/todo.model';
import { LoginService } from 'src/app/services/login.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  user!: string;
  sessionId!: string;
  tasks!: Todo[];
  newTask: Todo = {todoId: 0, title: '', description: '', todoStatus: false, lastModified: new Date()} ;
  page: number = 1;
  pageSize: number = 8;


  ngOnInit(): void {
    let userName = sessionStorage.getItem('user');
    let accessToken = sessionStorage.getItem('accessToken');
    if (userName && accessToken) {
      this.user = userName;
      this.sessionId = accessToken;
      this.getTodoListFromService();
    }
  }

  constructor(private todoService: TodoService, private loginService: LoginService, private router: Router){}

  getTodoListFromService() {
    this.todoService.getTodoList().subscribe(
      (resp: Todo[]) => {
        this.tasks = resp;
      },
      (err: HttpErrorResponse) => {
        this.router.navigate(['/login']);
      }
    )
  }

  addNewTask() {

    // validation 
    if (!this.newTask.title && !this.newTask.description) {
      return;
    }

    this.todoService.createTodo(this.newTask).subscribe((resp) => {
      this.getTodoListFromService();
    },
    (err: HttpErrorResponse) => {
      this.router.navigate(['/login']);
    }
  )
  }

  changeStatusTask(todoId: number) {
    this.todoService.updateTodo(todoId).subscribe((resp) => {
      this.getTodoListFromService();
    },
    (err: HttpErrorResponse) => {
      this.router.navigate(['/login']);
    }
  )
  }

  removeTask(todoId: number) {
    this.todoService.deleteTodo(todoId).subscribe((resp) => {
      this.getTodoListFromService();
    },
    (err: HttpErrorResponse) => {
      this.router.navigate(['/login']);
    }
  )
  }

  handleLogout() {
    this.loginService.logout().subscribe((resp) => {      
      this.router.navigate(['/login']);
    });
  }

}
