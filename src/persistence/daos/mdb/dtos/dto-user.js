export class DtoUser {
    constructor(user){
        this.name = user.firstname
        this.surname = user.lastname
        this.yearsold = user.age
        this.mail = user.email
        this.type = user.role
    }
}