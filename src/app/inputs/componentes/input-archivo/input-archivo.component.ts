import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input-archivo',
  templateUrl: './input-archivo.component.html',
  styleUrls: ['./input-archivo.component.css']
})
export class InputArchivoComponent implements OnInit, ControlValueAccessor{
  @Input('formControlName') nombreControl!: string
  files:File[] = []
  disabled:boolean = false
  constructor() { }

  onChange = (files:File[])=>{}

  onTouched = ()=>{}

  writeValue(files: File[]): void {
    this.files = files
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  ngOnInit(): void {
  }

}
