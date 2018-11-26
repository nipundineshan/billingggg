import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNoticeComponent } from './footer-notice.component';

describe('FooterNoticeComponent', () => {
  let component: FooterNoticeComponent;
  let fixture: ComponentFixture<FooterNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
