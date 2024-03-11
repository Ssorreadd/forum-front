type AuthUser = {
    locale: string,
    email: string,
    password: string
}
type RegistrationUser = {
    locale: string,
    username: string,
    email: string,
    password: string
}

export type {AuthUser, RegistrationUser}