import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { EditBookPage } from './edit-book.page';

describe('EditBookPage', () => {
  let component: EditBookPage;
  let fixture: ComponentFixture<EditBookPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
