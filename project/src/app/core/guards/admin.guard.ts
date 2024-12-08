import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Implement actual admin authentication logic here
    const isAdmin = false;
    
    if (!isAdmin) {
      this.router.navigate(['/login']);
      return false;
    }
    
    return true;
  }
}