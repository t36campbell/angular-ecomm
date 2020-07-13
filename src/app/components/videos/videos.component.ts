import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { YoutubeService } from '../../services/youtube.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  videos: any[];
  maxResults: Number;
  searchQuery: String;
  options: any[] = [
    {value: 6, viewValue: '6'},
    {value: 12, viewValue: '12'},
    {value: 18, viewValue: '18'},
    {value: 24, viewValue: '24'},
    {value: 30, viewValue: '30'},
    {value: 36, viewValue: '36'}
  ];
  constructor(
    private spinner: NgxSpinnerService,
    private youTubeService: YoutubeService
  ) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.videos = [];
    this.youTubeService
      .getVideosForChannel('UCfMmZSKgLjfpDkXzpffZGBw', 12)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((list) => {
        for (let element of list['items']) {
          this.videos.push(element);
        }
      });
    this.searchQuery = 'CaughtOnArlo';
    this.maxResults = 18;
  }

  searchVideos() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.videos = [];
    this.youTubeService
      .searchVideosForChannel('UCfMmZSKgLjfpDkXzpffZGBw', this.maxResults, this.searchQuery)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((list) => {
        for (let element of list['items']) {
          this.videos.push(element);
        }
      });
  }
}
