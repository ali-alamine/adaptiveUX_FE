import { Component, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridHelper } from '../gridHelper.service';
import { FormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { DynamicGridService } from 'src/app/core/services/grid/dynamic-grid.service';
@Component({
  selector: 'pu-dynamic-grid-create-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-grid-create-form.component.html',
  styleUrls: ['./dynamic-grid-create-form.component.scss']
})
export class DynamicGridCreateFormComponent {
  gridFormFields: any = _.cloneDeep(this.gridHelper.gridCols$.getValue());

  constructor(@SkipSelf() public gridHelper: GridHelper, @SkipSelf() public gridService: DynamicGridService) {
    this.gridFormFields.sort((a: any, b: any) => a.form_order - b.form_order);
  }

  submitForm() {
    let formData: FormData = new FormData();
    let values: Array<any> = this.gridFormFields = this.gridFormFields.filter((field: any) => field.is_in_form === 1);

    for (let i = 0; i < values.length; i++) {
      let key = (values[i].field_key).toString();
      let value = values[i].filled_value;
      formData.append(key, value);
    }
    this.gridHelper.newRecordData$.next(formData)
  }

}
