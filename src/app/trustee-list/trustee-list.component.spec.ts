import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrusteeListComponent } from './trustee-list.component';

describe('TrusteeListComponent', () => {
  let component: TrusteeListComponent;
  let fixture: ComponentFixture<TrusteeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrusteeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrusteeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
