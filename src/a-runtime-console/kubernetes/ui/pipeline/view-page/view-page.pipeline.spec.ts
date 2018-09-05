/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentModule } from 'angular2-moment';
import { ModalModule } from 'ngx-modal';
import { RestangularModule } from 'ngx-restangular';
import { Fabric8CommonModule } from '../../../../common/common.module';
import { KubernetesStoreModule } from '../../../kubernetes.store.module';
import { PipelineViewToolbarComponent } from '../view-toolbar/view-toolbar.pipeline.component';
import { PipelineViewWrapperComponent } from '../view-wrapper/view-wrapper.pipeline.component';
import { PipelineViewComponent } from '../view/view.pipeline.component';
import { TestAppModule } from './../../../../app.test.module';
import { StageTimePipe } from './../build-stage-view/stage-time.pipe';
import { PipelineViewPage } from './view-page.pipeline.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PipelineViewPage', () => {
  let pipeline: PipelineViewPage;
  let fixture: ComponentFixture<PipelineViewPage>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          MomentModule
        ],
        declarations: [
          PipelineViewPage,
          PipelineViewWrapperComponent,
          PipelineViewToolbarComponent,
          PipelineViewComponent,
          StageTimePipe
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineViewPage);
    pipeline = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(pipeline).toBeTruthy(); });
});
