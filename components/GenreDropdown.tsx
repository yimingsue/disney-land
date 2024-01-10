import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Genre, Genres } from "@/typings";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
const options: RequestInit = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY} `
    },
    next: { revalidate: 60 * 60 * 24 }
};


async function getGenres() {
    const res = await fetch(url, options)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const data = (await res.json()) as Genres
    return data
}

async function GenreDropdown() {
    const data = await getGenres()
    console.log("data loaded:::", data.genres)
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="text-white flex justify-center items-center">
                    Genre<ChevronDown className="ml-1" />

                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select a Genre</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {data?.genres?.map((gen: Genre) => {
                        return (
                            <DropdownMenuItem key={gen.id}>
                                <Link href={`/genre/${gen.id}?genre=${gen.name}`}>
                                    <span>{gen.name}</span>
                                </Link>
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    );
};

export default GenreDropdown;