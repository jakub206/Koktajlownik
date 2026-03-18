import type { Cocktail } from "../types/cocktail";

export const cocktailApi = {
  fetchAllCocktails: async (): Promise<Cocktail[]> => {
    const url = "https://cocktails.solvro.pl/api/v1/cocktails?perPage=200&ingredients=true";
    
    const res = await fetch(url);
    const json = await res.json();
    
    return json.data;
  },
};