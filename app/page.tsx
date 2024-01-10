import MovieCarousel from "@/components/MovieCarousel"

export default function Home() {

  const upcomingMovies = await getUpcomingMovies()
  const popularMovies = await getPopularMovies()
  const topRatedMovies = await getTopRatedMovies()

  return (
    <main>
      {/* Carsousel Banner Wrapper */}
      {/* MovieCarousel  */}
      <MovieCarousel movies={[]} isVertical={false} />
    </main>
  )
}