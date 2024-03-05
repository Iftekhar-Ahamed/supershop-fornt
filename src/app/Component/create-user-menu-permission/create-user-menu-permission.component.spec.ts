import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserMenuPermissionComponent } from './create-user-menu-permission.component';

describe('CreateUserMenuPermissionComponent', () => {
  let component: CreateUserMenuPermissionComponent;
  let fixture: ComponentFixture<CreateUserMenuPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserMenuPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUserMenuPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
