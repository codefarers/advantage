import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BufferInput } from './bufferInput';

describe('BufferInput', () => {
  let component: BufferInput;
  let fixture: ComponentFixture<BufferInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BufferInput],
    }).compileComponents();

    fixture = TestBed.createComponent(BufferInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
