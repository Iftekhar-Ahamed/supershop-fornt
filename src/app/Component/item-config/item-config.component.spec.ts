import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemConfigComponent } from './item-config.component';

describe('ItemConfigComponent', () => {
  let component: ItemConfigComponent;
  let fixture: ComponentFixture<ItemConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
