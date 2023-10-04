import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-loader-image',
  templateUrl: './loader-image.component.html'
})
export class LoaderImageComponent implements OnInit {

  @Input()
  public url!: string

  @Input()
  public alt: string = '';

  hasLoaded: boolean = false;

  constructor() { }

  ngOnInit() {
    if ( !this.url ) throw new Error('property URL is required');
  }

  onLoad(): void {
    this.hasLoaded = true;
  }

}
