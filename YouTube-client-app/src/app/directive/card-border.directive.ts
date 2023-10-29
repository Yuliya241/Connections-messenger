import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { BorderColors } from '../enums/enums';

@Directive({
  selector: '[appCardBorder]',
})

export class CardBorderDirective implements OnInit {
  @Input('appCardBorder') publishedAt!: string;

  constructor(private renderer: Renderer2, private element: ElementRef) { }

  ngOnInit(): void {
    const oneDayrInMilliseconds = 24 * 60 * 60 * 1000;
    const days = Math.floor(new Date().getTime() - new Date(this.publishedAt).getTime())
      / oneDayrInMilliseconds;
    if (days < 7) {
      this.renderer.addClass(this.element.nativeElement, BorderColors.BLUE);
    } else if (days >= 7 && days < 31) {
      this.renderer.addClass(this.element.nativeElement, BorderColors.GREEN);
    } else if (days >= 31 && days <= 180) {
      this.renderer.addClass(this.element.nativeElement, BorderColors.YELLOW);
    } else if (days >= 180) {
      this.renderer.addClass(this.element.nativeElement, BorderColors.RED);
    }
  }
}
