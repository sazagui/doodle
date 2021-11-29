import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Poll, PollChoice, User, ChoiceUser, PollCommentElement, EventDTOAndSelectedChoice } from './model/model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  baseUrl: string = environment.backend.baseURL;

  constructor(private http: HttpClient) { }

  public createPoll(p: Poll): Observable<Poll> {
    console.log('create poll');
    return this.http.post<Poll>(`${this.baseUrl}` + '/api/polls', p);
  }


  public updtatePoll(p: Poll): Observable<Poll> {
    return this.http.put<Poll>(`${this.baseUrl}` + '/api/poll/update1', p);
  }


  public getPollBySlugId(slugId: string): Observable<Poll> {
    return this.http.get<Poll>(`${this.baseUrl}` + '/api/poll/slug/' + slugId);
  }

  public getComentsBySlugId(slugId: string): Observable<PollCommentElement[]> {
    return this.http.get<PollCommentElement[]>(`${this.baseUrl}` + '/api/polls/' + slugId + '/comments');
  }

  public getPollBySlugAdminId(slugId: string): Observable<Poll> {
    return this.http.get<Poll>(`${this.baseUrl}` + '/api/poll/aslug/' + slugId);

  }

  public updateChoice4user(cu: ChoiceUser): Observable<User> {

    return this.http.post<User>(`${this.baseUrl}` + '/api/poll/choiceuser/', cu);
  }

  public addComment4Poll(slug: string, comment: PollCommentElement): Observable<PollCommentElement> {

    return this.http.post<PollCommentElement>(`${this.baseUrl}` + '/api/poll/comment/' + slug, comment);
  }

  selectEvent(choiceid: number): Observable<void> {
    return this.http.post<void>('http://52.47.158.232:8080/api/poll/selectedchoice/' + choiceid, null);

  }

  getICS(slug: string, ics: string): Observable<EventDTOAndSelectedChoice> {
    return this.http.get<EventDTOAndSelectedChoice>('http://52.47.158.232:8080/api/ics/polls/' + slug + '/' + btoa(ics));
  }


}
