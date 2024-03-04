import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationReceivedComponent } from './notification-received.component';

describe('NotificationReceivedComponent', () => {
  let component: NotificationReceivedComponent;
  let fixture: ComponentFixture<NotificationReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationReceivedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
