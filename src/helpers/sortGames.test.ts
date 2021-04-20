
import {sortGamesForWishlist} from './sortGames';

describe("sortGamesForWishlist", () => {
    let unsortedGames = [
        {
           "title":"aa",
           "release_date":null,
           "status":"Wishlist"
        },
        {
           "title":"bb",
           "release_date":"2017-01-01T00:00:00.000Z",
           "status":"Finished"
        },
        {
           "title":"cc",
           "release_date":"2018-01-01T00:00:00.000Z",
           "status":"Wishlist"
        },
        {
            "title":"dd",
            "release_date":"2019-01-01T00:00:00.000Z",
            "status":"Wishlist"
         },
         {
            "title":"ee",
            "release_date":"2020-01-01T00:00:00.000Z",
            "status":"Maybe"
         },
    ]

    const expectedSortedGames = [
        {
           "release_date":"2018-01-01T00:00:00.000Z",
           "status":"Wishlist",
           "title":"cc"
        },
        {
           "release_date":"2019-01-01T00:00:00.000Z",
           "status":"Wishlist",
           "title":"dd"
        },
        {
           "release_date":"2020-01-01T00:00:00.000Z",
           "status":"Maybe",
           "title":"ee"
        },
        {
           "release_date":null,
           "status":"Wishlist",
           "title":"aa"
        }
     ]

    it("should filter games by wish status and sort by date oldest first and null last", async () => {
        const sortedGames = sortGamesForWishlist(unsortedGames);
        expect(sortedGames).toEqual(expectedSortedGames)
    });
})