import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleDisplayService {
  public isViewable: boolean;
  constructor() { this.isViewable = true; }

  public toggle(): void { this.isViewable = !this.isViewable; }
}
