import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donate-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss'],
  imports: [CommonModule,FormsModule],
})
export class DonationListComponent implements OnInit {
  ngOnInit() {
    this.applyFilters();
    
    
    this.calculateStats();
    this.fetchDonations();
  }
  donations: any[] = [];
  errorMessage = '';
  currentDate: Date = new Date();
  searchText: string = '';
  statusFilter: string = '';
  locationFilter: string = '';
  filteredDonations: any[] = [];
  uniqueLocations: string[] = [];
  
  // Stats properties
  availableCount: number = 0;
  claimedCount: number = 0;
  distributedCount: number = 0;
  totalQuantity: number = 0;
 
  
  applyFilters() {
    
    
    this.filteredDonations = this.donations.filter(donation => {
      const matchesSearch = !this.searchText || 
        donation.foodType.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (donation.description && donation.description.toLowerCase().includes(this.searchText.toLowerCase()));
      
      const matchesStatus = !this.statusFilter || donation.status === this.statusFilter;
      const matchesLocation = !this.locationFilter || donation.location === this.locationFilter;
      
      return matchesSearch && matchesStatus && matchesLocation;
    });
  
    this.calculateStats();
  }
  

  calculateStats() {
    this.availableCount = this.donations.filter(d => d.status === 'available').length;
    this.claimedCount = this.donations.filter(d => d.status == 'claimed').length;
    this.distributedCount = this.donations.filter(d => d.status === 'distributed').length;
    this.totalQuantity = this.donations.reduce((sum, d) => sum + (d.quantity || 0), 0);
    
    // Extract unique locations
    this.uniqueLocations = [...new Set(this.donations.map(d => d.location))].filter(l => l);
  }

  resetFilters() {
    this.searchText = '';
    this.statusFilter = '';
    this.locationFilter = '';
    this.applyFilters();
  }

  refreshList() {
    // Add your refresh logic here
    this.fetchDonations(); // Fetch donations again to refresh the list
  }

  exportToCSV() {
    // Add CSV export logic here
  }

  viewDetails(food: any) {
    // Add details view logic here
  }

  constructor(private http: HttpClient) {}

  

  deleteFood(donationId: any) {
    this.http.delete(`http://localhost:5000/food/deletefood/${donationId}`)
      .subscribe({
        next: () => {
          this.donations = this.donations.filter(donation => donation._id !== donationId);
          this.applyFilters(); // Reapply filters after deletion
      },
        error: (error) => {
          this.errorMessage = 'Failed to delete. Please try again.';
          console.error('Error:', error);
        }
      });
  }

  claimFood(foodId: string): void {
    this.http.put(`http://localhost:5000/food/claim/${foodId}`, {})
      .subscribe({
        next: () => {
          // Refresh the list or update status locally
          this.donations = this.donations.map(food => {
            if (food._id === foodId) {
              return { ...food, status: 'claimed' };
            }
            return food;
          });
          this.applyFilters();
        },
        error: (error) => {
          this.errorMessage = 'Failed to claim the food. Please try again.';
          console.error('Error:', error);
        }
      });
  }
  

  fetchDonations() {
    this.http.get<any[]>('http://localhost:5000/food/donations')
      .subscribe({
        next: (data) => {
          this.donations = data;
          this.applyFilters();       // Apply filters *after* data is set
          this.calculateStats();  
         
     // Optional: already inside applyFilters()
        },
        error: (error) => {
          this.errorMessage = 'Failed to load food donations. Please try again.';
          console.error('Error:', error);
        }
      });
  }
  
}
