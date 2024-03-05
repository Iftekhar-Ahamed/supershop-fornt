import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPermissionConfigComponent } from './menu-permission-config.component';

describe('MenuPermissionConfigComponent', () => {
  let component: MenuPermissionConfigComponent;
  let fixture: ComponentFixture<MenuPermissionConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuPermissionConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuPermissionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
