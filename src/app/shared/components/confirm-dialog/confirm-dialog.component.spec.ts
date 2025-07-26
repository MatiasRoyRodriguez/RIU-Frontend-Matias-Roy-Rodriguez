import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-host',
  standalone: true,
  template: `
    <app-confirm-dialog />
  `,
  imports: [ConfirmDialogComponent]
})
class HostComponent {}

describe('ConfirmDialogComponent', () => {
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let component: ConfirmDialogComponent;
  let dialogRefMock: { close: jest.Mock };

  beforeEach(async () => {
    dialogRefMock = { close: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [
        ConfirmDialogComponent, // Standalone
        MatButtonModule,
        MatDialogModule,
        CommonModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Delete Hero',
            message: 'Are you sure you want to delete this hero?'
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dialog', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close(true) when confirm is clicked', () => {
    const confirmButton = fixture.debugElement.queryAll(By.css('button'))[1];
    confirmButton.triggerEventHandler('click');
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('should call dialogRef.close(false) when cancel is clicked', () => {
    const cancelButton = fixture.debugElement.queryAll(By.css('button'))[0];
    cancelButton.triggerEventHandler('click');
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });
});
