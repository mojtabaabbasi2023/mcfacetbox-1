export interface GateProperties {
    id: number
    gateTitle: string
    contact: string
    nameFamily: string
    createDate: string
    expireDate: string
    active: boolean
    email: string
    userType: string
    usersavatar: string
    description: string
}

export class GateModel implements GateProperties {
    id: number = 0
    gateTitle: string = ''
    contact: string = ''
    nameFamily: string = ''
    createDate: string = ''
    expireDate: string = ''
    active: boolean = false
    email: string = ''
    userType: string = ''
    usersavatar: string = ''
    description: string = ''

}
