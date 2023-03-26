export interface IHttpResponse {
  success: boolean;
  payload: {
    status: number;
    message: string;
    result?: any | null;
    details?: any | null;
  };
}

export interface IPerson {
  id: number;
  name: string;
  professionId: number;
  profession?:{
    id: number;
    name: string;
  }
}
