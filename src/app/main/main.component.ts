import { Component, OnInit} from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('progressBar') progressBar: ElementRef<HTMLElement>;
  isPlaying: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  onPlaying(video: HTMLVideoElement): void {
    const bar = this.progressBar.nativeElement;
    const progress = video.currentTime / video.duration * 100;

    this.isPlaying = !video.paused;
    bar.style.width = `${progress}%`;
  }

  playPauseVideo(): void {
    const video = this.video.nativeElement;
    this.isPlaying = !this.isPlaying;
    
    if (!video.paused) {
      video.pause();
    } else {
      video.play();
    }
  }
}
