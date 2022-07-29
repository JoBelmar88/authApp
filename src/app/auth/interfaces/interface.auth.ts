export interface AuthResponse {
    ok: boolean;
    uid?: string;
    nombre?: string;
    token?: string;
    msg?: string;
}

export interface Usuario {
    uid: string;
    nombre: string;
    email?: string;
    password?: string;
}
