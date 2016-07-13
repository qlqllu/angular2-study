import { Component, Input, OnInit } from '@angular/core';
import {Hero} from "./hero";
import { HeroService } from './hero.service';
import { Router } from '@angular/router';


@Component({
  selector: 'my-heroes',
  template:`
    <div><h3>title:</h3> {{title}}</div>
    <div>app name: {{appName}}</div>

    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes" (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <div *ngIf="selectedHero">
      <h2>
        {{selectedHero.name | uppercase}} is my hero
      </h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>

  `
})
export class HeroesComponent implements OnInit{
  title = 'Tour of Heroes';
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  // heroes = [];

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private router: Router) { }

  selectedHero: Hero = null;

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  gotoDetail(){
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);

    // this.heroService.getHeroes().then(function(heroes){
    //   this.heroes = heroes;
    // });
  }

  ngOnInit() {
    this.getHeroes();
  }


  @Input()
  appName: String;

}
