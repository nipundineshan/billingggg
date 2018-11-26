import { Injectable } from '@angular/core';
import { Config } from '../types/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configFileName = 'config/config.json';

  config : Config;
  pendingPromise;

  constructor() { }

  // getConfig() : Promise<Config>{
  //   return new Promise((resolve, reject) => {
  //     if (this.config) {
  //       resolve(this.config);
  //     } else {
  //       this.pendingPromise = resolve;
  //     }

  //   });
  // }

  getConfig() : Observable<Config>{
    return  new Observable((observer) => {
      if(this.config){
        observer.next(this.config);
      }else{
      try {
            
        window.fs.readFile(this.configFileName, (err, data) => {
          console.log('in read fileeeeeee');
          console.log(err, data);
          if (err) {
            throw err
          };
          console.log('data >>>>> ' + data);
          this.config = JSON.parse(data)
          if (this.pendingPromise) {
            this.pendingPromise(this.config);
          }
          observer.next(this.config);
        });
      } catch (err) {
        console.log(err);
      }
    }
    });
  }

  // loadConfigurations1(): Promise<Config> {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       window.fs.readFile(this.configFileName, (err, data) => {
  //         console.log('in read fileeeeeee');
  //         console.log(err, data);
  //         if (err) {
  //           throw err
  //         };
  //         console.log('data >>>>> ' + data);
  //         this.config = JSON.parse(data)
  //         if (this.pendingPromise) {
  //           this.pendingPromise(this.config);
  //         }
  //         resolve(this.config);
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // }

}
