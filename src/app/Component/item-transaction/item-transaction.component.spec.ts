import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTransactionComponent } from './item-transaction.component';

describe('ItemTransactionComponent', () => {
  let component: ItemTransactionComponent;
  let fixture: ComponentFixture<ItemTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemTransactionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ItemTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
