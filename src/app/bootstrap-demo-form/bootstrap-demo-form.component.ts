import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bootstrap-demo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Bootstrap Demo Form</h2>
    <div class="row">
      <div class="col-md-7">
        <h5>Previous Submissions</h5>
        <table class="table table-bordered table-sm mb-3">
          <thead class="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let entry of pagedEntries(); let i = index">
              <td>{{ (currentPage - 1) * pageSize + i + 1 }}</td>
              <td>{{ entry.name }}</td>
              <td>{{ entry.email }}</td>
              <td>{{ entry.message }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-1" (click)="loadEntry((currentPage - 1) * pageSize + i)">View</button>
                <button class="btn btn-sm btn-outline-danger" (click)="deleteEntry((currentPage - 1) * pageSize + i)">Delete</button>
              </td>
            </tr>
            <tr *ngIf="entries.length === 0">
              <td colspan="5" class="text-muted text-center">No submissions yet.</td>
            </tr>
          </tbody>
        </table>
        <nav *ngIf="totalPages() > 1">
          <ul class="pagination justify-content-center">
            <li class="page-item" [class.disabled]="currentPage === 1">
              <button class="page-link" (click)="prevPage()" [disabled]="currentPage === 1">Previous</button>
            </li>
            <li class="page-item" *ngFor="let page of [].constructor(totalPages()); let p = index" [class.active]="currentPage === p + 1">
              <button class="page-link" (click)="goToPage(p + 1)">{{ p + 1 }}</button>
            </li>
            <li class="page-item" [class.disabled]="currentPage === totalPages()">
              <button class="page-link" (click)="nextPage()" [disabled]="currentPage === totalPages()">Next</button>
            </li>
          </ul>
        </nav>
        <button class="btn btn-success w-100" (click)="createNew()">Create New Form</button>
      </div>
      <div class="col-md-7">
        <form (ngSubmit)="onSubmit()" #demoForm="ngForm" class="mb-3">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" id="name" class="form-control" name="name" [(ngModel)]="model.name" [readonly]="readonly" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" class="form-control" name="email" [(ngModel)]="model.email" [readonly]="readonly" required />
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">Message</label>
            <textarea id="message" class="form-control" name="message" [(ngModel)]="model.message" [readonly]="readonly" rows="3"></textarea>
          </div>
          <div class="d-flex gap-2">
            <button *ngIf="readonly" type="button" class="btn btn-warning" (click)="edit()">Edit</button>
            <button *ngIf="!readonly" type="submit" class="btn btn-primary" [disabled]="!demoForm.form.valid">{{ editingIndex === null ? 'Submit' : 'Update' }}</button>
            <button *ngIf="editingIndex !== null && !readonly" type="button" class="btn btn-secondary" (click)="cancelEdit()">Cancel</button>
          </div>
        </form>
        <div *ngIf="submitted" class="alert alert-success mt-3">
          <strong>Form submitted!</strong>
          <pre>{{ model | json }}</pre>
        </div>
      </div>
    </div>
  `
})
export class BootstrapDemoFormComponent {
  entries: Array<{ name: string; email: string; message: string }> = [];
  pageSize = 5;
  currentPage = 1;
  pagedEntries() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.entries.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.ceil(this.entries.length / this.pageSize) || 1;
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }
  model = { name: '', email: '', message: '' };
  submitted = false;
  readonly = false;
  editingIndex: number | null = null;

  onSubmit() {
    this.currentPage = 1;
    if (this.editingIndex !== null) {
      // Update existing entry
      this.entries[this.editingIndex] = { ...this.model };
      this.readonly = true;
      this.submitted = true;
    } else {
      // Add new entry
      this.entries.push({ ...this.model });
      this.readonly = true;
      this.submitted = true;
      this.editingIndex = this.entries.length - 1;
    }
  }

  loadEntry(index: number) {
    this.model = { ...this.entries[index] };
    this.readonly = true;
    this.editingIndex = index;
    this.submitted = false;
  }

  edit() {
    this.readonly = false;
    this.submitted = false;
  }

  createNew() {
    this.model = { name: '', email: '', message: '' };
    this.readonly = false;
    this.editingIndex = null;
    this.submitted = false;
  }

  deleteEntry(index: number) {
    this.entries.splice(index, 1);
    this.createNew();
    if (this.currentPage > this.totalPages()) {
      this.currentPage = this.totalPages();
    }
  }

  cancelEdit() {
    if (this.editingIndex !== null) {
      this.loadEntry(this.editingIndex);
    } else {
      this.createNew();
    }
  }
}
