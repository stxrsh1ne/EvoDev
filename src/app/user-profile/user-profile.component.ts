import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Data} from '../data';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: Data | null = null;
  role: 'user' | 'admin' = 'admin';
  isEditing: boolean = false;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.dataService.getAllUsers().subscribe({
      next: (response) => {
        this.user = response.find(user => user.id === id) || null;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      },
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    console.log('Changes saved:', this.user);
    this.toggleEdit();
  }
}
