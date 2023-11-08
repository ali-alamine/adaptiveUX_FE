import { Component, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridHelper } from '../gridHelper.service';
import { FormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { DynamicGridService } from 'src/app/core/services/grid/dynamic-grid.service';
import { ATTR_TYPE, setAttributePlaceholder, getAttrFetchValue, getAttrFetchableContentIDsValues } from 'src/app/models/shared';

@Component({
  selector: 'pu-dynamic-grid-create-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-grid-create-form.component.html',
  styleUrls: ['./dynamic-grid-create-form.component.scss']
})
export class DynamicGridCreateFormComponent {
  formAttributes: any = _.cloneDeep(this.gridHelper.attributes$.getValue()).filter((attr: any) => attr.in_form === 1);
  public readonly ATTR_TYPE = ATTR_TYPE;
  setAttributePlaceholder: Function = setAttributePlaceholder;
  getFetchValue: Function = getAttrFetchValue;
  getAttrFetchableContentIDsValues: Function = getAttrFetchableContentIDsValues;
  selectedValue: any = this.formAttributes.filter((attr: any) => attr.attr_type === 'select')[0]?.attr_type_placeholder;

  constructor(@SkipSelf() public gridHelper: GridHelper, @SkipSelf() public gridService: DynamicGridService) {
    this.formAttributes.sort((a: any, b: any) => a.attr_form_order - b.attr_form_order);
  }

  setEntityIDwithAttrID(entity_id: any, attr: any) {
    let contentIDs: any = attr?.attr_fetch_value.fetch_criteria?.content_attr_ids;
    return JSON.stringify({ 'entity_id': entity_id, 'attr_ids': contentIDs });
  }

  getSelectPlaceHolder(attr: any) {
    // this.selectedValue = 'test 2' //attr?.attr_type_placeholder;
    console.log(this.formAttributes, "formAttributes")
    this.selectedValue = this.formAttributes[0].attr_type_placeholder;
  }

  getSelectedValue(attr: any) {
    console.log(this.selectedValue, "getSelectedValue");
    attr.attr_entered_value = this.selectedValue;

  }

  submitForm() {
    let formData: any = new FormData();
    let values: Array<any> = this.formAttributes.filter((field: any) => field.in_form === 1);
    let userValues: any = [];
    for (let i = 0; i < values.length; i++) {
      let value = { 'attr_id': (values[i].attr_id).toString(), 'attr_key': values[i].attr_key, 'entered_value': values[i].attr_entered_value };
      formData.append('userValues[]', JSON.stringify(value));
    }
    formData.append('contentID', this.gridHelper.contendID$.getValue());
    console.log('userValues', userValues);
    this.gridHelper.newRecordData$.next(formData);
  }
}
