export interface Signup {
    first_name : string
    last_name : string
    email : string
    password : string
    image? : string
}

export interface Login {
    email : string
    password : string
}