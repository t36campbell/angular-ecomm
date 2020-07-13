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
    {value: 4, viewValue: '4'},
    {value: 6, viewValue: '6'},
    {value: 8, viewValue: '8'},
    {value: 10, viewValue: '10'}
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
      .getVideosForChannel('UCfMmZSKgLjfpDkXzpffZGBw', 6)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((list) => {
        for (let element of list['items']) {
          this.videos.push(element);
        }
      });
    this.searchQuery = 'CaughtOnArlo';
    this.maxResults = 6;
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
