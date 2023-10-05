export interface SignUp {
    name: string,
    email: string,
    password: string
}

export interface LogIn {
    email: string,
    password: string
}

export interface product {
    name: string,
    price: number,
    category: string,
    color: string,
    image: string,
    description: string,
    id: number
}