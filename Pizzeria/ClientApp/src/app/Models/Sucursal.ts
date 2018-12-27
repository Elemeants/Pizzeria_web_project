import { Direccion } from './Direccion';
import { Pizza } from './Pizza';

export class Sucursal {
    public id: number;
    public nombre: string;
    public direccion: Direccion;
    public telefono: string;
    public pizzas: Pizza[];
}
