import { Observable } from "rxjs";

export interface ApiRequestStartPhoneAuth {
  username: string;
  password: string;
}

export interface ApiResponseStartPhoneAuth {
  login: boolean;
}

export interface ApiAuth {
  StartPhoneAuth(
    request: ApiRequestStartPhoneAuth
  ): Observable<ApiResponseStartPhoneAuth>;
}
