import { NgModule } from '@angular/core';

import { DeploymentApiService } from '../../space/create/deployments/services/deployment-api.service';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

import { FeatureFlagModule } from 'ngx-feature-flag';

@NgModule({
  imports: [
    SettingsRoutingModule,
    FeatureFlagModule
  ],
  declarations: [ SettingsComponent ],
  providers: [ DeploymentApiService ]
})
export class SettingsModule {}
