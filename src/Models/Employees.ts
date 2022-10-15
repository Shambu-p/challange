export default interface Employees {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    gender: ("male"|"female"),
    password?: string
};