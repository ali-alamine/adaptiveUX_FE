import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'pu-feedback-notification',
  templateUrl: './feedback-notification.component.html',
  styleUrls: ['./feedback-notification.component.scss']
})
export class FeedbackNotificationComponent {
  @ViewChild('notiFeedback') notiFeedback!: ElementRef;

  constructor() {

  }

  ngAfterViewInit() {
    this.notiFeedback.nativeElement.classList.add('bottom-left');
    setTimeout(() => {
      this.fadeIn()
      
    }, 100);
  }

  onThumbUpClick() {
    // Handle thumb up click
    console.log('Thumb up clicked!');
    this.fadeOut();
  }

  onThumbDownClick() {
    // Handle thumb down click
    console.log('Thumb down clicked!');
  }


  fadeIn() {
    this.notiFeedback.nativeElement.classList.add('active');
  }

  // Function to trigger the fade-out effect
  fadeOut() {
    this.notiFeedback.nativeElement.classList.remove('active');
  }

  slideIn() {
    this.notiFeedback.nativeElement.classList.add('active');
  }

  // Function to trigger the slide-out effect
  slideOut() {
    this.notiFeedback.nativeElement.classList.remove('active');
  }

}
