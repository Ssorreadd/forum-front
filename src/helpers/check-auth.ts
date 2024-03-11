export function checkAuth(): boolean{
    return localStorage.getItem('authToken') !== null
}