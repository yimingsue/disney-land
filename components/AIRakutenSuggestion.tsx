'use client';

import useRakutenAI, { RAKUTEN_OPENAI_ENDPOINT, RAKUTEN_OPENAI_COOKIE } from "@/lib/useRakutenAI";
import { useState } from "react";
import useSWR from "swr";

function AIRakutenSuggestion({ term }: { term: string }) {


    const { fetchChatCompletion, rakutenFetcher, initCompletion } = useRakutenAI()
    const { data, error, isLoading, isValidating } = useSWR('suggestions',
        () => rakutenFetcher(RAKUTEN_OPENAI_ENDPOINT, RAKUTEN_OPENAI_COOKIE, initCompletion(term)),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            refreshInterval: 99999999
        });


    // fetchChatCompletion(term)
    console.log("data: ", data)
    console.log("error: ", error)

    const generateText = () => {
        if (isLoading || isValidating)
            return (
                <>
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
                    <p className="text-sm text-gray-400">AI Assistant is thinking...</p>
                </>
            );

        if (error) return <>Error...</>;
        if (!data) return <>No data</>;

        return (
            <div className="flex space-x-5 mt-32 xl:mt-42 p-10 pb-0 items-center">
                <div className="animate-pulse rounded-full bg-gradient-to-t from-purple-400 h-10 w-10 border-2 flex-shrink-0 border-white" />

                <div>
                    <p className="text-sm text-purple-400">
                        Azure Open AI Assistant Suggests:{" "}
                    </p>
                    <p className="italic text-xl">{data}</p>
                </div>
            </div>
        )
    }
    return (
        <div className="flex space-x-5 px-10 items-center">
            {generateText()}
        </div>
    )
}

export default AIRakutenSuggestion