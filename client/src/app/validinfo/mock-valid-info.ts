import { ValidInformation } from './validinfo';


export const validInfo: ValidInformation[] = [
    {
        id:1,
        firstname_req: "This fiels is required",
        firstname_length:"Minimum value 5, max value 22",
        lastname_req:"This fiels is required",
        lastname_length:"Minimum value 5, max value 22",
        email_req:"This fiels is required",
        email_valid:"must be valid example: example@example.com",
        email_length:"Minimum value 5, max value 22",
        password_req:"This fiels is required",
        password_length:"Minimum value 5, max value 22"
    }
]