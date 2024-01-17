import CarsouselBannerWrapper from "@/components/CarouselBannerWrapper"
import MoviesCarousel from "@/components/MoviesCarousel"
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/lib/getMovies"

export default async function Home() {

  const upcomingMovies = await getUpcomingMovies()
  const popularMovies = await getPopularMovies()
  const topRatedMovies = await getTopRatedMovies()

  return (
    <main>
      <CarsouselBannerWrapper />


      {/* MovieCarousel  */}
      <div className="flex flex-col space-y-2 xl:-mt-48">
        <MoviesCarousel movies={upcomingMovies || []} isVertical={false} title="Upcoming" />
        <MoviesCarousel movies={popularMovies || []} isVertical={false} title="Popular" />
        <MoviesCarousel movies={topRatedMovies || []} isVertical={false} title="Top Rated" />
      </div>
    </main>
  )
}