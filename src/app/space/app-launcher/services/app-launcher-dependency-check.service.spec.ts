import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { Context } from 'ngx-fabric8-wit';
import {
    DependencyCheck
} from 'ngx-launcher';

import { ContextService } from '../../../shared/context.service';
import { DeploymentApiService } from '../../create/deployments/services/deployment-api.service';
import { AppLauncherDependencyCheckService } from './app-launcher-dependency-check.service';

let mockDeploymentApiService: any = {
  getApplications(): Observable<any[]> {
      return Observable.of([{
          attributes: {name: 'app-apr-10-2018-4-25'}
      }, {
          attributes: {name: 'app-may-11-2018'}
      }, {
          attributes: {name: 'app-may-14-1-04'}
      }]);
  }
};

function initTestBed() {
  TestBed.configureTestingModule({
    providers: [
        AppLauncherDependencyCheckService,
        { provide: ContextService, useClass: mockContextService },
        { provide: DeploymentApiService, useValue: mockDeploymentApiService }
    ]
  });
}

let mockContext = <Context>{
  name: 'my-space-apr24-4-43',
  path: '/user/my-space-apr24-4-43',
  space: {
    id: 'c814a58b-6220-4670-80cf-a2196899a59d',
    attributes: {
      'created-at': '2018-04-24T11:15:59.164872Z',
      'description': '',
      'name': 'my-space-apr24-4-43',
      'updated-at': '2018-04-24T11:15:59.164872Z',
      'version': 0
    }
  }
};

class mockContextService {
  get current(): Observable<Context> { return Observable.of(mockContext); }
}

describe('Service: AppLauncherDependencyCheckService', () => {
  let service: AppLauncherDependencyCheckService;
  let dependencyCheck = {
    mavenArtifact: 'booster-mission-runtime',
    groupId: 'io.openshift.booster',
    projectName: '',
    projectVersion: '1.0.0',
    spacePath: '/c814a58b-6220-4670-80cf-a2196899a59d'
  } as DependencyCheck;

  beforeEach(() => {
    initTestBed();
    service = TestBed.get(AppLauncherDependencyCheckService);
  });

  it('Get project dependencies', (done: DoneFn) => {
    service.getDependencyCheck().subscribe((val) => {
      expect(val).toEqual(dependencyCheck);
      done();
    });
  });

});
