import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
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
    private _spinner: NgxSpinnerService,
    private _youTubeService: YoutubeService
  ) {}

  ngOnInit() {
    this._spinner.show();
    setTimeout(() => {
      this._spinner.hide();
    }, 1500);
    this.videos = [];
    this._youTubeService
      .getVideosForChannel('UCfMmZSKgLjfpDkXzpffZGBw', 6)
      .pipe()
      .subscribe((list) => {
        for (let element of list['items']) {
          this.videos.push(element);
        }
      });
    this.searchQuery = 'CaughtOnArlo';
    this.maxResults = 6;
  }

  searchVideos() {
    this._spinner.show();
    setTimeout(() => {
      this._spinner.hide();
    }, 1500);
    this.videos = [];
    this._youTubeService
      .searchVideosForChannel('UCfMmZSKgLjfpDkXzpffZGBw', this.maxResults, this.searchQuery)
      .pipe()
      .subscribe((list) => {
        for (let element of list['items']) {
          this.videos.push(element);
        }
      });
  }
}
