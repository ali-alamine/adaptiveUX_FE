import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuNotificationService {
  toggleFeedbackNotif$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  displayNotifTime: any = 20000;
  constructor() { }


}
