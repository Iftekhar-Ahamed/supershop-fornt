import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemTransactionTypeComponent } from './create-item-transaction-type.component';

describe('CreateItemTransactionTypeComponent', () => {
  let component: CreateItemTransactionTypeComponent;
  let fixture: ComponentFixture<CreateItemTransactionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateItemTransactionTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateItemTransactionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
