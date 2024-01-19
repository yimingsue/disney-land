import AIAzureSuggestion from "@/components/AIAzureSuggestion"
import MoviesCarousel from "@/components/MoviesCarousel"
import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies"
import { notFound } from "next/navigation"

type SearchProps = {
    params: {
        term: string
    }
}

async function SearchPage({ params: { term } }: SearchProps) {
    if (!term) notFound()

    const termString = decodeURI(term)
    console.log(termString)
    const searchedMovies = await getSearchedMovies(termString)
    const pupularMovies = await getPopularMovies()

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col mt-32 xl:mt-42 space-y-5 ">
                <h1 className="text-6xl font-bold px-10">Results for {termString} </h1>
                {/* <AISuggestion term={termString} /> */}
                <AIAzureSuggestion term={termString} />
                <MoviesCarousel movies={searchedMovies || []} isVertical={true} title="Movies" />
                <MoviesCarousel movies={pupularMovies || []} isVertical={false} title="You may also like" />
            </div>
        </div>
    )
}

export default SearchPage