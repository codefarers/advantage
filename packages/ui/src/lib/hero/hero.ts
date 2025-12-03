import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-hero',
  imports: [CommonModule],
  template: `
    <div [ngStyle]="containerStyle">
      <h1 [ngStyle]="titleStyle">{{ title() }}</h1>

      <p [ngStyle]="subtitleStyle">{{ subtitle() }}</p>
      <button (click)="handleCtaClick()" [ngStyle]="buttonStyle">
        {{ cta() }}
      </button>
    </div>
  `,
})
export class Hero {
  title = input<string>();
  subtitle = input<string>();
  cta = input<string>();
  ctaClick = output();

  containerStyle = {
    backgroundColor: '#1a1a2e',
    color: 'white',
    padding: '100px 20px',
    textAlign: 'center',
  };

  titleStyle = {
    fontSize: '48px',
    marginBottom: '16px',
  };

  subtitleStyle = {
    fontSize: '20px',
    marginBottom: '32px',
  };

  buttonStyle = {
    backgroundColor: '#0066ff',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '18px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  handleCtaClick() {
    this.ctaClick.emit();
  }
}
