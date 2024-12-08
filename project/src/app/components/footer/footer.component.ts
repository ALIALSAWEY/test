import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-gray-800 text-white py-8 mt-auto">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">About Us</h3>
            <p class="text-gray-300">Your trusted affiliate marketing platform in Saudi Arabia.</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-300 hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <p class="text-gray-300">Email: support@example.com</p>
            <p class="text-gray-300">Phone: +966 XX XXX XXXX</p>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-700 text-center">
          <p class="text-gray-300">&copy; ${new Date().getFullYear()} Affiliate Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}