import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bootstrap-demo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bootstrap-demo-form.component.html',
  styleUrls: ['./bootstrap-demo-form.component.css']
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
