import { Movie } from "@/typings";

type Props = {
    title?: string;
    movies: Movie[];
    isVertical: false;
}
const MovieCarousel = ({ title, movies, isVertical }: Props) => {
    return (
        <div>
            MovieCarousel
        </div>
    );
};

export default MovieCarousel;