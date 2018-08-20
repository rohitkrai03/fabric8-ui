import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'f8-redirect-status',
  templateUrl: 'redirect-status.component.html'
})
export class RedirectStatusComponent implements OnInit {

  private redirects: any = {
    _verifyEmail: {
      success: {
        message: 'Your e-mail has been confirmed.',
        secMessage: 'Thank you for validating your e-mail address. You can now continue to use Openshift.io',
        ctaLink: '_home',
        ctaLabel: 'home dashboard'
      },
      fail: {
        message: '',
        secMessage: 'It appears there is a problem with validating your e-mail. You can reset your e-mail on your Profile Page',
        ctaLink: '_profile',
        ctaLabel: 'profile'
      }
    }
  };

  private redirectStatus: string;
  private redirectData: object;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const redirectType = this.route.snapshot.params['redirectType'];
    const queryParams = this.route.snapshot.queryParams;
    this.redirectStatus = queryParams['status'];
    if (this.redirects.hasOwnProperty(redirectType) && this.redirectStatus) {
      this.redirectData = this.redirects[redirectType][this.redirectStatus];
      if (this.redirectStatus === 'fail') {
        this.redirectData['message'] = queryParams['error'];
      }
    }
  }
}
