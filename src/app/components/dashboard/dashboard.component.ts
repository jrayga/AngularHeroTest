import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/resources/models/users';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public users: Users[];
  public userForm = new Users(null, new Date(), "", "", "", 0, false);
  public latestUserId = '';

  page = 1;
  pageSize = 10;
  closeResult = '';

  constructor(
    private usersService: UsersService,
    private modalService: NgbModal
  ) {
    this.users = [];
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    Swal.fire({
      title: "Loading Users! Please wait...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      timer: 3000,
      timerProgressBar: true
    });

    this.usersService.getAllUsers()
      .subscribe(users => {
        this.users = users;
        console.log("🚀 ~ file: dashboard.component.ts ~ line 27 ~ DashboardComponent ~ getAllUsers ~  this.users", this.users)
      });
  }

  deleteUser(userId: string) {
    console.log("🚀 ~ file: dashboard.component.ts ~ line 32 ~ DashboardComponent ~ deleteUser ~ userId", userId)
    Swal.fire({
      title: 'Are you sure?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete the user'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.usersService.deleteUser(userId)
          await Swal.fire(
            'Deleted!',
            'User has been Deleted.',
            'success'
          )
          this.getAllUsers();
        } catch (error) {
          console.log("🚀 ~ file: dashboard.component.ts ~ line 64 ~ DashboardComponent ~ deleteUser ~ error", error)
        }
      }
    })
  }

  addNewUser(addNewUserModal: any) {
    this.userForm = new Users(null, new Date(), "", "", "", 0, false);
    this.modalService.open(addNewUserModal, { ariaLabelledBy: 'Add New User' }).result.then(async (result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("🚀 ~ file: dashboard.component.ts ~ line 79 ~ DashboardComponent ~ this.modalService.open ~ this.closeResult", this.closeResult)
      if (result === 'Save') {
        console.log("closed with saved")
        console.log(this.userForm)
        try {
          await this.usersService.addNewUser(this.userForm);
          await Swal.fire(
            'New User Added!',
            'New User has been Added to the list.',
            'success'
          )
          this.getAllUsers();
        } catch (error) {
          console.log("🚀 ~ file: dashboard.component.ts ~ line 95 ~ DashboardComponent ~ this.modalService.open ~ error", error)
        }
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("🚀 ~ file: dashboard.component.ts ~ line 81 ~ DashboardComponent ~ this.modalService.open ~  this.closeResult", this.closeResult)
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  editUser(editUserModal: any, user: Users) {
    console.log("🚀 ~ file: dashboard.component.ts ~ line 115 ~ DashboardComponent ~ editUser ~ user", user)
    this.userForm = user;
    this.modalService.open(editUserModal, { ariaLabelledBy: 'Edit User' }).result.then(async (result) => {
      if (result === 'Save') {
        console.log("closed with saved")
        console.log(this.userForm)
        try {
          await this.usersService.updateUserDetails(this.userForm);
          await Swal.fire(
            'User Details Updated!',
            'User Details has been updated.',
            'success'
          )
          this.getAllUsers();
        } catch (error) {
          console.log("🚀 ~ file: dashboard.component.ts ~ line 131 ~ DashboardComponent ~ this.modalService.open ~ error", error)
        }
      }
    }, (reason) => {
      console.log("🚀 ~ file: dashboard.component.ts ~ line 135 ~ DashboardComponent ~ this.modalService.open ~ reason", reason)
    });
  }

}
