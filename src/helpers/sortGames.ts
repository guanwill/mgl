import { GameStatus } from '../model/game/game';

export const sortGamesForWishlist = games => {
    const gamesWishlistWithNullReleaseDate = games.filter(
        g => g.status === GameStatus.WISHLIST && g.release_date === null
    );
    const gamesWishlistWithReleaseDate = games.filter(g => g.status === GameStatus.WISHLIST && g.release_date !== null);
    const gamesMaybeWithNullReleaseDate = games.filter(g => g.status === GameStatus.MAYBE && g.release_date === null);
    const gamesMaybeWithReleaseDate = games.filter(g => g.status === GameStatus.MAYBE && g.release_date !== null);

    const gamesWishListAndMaybeWithReleaseDate = [...gamesWishlistWithReleaseDate, ...gamesMaybeWithReleaseDate].sort(
        (a, b) => {
            return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
        }
    );

    return [
        ...gamesWishListAndMaybeWithReleaseDate,
        ...gamesWishlistWithNullReleaseDate,
        ...gamesMaybeWithNullReleaseDate
    ];
};
