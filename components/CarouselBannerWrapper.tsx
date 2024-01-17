import { getDiscoverMovies } from "@/lib/getMovies";
import CarouselBanner from "./CarouselBanner";

type Props = {
    id?: string;
    keywords?: string;
}

export default async function CarouselBannerWrapper({ id, keywords }: Props) {

    const movies = await getDiscoverMovies(id, keywords)

    return <CarouselBanner movies={movies} />
};

