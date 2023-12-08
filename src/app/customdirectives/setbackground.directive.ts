import { Directive,ElementRef ,OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSetbackground]'
})
export class SetbackgroundDirective implements OnInit{

  constructor(private element:ElementRef,private renderer:Renderer2) { 
 
  }


  ngOnInit(): void {
    // this.element.nativeElement.style.background='red'


    this.renderer.setStyle(this.element.nativeElement,'background','red'
    )
  }


}
