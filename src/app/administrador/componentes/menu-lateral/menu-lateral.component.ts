import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  public readonly llaveRolesLocalStorage = 'rol'
  public roles: any;
  isCollapsed = false;
  desplegado = true
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem(this.llaveRolesLocalStorage) !== null) {
      this.roles = JSON.parse(localStorage.getItem(this.llaveRolesLocalStorage)!)
    }
  }

  public abrir():void{
    this.desplegado = true
  }

  public cerrar():void{
    this.desplegado = false
  }

}
