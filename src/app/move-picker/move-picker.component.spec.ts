import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovePickerComponent } from './move-picker.component';

describe('MovePickerComponent', () => {
  let component: MovePickerComponent;
  let fixture: ComponentFixture<MovePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
