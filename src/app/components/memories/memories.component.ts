import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.scss'],
})
export class MemoriesComponent {
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          {
            title: 'Bob',
            cols: 1,
            rows: 1,
            img: 'https://picsum.photos/400/400/?image=59',
          },
          {
            title: 'Linda',
            cols: 1,
            rows: 1,
            img: 'https://picsum.photos/400/400/?image=3',
          },
          {
            title: 'Gene',
            cols: 1,
            rows: 1,
            img: 'https://picsum.photos/400/400/?image=18',
          },
          {
            title: 'Louise',
            cols: 1,
            rows: 1,
            img: 'https://picsum.photos/400/400/?image=36',
          },
          {
            title: 'Teddy',
            cols: 1,
            rows: 1,
            img: 'https://picsum.photos/400/400/?image=72',
          },
          {
            title: 'Tina',
            cols: 1,
            rows: 1,
            img: 'https://picsum.photos/400/400/?image=144',
          },
        ];
      }

      return [
        {
          title: 'Bob',
          cols: 1,
          rows: 2,
          img: 'https://picsum.photos/400/400/?image=59',
        },
        {
          title: 'Linda',
          cols: 1,
          rows: 2,
          img: 'https://picsum.photos/400/400/?image=3',
        },
        {
          title: 'Gene',
          cols: 1,
          rows: 2,
          img: 'https://picsum.photos/400/400/?image=18',
        },
        {
          title: 'Louise',
          cols: 1,
          rows: 2,
          img: 'https://picsum.photos/400/400/?image=36',
        },
        {
          title: 'Teddy',
          cols: 1,
          rows: 2,
          img: 'https://picsum.photos/400/400/?image=72',
        },
        {
          title: 'Tina',
          cols: 1,
          rows: 2,
          img: 'https://picsum.photos/400/400/?image=144',
        },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
