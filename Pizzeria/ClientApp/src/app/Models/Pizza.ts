import { Ingrediente } from './Ingrediente';

export class Pizza {
    public id: number;
    public nombre: string;
    public costo: number;
    public image: string;
    public ingredientes: Ingrediente[];
}
