import { Component, ElementRef, SkipSelf, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'pu-feedback-notification',
  templateUrl: './feedback-notification.component.html',
  styleUrls: ['./feedback-notification.component.scss']
})
export class FeedbackNotificationComponent {
  @ViewChild('notiFeedback') notiFeedback!: ElementRef;

  constructor(@SkipSelf() private auth: AuthService) { }

  ngAfterViewInit() {
    console.log(this.auth.user$.getValue(), '>>>>>>>>>>>>>>>> LOGGED IN USER <<<<<<<<<<<<<<<')
    const user_style = this.auth.user$.getValue().styles;
    let feedbackNotiClasses: Array<any> = [];
    for (let i = 0; i < user_style.length; i++) {
      if (user_style[i].style_element_name === "feedback-notification") {
        let className: any = user_style[i].style_class;
        console.log(className, ">>>>>>>>>> className <<<<<<<<<")
        this.notiFeedback.nativeElement.classList.add(className);
        // this.notiFeedback.nativeElement.classList.add('sliding-in');
      }
    }

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
