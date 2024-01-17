import { SearchResults } from "@/typings";

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGE5NTZjMGU3NDI1NmY2YjAwNzQwZDQ3YzI1Y2JkNyIsInN1YiI6IjY1OWUxNWZlOGU4ZDMwMDIwMmRiYjZjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ylkXQGgMEJMhN9BFN5YIzwMM4gBhhPtVar_5CrW2w60'
async function fetchFromTMDB(url: URL, cacheTime?: number) {
    url.searchParams.set("include_adult", "false");
    url.searchParams.set("include_video", "false");
    url.searchParams.set("sort_by", "popularity.desc");
    url.searchParams.set("language", "en-US");
    url.searchParams.set("page", "1");

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        next: {
            revalidate: cacheTime || 60 * 60 * 24,
        },
    };

    const response = await fetch(url.toString(), options);
    const data = (await response.json()) as SearchResults;
    return data;
}

export async function getUpcomingMovies(id?: number) {
    const url = new URL('https://api.themoviedb.org/3/movie/upcoming')
    const res = await fetchFromTMDB(url)
    return res.results
}
export async function getPopularMovies() {
    const url = new URL("https://api.themoviedb.org/3/movie/popular")
    const res = await fetchFromTMDB(url)
    return res.results
}
export async function getTopRatedMovies() {
    const url = new URL('https://api.themoviedb.org/3/movie/top_rated')
    const res = await fetchFromTMDB(url)
    return res.results
}
export async function getDiscoverMovies(id?: string, keywords?: string) {
    const url = new URL('https://api.themoviedb.org/3/discover/movie')
    keywords && url.searchParams.set('with_keywords', keywords)
    id && url.searchParams.set('with_genres', id)
    console.log("url: ", url)
    const res = await fetchFromTMDB(url)
    return res.results
}

export async function getSearchedMovies(term: string) {
    const url = new URL("https://api.themoviedb.org/3/search/movie");
    url.searchParams.set("query", term)
    url.searchParams.set("include_adult", "false")
    url.searchParams.set("language", "en-US")
    url.searchParams.set("page", "1")
    const res = await fetchFromTMDB(url)
    return res.results
}