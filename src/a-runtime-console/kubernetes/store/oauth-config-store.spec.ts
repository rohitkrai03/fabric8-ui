import { ErrorHandler } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';

import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subscription
} from 'rxjs';


import { createMock } from 'testing/mock';

import {
  Logger
} from 'ngx-base';
import {
  User,
  UserService
} from 'ngx-login-client';

import {
  OAuthConfig,
  OAuthConfigStore
} from './oauth-config-store';

import { NotificationsService } from '../../../app/shared/notifications.service';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OauthConfigStore', () => {

  let mockUserService: UserService;
  let controller: HttpTestingController;
  let oauthStore: OAuthConfigStore;

  let mockLogger: jasmine.SpyObj<Logger>;
  let mockErrorHandler: jasmine.SpyObj<ErrorHandler>;
  let mockNotificationsService: jasmine.SpyObj<NotificationsService>;

  let user: User = {
    attributes: {
      fullName: 'mock',
      imageURL: 'mock',
      username: 'mock',
      cluster: 'http://api.example.com/cluster/'
    },
    id: 'mock',
    type: 'mock'
  };

  let data = {};

  let subscriptions: Subscription[] = [];

  beforeEach(() => {
    mockLogger = jasmine.createSpyObj<Logger>('Logger', ['error']);
    mockErrorHandler = jasmine.createSpyObj<ErrorHandler>('ErrorHandler', ['handleError']);
    mockNotificationsService = jasmine.createSpyObj<NotificationsService>('NotificationsService', ['message']);
  });

  afterEach(() => {
    subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  });

  describe('success state', () => {
    beforeEach(() => {
      mockUserService = createMock(UserService);
      mockUserService.loggedInUser = new BehaviorSubject(user).multicast(() => new ReplaySubject(1));

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          {
            provide: UserService, useClass: mockUserService
          },
          {
            provide: Logger, useValue: mockLogger
          },
          {
            provide: ErrorHandler, useValue: mockErrorHandler
          },
          {
            provide: NotificationsService, useValue: mockNotificationsService
          },
          {
            // provide OAuthConfigStore with a factory inside the fakeAsync zone
            // so the mockBackend can catch http requests made inside the constructor
            provide: OAuthConfigStore, useFactory: fakeAsync((
              http: HttpClient,
              controller: HttpTestingController,
              logger: Logger,
              errorHandler: ErrorHandler,
              notifications: NotificationsService
            ) => {
              const req = controller.expectOne('/_config/oauth.json');
              expect(req.request.method).toBe('GET');
              req.flush(data);

              return new OAuthConfigStore(http, mockUserService, logger, errorHandler, notifications);
            }),
            deps: [HttpClient, HttpTestingController, Logger, ErrorHandler, NotificationsService]
          }
        ]
      });

      controller = TestBed.get(HttpTestingController);
      oauthStore = TestBed.get(OAuthConfigStore);
    });

    it('should load and set oauthconfig with openshift console on init', (done: DoneFn) => {
      mockUserService.loggedInUser.connect();
      subscriptions.push(oauthStore.loading.subscribe((val: boolean) => {
        if (!val) {
          subscriptions.push(oauthStore.resource.subscribe((config: OAuthConfig) => {
            expect(config.loaded).toBeTruthy();
            expect(config.openshiftConsoleUrl).toEqual('http://console.example.com/cluster/console');

            expect(mockLogger.error).not.toHaveBeenCalled();
            expect(mockErrorHandler.handleError).not.toHaveBeenCalled();
            expect(mockNotificationsService.message).not.toHaveBeenCalled();
            done();
          }));
        }
      }));
    });
  });

  describe('user service empty', () => {
    beforeEach(() => {
      mockUserService = createMock(UserService);
      mockUserService.loggedInUser = new BehaviorSubject({} as User).multicast(() => new ReplaySubject(1));

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          {
            provide: UserService, useClass: mockUserService
          },
          {
            provide: Logger, useValue: mockLogger
          },
          {
            provide: ErrorHandler, useValue: mockErrorHandler
          },
          {
            provide: NotificationsService, useValue: mockNotificationsService
          },
          {
            // provide OAuthConfigStore with a factory inside the fakeAsync zone
            // so the mockBackend can catch http requests made inside the constructor
            provide: OAuthConfigStore, useFactory: fakeAsync((
              http: HttpClient,
              controller: HttpTestingController,
              logger: Logger,
              errorHandler: ErrorHandler,
              notifications: NotificationsService
            ) => {
              const req = controller.expectOne('/_config/oauth.json');
              expect(req.request.method).toBe('GET');
              req.flush(data);

              return new OAuthConfigStore(http, mockUserService, logger, errorHandler, notifications);
            }),
            deps: [HttpClient, HttpTestingController, Logger, ErrorHandler, NotificationsService]
          }
        ]
      });

      controller = TestBed.get(HttpTestingController);
      oauthStore = TestBed.get(OAuthConfigStore);
    });

    it('should continue', (done: DoneFn) => {
      mockUserService.loggedInUser.connect();
      subscriptions.push(oauthStore.loading.subscribe((val: boolean) => {
        if (!val) {
          subscriptions.push(oauthStore.resource.subscribe((config: OAuthConfig) => {
            expect(config.loaded).toBeTruthy();
            expect(config.openshiftConsoleUrl).toBeUndefined();

            expect(mockLogger.error).not.toHaveBeenCalled();
            expect(mockErrorHandler.handleError).not.toHaveBeenCalled();
            expect(mockNotificationsService.message).not.toHaveBeenCalled();
            done();
          }));
        }
      }));
    });
  });

  describe('user service error', () => {
    beforeEach(() => {
      mockUserService = createMock(UserService);
      mockUserService.loggedInUser = Observable.throw({error : 'error'}).multicast(() => new ReplaySubject(1));

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          {
            provide: UserService, useClass: mockUserService
          },
          {
            provide: Logger, useValue: mockLogger
          },
          {
            provide: ErrorHandler, useValue: mockErrorHandler
          },
          {
            provide: NotificationsService, useValue: mockNotificationsService
          },
          {
            // provide OAuthConfigStore with a factory inside the fakeAsync zone
            // so the mockBackend can catch http requests made inside the constructor
            provide: OAuthConfigStore, useFactory: fakeAsync((
              http: HttpClient,
              controller: HttpTestingController,
              logger: Logger,
              errorHandler: ErrorHandler,
              notifications: NotificationsService
            ) => {
              const req = controller.expectOne('/_config/oauth.json');
              expect(req.request.method).toBe('GET');
              req.flush(data);

              return new OAuthConfigStore(http, mockUserService, logger, errorHandler, notifications);
            }),
            deps: [HttpClient, HttpTestingController, Logger, ErrorHandler, NotificationsService]
          }
        ]
      });

      controller = TestBed.get(HttpTestingController);
      oauthStore = TestBed.get(OAuthConfigStore);
    });

    it('should notify on user service error', (done: DoneFn) => {
      mockUserService.loggedInUser.connect();
      subscriptions.push(oauthStore.loading.subscribe((val: boolean) => {
        expect(val).toBeFalsy();
        expect(mockLogger.error).toHaveBeenCalled();
        expect(mockErrorHandler.handleError).toHaveBeenCalled();
        expect(mockNotificationsService.message).toHaveBeenCalled();
        done();
      }));
    });
  });

  describe('config request error', () => {
    beforeEach(() => {
      mockUserService = createMock(UserService);
      mockUserService.loggedInUser = new BehaviorSubject(user).multicast(() => new ReplaySubject(1));

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          {
            provide: UserService, useClass: mockUserService
          },
          {
            provide: Logger, useValue: mockLogger
          },
          {
            provide: ErrorHandler, useValue: mockErrorHandler
          },
          {
            provide: NotificationsService, useValue: mockNotificationsService
          },
          {
            // provide OAuthConfigStore with a factory inside the fakeAsync zone
            // so the mockBackend can catch http requests made inside the constructor
            provide: OAuthConfigStore, useFactory: fakeAsync((
              http: HttpClient,
              controller: HttpTestingController,
              logger: Logger,
              errorHandler: ErrorHandler,
              notifications: NotificationsService
            ) => {
              const req = controller.expectOne('/_config/oauth.json');
              expect(req.request.method).toBe('GET');
              req.flush(data);

              return new OAuthConfigStore(http, mockUserService, logger, errorHandler, notifications);
            }),
            deps: [HttpClient, HttpTestingController, Logger, ErrorHandler, NotificationsService]
          }
        ]
      });

      controller = TestBed.get(HttpTestingController);
      oauthStore = TestBed.get(OAuthConfigStore);
    });

    it('should notify on config http error', (done: DoneFn) => {
      mockUserService.loggedInUser.connect();
      subscriptions.push(oauthStore.loading.subscribe((val: boolean) => {
        if (!val) {
          expect(mockLogger.error).toHaveBeenCalled();
          expect(mockErrorHandler.handleError).toHaveBeenCalled();
          expect(mockNotificationsService.message).toHaveBeenCalled();
          done();
        }
      }));
    });
  });
});
