import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { Broadcaster, Logger } from 'ngx-base';
import { AUTH_API_URL, AuthenticationService } from 'ngx-login-client';
import { ProviderService } from './provider.service';

import { createMock } from 'testing/mock';

describe('Service: Provider Service', () => {

    let service: ProviderService;
    let controller: HttpTestingController;
    let mockLogger: jasmine.SpyObj<Logger>;
    class BroadcasterTestProvider {
      static broadcaster = new Broadcaster();
    }

    beforeEach(() => {
      const mockAuthenticationService: jasmine.SpyObj<AuthenticationService> = createMock(AuthenticationService);
      mockAuthenticationService.getToken.and.returnValue('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiY2xpZW50X3Nlc3Npb24iOiJURVNUU0VTU0lPTiIsInNlc3Npb25fc3RhdGUiOiJURVNUU0VTU0lPTlNUQVRFIiwiYWRtaW4iOnRydWUsImp0aSI6ImY5NWQyNmZlLWFkYzgtNDc0YS05MTk0LWRjM2E0YWFiYzUwMiIsImlhdCI6MTUxMDU3MTMxOSwiZXhwIjoxNTEwNTgwODI3fQ.l0m6EFvk5jbND3VOXL3gTkzTz0lYQtPtXS_6C24kPQk');
      mockLogger = jasmine.createSpyObj<Logger>('Logger', ['error']);

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          { provide: Logger, useValue: mockLogger },
          { provide: AuthenticationService, useValue: mockAuthenticationService },
          { provide: AUTH_API_URL, useValue: 'https://auth.fabric8.io/api/' },
          { provide: Broadcaster, useValue: BroadcasterTestProvider.broadcaster },
          ProviderService
        ]
      });
      service = TestBed.get(ProviderService);
      controller = TestBed.get(HttpTestingController);
    });

    it('Get legacy linking url', () => {
      let val = service.getLegacyLinkingUrl('openshift-v3', 'testredirect');
      expect(val).toEqual('https://auth.fabric8.io/api/link/session?clientSession=TESTSESSION&sessionState=TESTSESSIONSTATE&redirect=testredirect&provider=openshift-v3');
    });
});
