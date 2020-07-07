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
          { title: 'Card 1', 
            cols: 1, 
            rows: 1,
            img: 'https://picsum.photos/400/400/?image=59' 
          },
          { title: 'Card 2', 
            cols: 1, 
            rows: 1,
            img: 'https://picsum.photos/400/400/?image=3' 
          },
          { title: 'Card 3', 
            cols: 1, 
            rows: 1,
            img: 'https://picsum.photos/400/400/?image=18' 
          },
          { title: 'Card 4', 
            cols: 1, 
            rows: 1,
            img: 'https://picsum.photos/400/400/?image=36' 
          },
          { title: 'Card 5', 
            cols: 1, 
            rows: 1,
            img: 'https://picsum.photos/400/400/?image=72' 
          },
          { title: 'Card 6', 
            cols: 1, 
            rows: 1,
            img: 'https://picsum.photos/400/400/?image=144' 
          },
        ];
      }

      return [
        { title: 'Card 1', 
            cols: 1, 
            rows: 2,
            img: 'https://picsum.photos/400/400/?image=59' 
          },
          { title: 'Card 2', 
            cols: 1, 
            rows: 2,
            img: 'https://picsum.photos/400/400/?image=3' 
          },
          { title: 'Card 3', 
            cols: 1, 
            rows: 2,
            img: 'https://picsum.photos/400/400/?image=18' 
          },
          { title: 'Card 4', 
            cols: 1, 
            rows: 2,
            img: 'https://picsum.photos/400/400/?image=36' 
          },
          { title: 'Card 5', 
            cols: 1, 
            rows: 2,
            img: 'https://picsum.photos/400/400/?image=72' 
          },
          { title: 'Card 6', 
            cols: 1, 
            rows: 2,
            img: 'https://picsum.photos/400/400/?image=144' 
          },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
