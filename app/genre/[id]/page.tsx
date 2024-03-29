import AISuggestion from "@/components/AISuggestion";
import MoviesCarousel from "@/components/MoviesCarousel";
import { getDiscoverMovies } from '@/lib/getMovies';

type Props = {
    params: { id: string },
    searchParams: { genre: string }
}


async function GenrePage({ params: { id }, searchParams: { genre } }: Props) {
    const discoverMovies = await getDiscoverMovies(id)
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col mt-32 xl:mt-42 space-y-5 ">
                <h1 className="text-6xl font-bold px-10">Results for {genre} </h1>
                <AISuggestion term={genre} />
                <MoviesCarousel movies={discoverMovies || []} isVertical={true} title="Movies" />
            </div>
        </div>
    );
}

export default GenrePage;