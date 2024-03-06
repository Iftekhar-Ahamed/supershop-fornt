import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeConfigComponent } from './item-type-config.component';

describe('ItemTypeConfigComponent', () => {
  let component: ItemTypeConfigComponent;
  let fixture: ComponentFixture<ItemTypeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemTypeConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemTypeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
