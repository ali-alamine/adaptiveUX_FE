import { Component } from '@angular/core';
import { MetadataService } from 'src/app/core/services/singleton/metadata.service';
@Component({
  selector: 'pu-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  // providers:[MetadataService]
})
export class LayoutComponent {
  constructor(private metadata: MetadataService){
    
  }
}
