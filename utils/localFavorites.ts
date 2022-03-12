const toogleFavorite = (id: number) => {
    if ( typeof window === 'undefined' ) return;
    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );
    if (favorites.includes(id)) {
        favorites = favorites.filter( pokeId => pokeId !== id );
    } else {
        favorites.push( id );
    }
    localStorage.setItem('favorites', JSON.stringify( favorites ) );
}

const inFavorites = (id: number): boolean => {
    if ( typeof window === 'undefined' ) return false;
    const favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );
    return favorites.includes( id );
}

const pokemons = (): number[] => {
    // return [];
    if ( typeof window === 'undefined' ) return [];
    return JSON.parse( localStorage.getItem('favorites') || '[]');
}

export default {
    toogleFavorite,
    inFavorites,
    pokemons
}