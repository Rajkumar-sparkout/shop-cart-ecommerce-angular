export interface Common {
}

export interface ApiResponseInterface {
    value(value: any): unknown
    data: any,
    message: string,
    status: boolean,
    status_code: number
  }

export interface User {
    name: string;
    email: string;
    role: string;
    password: string;
}

export interface Product {
    productName: string;
    category: string;
    description: string;
    price: number;
    offer: number;
    image: string;
}