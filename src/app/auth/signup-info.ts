export class SignUpInfo {
    name: string;
    username: string;
    email: string;
    phone: string;
    role: number;
    password: string;


    constructor(name: string, username: string, email: string, phone: string, role: number, password: string) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.password = password;
    }
}
