// certificate.service.ts
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  generateDonationCertificate(donationData: any) {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm'
    });

    // Add background color
    doc.setFillColor(240, 240, 255);
    doc.rect(0, 0, 297, 210, 'F'); // A4 landscape size

    // Add title
    doc.setFontSize(28);
    doc.setTextColor(40, 40, 120);
    doc.setFont('helvetica', 'bold');
    doc.text('Certificate of Appreciation', 105, 30, { align: 'center' });

    // Add decorative border
    doc.setDrawColor(100, 100, 200);
    doc.setLineWidth(1);
    doc.rect(20, 20, 257, 170);

    // Add content
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text('This certificate is proudly presented to', 105, 50, { align: 'center' });

    // Donor name
    doc.setFontSize(24);
    doc.setTextColor(40, 40, 120);
    doc.setFont('helvetica', 'bold');
    doc.text(donationData.name, 105, 70, { align: 'center' });

    // Donation details
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text('in recognition of your generous donation of', 105, 90, { align: 'center' });
    
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 120);
    doc.setFont('helvetica', 'bold');
    doc.text(`$${donationData.amount}`, 105, 110, { align: 'center' });

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(`on ${new Date(donationData.date).toLocaleDateString()}`, 105, 125, { align: 'center' });

    // Organization details
    doc.setFontSize(14);
    doc.text('We sincerely appreciate your support', 105, 145, { align: 'center' });
    doc.text('and commitment to our cause.', 105, 155, { align: 'center' });

    // Signature line
    doc.setFontSize(12);
    doc.text('_________________________', 70, 180);
    doc.text('Director', 70, 185);
    doc.text('_________________________', 180, 180);
    doc.text('Date', 180, 185);

    // Add logo (if you have one)
    // const logo = new Image();
    // logo.src = 'assets/logo.png';
    // doc.addImage(logo, 'PNG', 230, 160, 40, 20);

    // Save the PDF
    doc.save(`Donation_Certificate_${donationData.name.replace(' ', '_')}.pdf`);
  }
}