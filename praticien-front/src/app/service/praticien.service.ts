import { Praticien } from './../components/model/praticien';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PraticienService {

  readonly apiUrl: string = "http://127.0.0.1:8081/api";

  private http = inject(HttpClient);
  praticiens = signal<Praticien[] | null>(null);

  public getPraticiens() {
    return this.http.get<Praticien[]>(`${this.apiUrl}/v1/praticiens`).pipe(
      tap(response => {
        this.praticiens.set(response);
      })
    );
  }

  getPraticienById(id: string) {
    return this.http.get<Praticien>(`${this.apiUrl}/v1/praticien/${id}`);
  }

  public ajouterPraticien(data: Praticien) {
    return this.http.post<{message:string}>(`${this.apiUrl}/v1/creer-praticien`, data)
  }

  public supprimerPraticien(id:string) {
    return this.http.delete<{message:string}>(`${this.apiUrl}/v1/supprimer-praticien/${id}`)
  }

  updatePraticien(id: string, praticien: Praticien): Observable<Praticien> {
    return this.http.put<Praticien>(`${this.apiUrl}/v1/modifier-praticien/${id}`, praticien);
  }

}
