import { Directive, ElementRef, inject, input } from '@angular/core';

// Decorator
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });
  private hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective is active!');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave the app?');

    if (wantsToLeave) {
      const address = this.hostElement.nativeElement.href;
      this.hostElement.nativeElement.href =
        address + '?from=' + this.queryParam();
      return;
    }

    event.preventDefault();
  }
}
