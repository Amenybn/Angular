import { Component, OnInit } from '@angular/core';
import { Annonce } from '../core/module/annonce';
import { AnnonceService } from '../service/annonce.service';
import { FileService } from '../service/file.service';
import { LoggerService } from '../service/logger.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {
  listfav: Annonce[] = [];
  listserviceannonce: Annonce[] = [];
  num!: number;
  rawJsonInput = '{"id":99,"title":"Test","price":100,"residenceid":1}';
  ssrfUrl = 'http://localhost:3000/annonces';
  testCard = '';
  testCvv = '';
  filePath = '../../../etc/passwd';
  codeInput = 'console.log(1)';

  listAnnonces: Annonce[] = [
    { id: 1, title: 'El fel', price: 25000, residenceid: 1 },
  ];

  constructor(
    private resservice: AnnonceService,
    private fileService: FileService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.resservice.getallAnnonce().subscribe((data) => {
      this.listserviceannonce = data;
    });
  }

  listefavoris(res: Annonce) {
    const index = this.listfav.findIndex((r) => r.id == res.id);
    if (index > -1) {
      this.listfav.splice(index, 1);
    } else {
      this.listfav.push(res);
    }
  }

  isfavoris(res: Annonce) {
    return this.listfav.some((r) => r.id == res.id);
  }

  shownumber() {
    this.num = this.resservice.getnumberofvalue(this.listAnnonces, 'title', 'El Arij');
  }

  deleterannonce(id: number | string) {
    this.resservice.deleteAnnonce(id).subscribe(() => this.ngOnInit());
  }

  importFromJson(): void {
    const parsed = this.resservice.deserializeUntrusted(this.rawJsonInput);
    this.listserviceannonce.push(parsed);
  }

  runDelayedAction(code: string): void {
    this.resservice.executeCallback(code);
  }

  downloadFile(name: string): void {
    const path = this.fileService.buildFilePath(name);
    this.fileService.fetchRemoteResource(path).subscribe();
  }

  logPayment(card: string, cvv: string): void {
    this.logger.logPaymentData(card, cvv);
  }

  fetchRemote(): void {
    this.resservice.fetchFromUrl(this.ssrfUrl).subscribe();
  }
}
