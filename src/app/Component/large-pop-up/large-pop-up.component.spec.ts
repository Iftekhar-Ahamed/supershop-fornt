import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargePopUpComponent } from './large-pop-up.component';

describe('LargePopUpComponent', () => {
  let component: LargePopUpComponent;
  let fixture: ComponentFixture<LargePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LargePopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LargePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
