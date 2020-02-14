import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogDisplayService {

  display: boolean = false;

  constructor() {
  }
}
