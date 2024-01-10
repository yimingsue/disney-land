import { notFound } from "next/navigation"

type SearchProps = {
    params: {
        term: string
    }
}

function SearchPage({ params: { term } }: SearchProps) {
    if (!term) notFound()

    const termString = decodeURI(term)
    console.log(termString)


    return (
        <div>SearchPage: {termString}</div>
    )
}

export default SearchPage