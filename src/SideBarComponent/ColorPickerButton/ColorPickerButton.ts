import L from 'leaflet';
import './ColorPickerButton.scss';
import { ColorPicker } from '../../model/ColorPicker';

class ColorPickerButton implements ColorPicker {
  public id: string;
  public element: HTMLInputElement;

  constructor(id: string) {
    this.id = id;
    this.element = L.DomUtil.create('input', 'color-picker') as HTMLInputElement;
    this.element.type = 'color';
    this.element.id = id;
    this.element.value = '#3388ff';
  }

  public getElement(): HTMLInputElement {
    return this.element;
  }
}

export default ColorPickerButton;
