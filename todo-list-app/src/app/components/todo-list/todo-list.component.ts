import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Lista de Tareas</h1>
      
      <div class="add-todo">
        <input 
          type="text" 
          [(ngModel)]="newTodoTitle" 
          (keyup.enter)="addTodo()"
          placeholder="Agregar nueva tarea..."
        >
        <button (click)="addTodo()">Agregar</button>
      </div>

      <div class="todo-list">
        <div *ngFor="let todo of todos" class="todo-item" [class.completed]="todo.completed">
          <input 
            type="checkbox" 
            [checked]="todo.completed"
            (change)="toggleTodo(todo)"
          >
          <span class="todo-title">{{ todo.title }}</span>
          <button class="delete-btn" (click)="deleteTodo(todo.id!)">Eliminar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .add-todo {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    input[type="text"] {
      flex: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      padding: 8px 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }

    .todo-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .todo-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      background-color: #f9f9f9;
      border-radius: 4px;
    }

    .todo-item.completed .todo-title {
      text-decoration: line-through;
      color: #888;
    }

    .todo-title {
      flex: 1;
    }

    .delete-btn {
      background-color: #f44336;
    }

    .delete-btn:hover {
      background-color: #da190b;
    }
  `]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(
      todos => this.todos = todos,
      error => console.error('Error al cargar las tareas:', error)
    );
  }

  addTodo() {
    if (!this.newTodoTitle.trim()) return;

    const newTodo: Todo = {
      title: this.newTodoTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo).subscribe(
      todo => {
        this.todos.unshift(todo);
        this.newTodoTitle = '';
      },
      error => console.error('Error al agregar la tarea:', error)
    );
  }

  toggleTodo(todo: Todo) {
    this.todoService.updateTodo(todo.id!, !todo.completed).subscribe(
      () => {
        todo.completed = !todo.completed;
      },
      error => console.error('Error al actualizar la tarea:', error)
    );
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(
      () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      error => console.error('Error al eliminar la tarea:', error)
    );
  }
} 