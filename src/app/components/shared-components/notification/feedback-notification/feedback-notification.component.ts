import { Component, ElementRef, SkipSelf, ViewChild } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, takeLast } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PuNotificationService } from 'src/app/core/services/pu-notification.service';
import { MetadataService } from 'src/app/core/services/singleton/metadata.service';

@Component({
  selector: 'pu-feedback-notification',
  templateUrl: './feedback-notification.component.html',
  styleUrls: ['./feedback-notification.component.scss']
})

export class FeedbackNotificationComponent {
  @ViewChild('notiFeedback') notiFeedback!: ElementRef;

  isNotifiDisplayed: boolean = false;
  posUserFeedback: any = false;
  appeaUserFeedback: any = false;
  appearanceStyle: BehaviorSubject<any> = new BehaviorSubject<any>('');
  posStyle: BehaviorSubject<any> = new BehaviorSubject<any>('');
  user_style: any;

  constructor(@SkipSelf() private auth: AuthService, @SkipSelf() private metaServ: MetadataService, @SkipSelf() public notiServ: PuNotificationService) {

    this.isNotifiDisplayed = true;
    let user: any = localStorage.getItem('user'); 
    this.user_style = this.auth.user$.getValue()?.styles || JSON.parse(user)?.styles || [];

    for (const record of this.user_style) {

      if (record.style_type === 'appearance') {
        this.appearanceStyle.next(record);

        if (record.user_style_feedback == 2) {
          this.appeaUserFeedback = true;
        }
      }

      else if (record.style_type === 'pos') {
        this.posStyle.next(record);

        if (record.user_style_feedback == 2) {
          this.posUserFeedback = true;
        }

      }
    }


    this.notiServ.toggleFeedbackNotif$.pipe(
      distinctUntilChanged()
    ).subscribe(
      (data: boolean) => {
        switch (data) {
          case true:
            this.showNotification();
            break;
          case false:
            // this.hideNotification();
            break;
        }
      }
    )
  }

  ngAfterViewInit() {
    const user_style: any = this.user_style;

    user_style.length === 0 ? this.notiFeedback.nativeElement.classList.add('center') : '';
    user_style.length === 0 ? this.notiFeedback.nativeElement.classList.add('sliding-in') : '';

    for (let i = 0; i < user_style.length; i++) {
      if (user_style[i].style_element_name === "feedback-notification" && user_style[i].user_style_feedback == 1 || user_style[i].user_style_feedback == 2) {
        let className: any = user_style[i].style_class;
        this.notiFeedback.nativeElement.classList.add(className);
      }
    }

    // setTimeout(() => {
    //   this.showNotification()
    // }, 100);
  }

  closeNotif() {
    this.hideNotification();
  }

  onThumbClick(type: any, feedback: any) {
    let class_arr: string[] = [];
    let string: string = this.notiFeedback.nativeElement.className;

    switch (type) {
      case 'pos':
        this.posUserFeedback = true;
        class_arr = string.split(' ').filter(className =>
          className !== 'pu-feedback-not' &&
          className !== 'active' &&
          (className.includes('top') || className.includes('bottom') || className.includes('center'))
        );

        break;
      case 'appearance':
        this.appeaUserFeedback = true;
        class_arr = string.split(' ').filter(className =>
          className !== 'pu-feedback-not' &&
          className !== 'active' &&
          (!className.includes('top') && !className.includes('bottom'))
        );
    }

    let style_type_id = '';
    let user: any = localStorage.getItem('user');
    const user_style: any = this.auth.user$.getValue()?.styles || JSON.parse(user)?.styles || [];

    for (let i = 0; i < user_style.length; i++) {
      let item = user_style[i];
      if (item.style_class == class_arr[0]) {
        style_type_id = item?.style_type_id || null;
      }
    }
    let formData = new FormData();
    formData.append('user_id', JSON.parse(user).user_data[0].user_id);
    formData.append('style_type_id', style_type_id);
    formData.append('type', type);
    formData.append('feedback', feedback);

    this.metaServ.submitUserFeedbackStyle(formData).subscribe(
      (data: any) => {
        console.log(data, '>>>>>>>>>>>>> datas ');
      }
    )

    if (this.posUserFeedback && this.appeaUserFeedback) {
      setTimeout(() => {
        this.hideNotification();
      }, 500);
    }
  }

  showNotification() {
    this.isNotifiDisplayed = true;
    setTimeout(() => {

      this.notiFeedback.nativeElement.classList.add('active');
    });

    // Hide the notification automatically 
    // setTimeout(() => {
    //   this.hideNotification();
    // }, this.notiServ.displayNotifTime);

  }

  // Function to trigger the fade-out effect
  hideNotification() {

    setTimeout(() => {
      this.notiFeedback.nativeElement.classList.remove('active');
      this.notiServ.toggleFeedbackNotif$.next(false)

      this.isNotifiDisplayed = false;
    });

  }

}