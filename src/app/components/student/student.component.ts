import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent implements OnInit {
  stdObj: StudentModel = new StudentModel();
  studentList: StudentModel[] = [];
  constructor() {}
  @ViewChild('myModal') stdModal: ElementRef | undefined;
  localData: any;

  ngOnInit(): void {
    this.getStudentList();
  }
  openModal() {
    if (this.stdModal != null) {
      this.stdModal.nativeElement.style.display = 'block';
    }
  }
  closeModal() {
    this.stdObj = new StudentModel();
    if (this.stdModal != null) {
      this.stdModal.nativeElement.style.display = 'none';
    }
  }
  onUpdateForm() {
    const currentStd = this.studentList.find((s) => s.id === this.stdObj.id);
    if (currentStd != undefined) {
      currentStd.name = this.stdObj.name;
      currentStd.mobile = this.stdObj.mobile;
      currentStd.email = this.stdObj.email;
      currentStd.gender = this.stdObj.gender;
      currentStd.joined_date = this.stdObj.joined_date;
      currentStd.address = this.stdObj.address;
      currentStd.status = this.stdObj.status;
    }
    localStorage.setItem('studentData', JSON.stringify(this.studentList));
    this.closeModal();
    this.getStudentList();
  }

  onSaveForm() {
    this.localData = localStorage.getItem('studentData');
    if (this.localData != null) {
      const stdData = JSON.parse(this.localData);
      this.stdObj.id = stdData.length + 1;
      stdData.push(this.stdObj);
      localStorage.setItem('studentData', JSON.stringify(stdData));
    } else {
      const newStd = [];
      newStd.push(this.stdObj);
      this.stdObj.id = 1;
      localStorage.setItem('studentData', JSON.stringify(newStd));
    }
    this.closeModal();
    this.getStudentList();
  }
  onEdit(studentData: StudentModel) {
    this.stdObj = studentData;
    this.openModal();
  }
  onDelete(data: StudentModel) {
    const isConfirm = confirm('Are you sure you want to delete this student');
    if (isConfirm) {
      const currentStd = this.studentList.findIndex((s) => s.id === data.id);
      this.studentList.splice(currentStd, 1);
      localStorage.setItem('studentData', JSON.stringify(this.studentList));
      console.log('Student deleted successfully.');
    }
  }

  getStudentList() {
    this.localData = localStorage.getItem('studentData');
    if (this.localData != null) {
      this.studentList = JSON.parse(this.localData);
    }
  }
}
export class StudentModel {
  id!: number;
  name!: string;
  mobile!: string;
  email!: string;
  gender!: string;
  address!: string;
  status!: boolean;
  joined_date: Date = new Date();
  constructor() {
    this.id = 0;
    this.name = '';
    this.mobile = '';
    this.email = '';
    this.gender = '';
    this.address = '';
    this.status = false;
    this.joined_date = new Date();
  }
}
