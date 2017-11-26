import { Component, OnInit } from '@angular/core';
import { ItemService } from './../../services/item.service'
import { Item } from './../../models/item'

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems()
  }

  addItem(name): void {
    this.itemService.addItem(name).subscribe(
      item => {
        this.items.push(item)
        console.log("item in items.component: ", item)
      }
    )
  }

  getItems(): void {
    this.itemService.getItems().subscribe(
      data => this.items = data
    )
  }
}
