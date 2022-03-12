import { Result } from '../interfaces/appInterfaces';

export class Favorites {
    
    public name: string;
    public picture: string;
    public alias: string;
    public createdAt: Date;

    constructor(pokemon: Result) {
        this.name = pokemon.name;
        this.picture = pokemon.url;
        this.alias = pokemon.name;
        this.createdAt = new Date();
    }
}