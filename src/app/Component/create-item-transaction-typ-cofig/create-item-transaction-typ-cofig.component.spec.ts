import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemTransactionTypCofigComponent } from './create-item-transaction-typ-cofig.component';

describe('CreateItemTransactionTypCofigComponent', () => {
  let component: CreateItemTransactionTypCofigComponent;
  let fixture: ComponentFixture<CreateItemTransactionTypCofigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateItemTransactionTypCofigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateItemTransactionTypCofigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
