import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemTypeComponent } from './create-item-type.component';

describe('CreateItemTypeComponent', () => {
  let component: CreateItemTypeComponent;
  let fixture: ComponentFixture<CreateItemTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateItemTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateItemTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
