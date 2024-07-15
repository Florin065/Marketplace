export type UserForm = {
    nume: string,// persoana fizica
    prenume: string, // persoana fizica
    denumire_companie: string, // persoana juridica
    cui: string, // persoana juridica
    numar_inregistrare: string, // persoana juridica
    tara: { country: string}, // required
    judet: {name: string}, // required
    localitate: {name: string}, // required
    adresa: string, // required
    email: string, // required
    numar_telefon: string, // required
    parola: string, // required
    confirmare_parola: string, // required
    isPersoanaFizica: boolean,
    platitorTVA: boolean
}

export type UserProducts = {
    cart: [string],
    favorites: [string],
    orders: [string],
    history: [string],
    reviews: [{stars: number, review: string, product: string}],
}

export type UserData = {
    uid: string,
    name: string, // either name or companyName
    photo: string, // photoURL 
    email: string,
    country: string,
    county: string,
    city: string,
    address: string,
    phoneNumber: string,
    isPerson: boolean,
    cui: string,
    registrationNumber: string,
    platitorTVA: boolean,
}
