import { Component, OnInit } from '@angular/core';
import { VillaService } from 'src/app/services/villa.service';

@Component({
  selector: 'app-villas',
  templateUrl: './villas.component.html',
  styleUrls: ['./villas.component.scss']
})
export class VillasComponent implements OnInit {

  AllVillas: [] = []

  constructor(private villaService: VillaService) { }

  ngOnInit(): void {
    this.villaService.getAllVillas().subscribe(r => {
      if (!r.isError) {
        this.AllVillas = r.result.data;
      }

    })
  }

}
