async function fetchFromTMDB(url: URL, cacheTime: number) {

    const options: RequestInit = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY} `
        },
        next: { revalidate: cacheTime || 60 * 60 * 24 } //24 hours default for cache data
    };
    const res = await fetch(url.toString(), options)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data

}