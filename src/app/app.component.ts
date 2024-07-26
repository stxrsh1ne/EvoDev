import {Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import {FactoryComponentComponent} from "./factory-component/factory-component.component";
import {HttpErrorResponse} from "@angular/common/http";
import * as Notiflix from 'notiflix';
import {DataService} from "./data.service";
import {Data} from './data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('dynamicComp', {read: ViewContainerRef})
  private viewRef!: ViewContainerRef;

  private componentRef!: ComponentRef<FactoryComponentComponent>;

  users: Data[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private dataService: DataService
  ) {
  }

  addComponent() {
    this.getUsers();
    Notiflix.Notify.success('Successfully add component');
  }

  deleteComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null!;
    }
    Notiflix.Notify.failure('Successfully delete component');
  }

  getUsers() {
    this.dataService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        console.log('Fetched Users:', response);
        Notiflix.Notify.success('Successfully requested users');
        this.createDynamicComponent();
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        Notiflix.Notify.warning('Error fetching users');
        this.handleErrors(err);
      }
    });
  }

  createDynamicComponent() {
    this.viewRef.clear();
    const factory = this.resolver.resolveComponentFactory(FactoryComponentComponent);
    this.componentRef = this.viewRef.createComponent(factory);
    this.componentRef.instance.users = this.users;
  }

  handleErrors(err: HttpErrorResponse) {
    if (err.status === 404) {
      console.error('Error fetching posts: Not Found (404)', err);
      Notiflix.Notify.failure('Warning: Posts not found (404)');
    } else if (err.status === 500) {
      console.error('Server Error (500):', err);
      Notiflix.Notify.failure('Server Error: Please try again later.');
    } else {
      console.error('An unexpected error occurred:', err);
      Notiflix.Notify.failure('An unexpected error occurred');
    }
  }
}
