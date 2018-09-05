/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentModule } from 'angular2-moment';
import { ModalModule } from 'ngx-modal';
import { RestangularModule } from 'ngx-restangular';
import { Fabric8CommonModule } from '../../../../common/common.module';
import { KubernetesComponentsModule } from '../../../components/components.module';
import { KubernetesStoreModule } from '../../../kubernetes.store.module';
import { BuildConfigDialogsModule } from '../../buildconfig/delete-dialog/buildconfig.dialogs.module';
import { BuildStageViewComponent } from '../build-stage-view/build-stage-view.component';
import { PipelinesFullHistoryToolbarComponent } from '../full-history-toolbar/full-history-toolbar.pipeline.component';
import { PipelinesFullHistoryComponent } from '../full-history/full-history.pipeline.component';
import { TestAppModule } from './../../../../app.test.module';
import { StageTimePipe } from './../build-stage-view/stage-time.pipe';
import { PipelinesFullHistoryPage } from './full-history-page.pipeline.component';

import { StackDetailsModule } from 'fabric8-stack-analysis-ui';
import { InputActionDialog } from '../input-action-dialog/input-action-dialog.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PipelinesFullHistoryPage', () => {
  let component: PipelinesFullHistoryPage;
  let fixture: ComponentFixture<PipelinesFullHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        Fabric8CommonModule,
        RouterTestingModule.withRoutes([]),
        RestangularModule.forRoot(),
        FormsModule,
        MomentModule,
        ModalModule,
        BuildConfigDialogsModule,
        StackDetailsModule
      ],
      declarations: [
        BuildStageViewComponent,
        InputActionDialog,
        PipelinesFullHistoryPage,
        PipelinesFullHistoryComponent,
        PipelinesFullHistoryToolbarComponent,
        StageTimePipe
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelinesFullHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
