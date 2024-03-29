import { Category } from './category';
export interface UserInterface {
    id?: string;
    name: string;
    phone: string;
    address: string;
    type: string;
    ssn?: string;
    rating: number;
    urlPhoto: string;
    uuid: string;
    isAutorized: boolean;
    skills: Category[];
}