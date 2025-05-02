import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';

interface FoodDonation {
  foodType: string;
  quantity: string;
  expiryTime: string;
  location: string;
  donorName?: string; // Optional field for certificate
}

@Component({
  selector: 'app-donate-food',
  standalone: true,
  templateUrl: './donate-food.component.html',
  styleUrls: ['./donate-food.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class DonateFoodComponent {
  food: FoodDonation = {
    foodType: '',
    quantity: '',
    expiryTime: '',
    location: '',
    donorName: ''
  };

  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  dismissAlert(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      setTimeout(() => this.dismissAlert(), 5000);
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.http.post('http://localhost:5000/food/add', this.food).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.successMessage = 'Food donated successfully! Your certificate is downloading...';
        this.generateCertificate();
        this.resetForm(form);
        setTimeout(() => this.dismissAlert(), 5000);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.handleError(error);
        console.error('Donation error:', error);
        setTimeout(() => this.dismissAlert(), 5000);
      }
    });
  }

  private generateCertificate(): void {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm'
    });
  
    // Add background
    doc.setFillColor(240, 255, 240);
    doc.rect(0, 0, 297, 210, 'F');
  
    // Title
    doc.setFontSize(28);
    doc.setTextColor(40, 120, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('Food Donation Certificate', 105, 30, { align: 'center' });
  
    // Border
    doc.setDrawColor(100, 200, 100);
    doc.setLineWidth(1);
    doc.rect(20, 20, 257, 170);
  
    // Content
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text('This certificate is presented to', 105, 50, { align: 'center' });
  
    // Donor name (use "Generous Donor" if name not provided)
    doc.setFontSize(24);
    doc.setTextColor(40, 120, 40);
    doc.setFont('helvetica', 'bold');
    doc.text(this.food.donorName || 'Generous Donor', 105, 70, { align: 'center' });
  
    // Donation details
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('for donating', 105, 90, { align: 'center' });
    
    doc.setFontSize(20);
    doc.setTextColor(40, 120, 40);
    doc.text(`${this.food.quantity} ${this.food.quantity === '1' ? 'item' : 'items'} of ${this.food.foodType}`, 105, 110, { align: 'center' });
  
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Expiry: ${new Date(this.food.expiryTime).toLocaleDateString()}`, 105, 130, { align: 'center' });
    doc.text(`Location: ${this.food.location}`, 105, 145, { align: 'center' });
  
    // Appreciation message
    doc.setFontSize(14);
    doc.text('Your contribution helps fight hunger in our community.', 105, 165, { align: 'center' });
  
    // Signature section
    doc.setFontSize(12);
    
    // Signature line with styled "Siva"
    doc.setTextColor(40, 120, 40);
    doc.setFont('times', 'italic');
    doc.text('Siva', 70, 190);
    doc.setDrawColor(100, 200, 100);
    doc.line(70, 192, 120, 192); // Signature underline
    
    // Signature title
    doc.setFont('helvetica', 'normal');
    doc.text('Food Bank Director', 70, 200);
  
    // Donation date
    const donationDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    doc.text('_________________________', 180, 190);
    doc.text(`Date: ${donationDate}`, 180, 200);
  
    // Save PDF with donor name if available
    const fileName = this.food.donorName 
      ? `Food_Donation_Certificate_${this.food.donorName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`
      : `Food_Donation_Certificate_${new Date().toISOString().slice(0, 10)}.pdf`;
    
    doc.save(fileName);
  }
  private handleError(error: HttpErrorResponse): void {
    if (error.status === 0) {
      this.errorMessage = 'Network error. Please check your internet connection.';
    } else if (error.status >= 400 && error.status < 500) {
      this.errorMessage = error.error?.message || 'Invalid data. Please check your inputs.';
    } else {
      this.errorMessage = 'Server error. Please try again later.';
    }
  }

  resetForm(form: NgForm): void {
    this.food = {
      foodType: '',
      quantity: '',
      expiryTime: '',
      location: '',
      donorName: ''
    };
    form.resetForm();
  }
}