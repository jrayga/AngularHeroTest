import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from 'src/resources/models/users';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private mockAPI = 'https://6086d739a3b9c200173b7031.mockapi.io/';

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
  ) { }

  getAllUsers() {
    return this.http.get<Array<Users>>(`${this.mockAPI}users`);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.mockAPI}users/${userId}`).toPromise();
  }

  addNewUser(user: Users) {
    return this.http.post(`${this.mockAPI}users`, user).toPromise();
  }

  updateUserDetails(user: Users) {
    return this.http.put(`${this.mockAPI}users/${user.id}`, user).toPromise();
  }
}
