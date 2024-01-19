import { RChatResponseMessage } from "@/typings"
import useSWR from "swr";
import Cookies from "js-cookie";
// const COOKIE_VAL = '_ra=1689125586433|a1e62039-42a4-42c2-8f80-48c912d42335; __Host-next-auth.csrf-token=1754ec5151569b464c55e5c71d579d43c1c140e22cced5fff269299efbe80bdc%7C66defc35d57a605b00093bc6ce30f00a533c6b56fa8d4c97c94936f588b6942c; __Secure-next-auth.callback-url=https%3A%2F%2Fchat.tsd.public.rakuten-it.com; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Jle46s5Ft2S-lr2s.9GKVd_ygBUJiO6wXj3oz9vh1sZukCN7WLux-3jHxsclaxQs-XJK_LblqGNaE7YI8zjoBVL9m7IfZwxkpe9LqZl1Dp3KFyUfZ2YB1zSxLvj0A0ZSNCmKRLzWmHx_sdAtM9wUucxMrqwtP2Ucw4pGxhvYJDtkf6LXh1lDIiApOF2SQyKTW_RZrVXunBvRtm1VzNr8-VSPBIO7D3jrrk176Zra1_BR7LRmYWOY17NgtpA.TdVDXo1-2Ta9K8hTc6faSw'
export const RAKUTEN_OPENAI_ENDPOINT = 'https://chat.tsd.public.rakuten-it.com/api/chat'
export const RAKUTEN_OPENAI_COOKIE = '_ra=1689125586433|a1e62039-42a4-42c2-8f80-48c912d42335; __Host-next-auth.csrf-token=1754ec5151569b464c55e5c71d579d43c1c140e22cced5fff269299efbe80bdc%7C66defc35d57a605b00093bc6ce30f00a533c6b56fa8d4c97c94936f588b6942c; __Secure-next-auth.callback-url=https%3A%2F%2Fchat.tsd.public.rakuten-it.com; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Jle46s5Ft2S-lr2s.9GKVd_ygBUJiO6wXj3oz9vh1sZukCN7WLux-3jHxsclaxQs-XJK_LblqGNaE7YI8zjoBVL9m7IfZwxkpe9LqZl1Dp3KFyUfZ2YB1zSxLvj0A0ZSNCmKRLzWmHx_sdAtM9wUucxMrqwtP2Ucw4pGxhvYJDtkf6LXh1lDIiApOF2SQyKTW_RZrVXunBvRtm1VzNr8-VSPBIO7D3jrrk176Zra1_BR7LRmYWOY17NgtpA.TdVDXo1-2Ta9K8hTc6faSw'

export class CustomError extends Error {
  info: any;
  status: any;

  constructor(message?: string, status?: number, info?: any) {
    super(message); // 调用父类的构造函数
    this.name = 'CustomError'; // 设置错误的名称
    this.status = status; // 设置自定义的状态码属性
    this.info = info; // 设置自定义的信息属性
  }
}

const rakutenFetcher = async (endpoint: string, cookieVal: string, req: any) => {
  const res = await fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': '_ra=1689125586433|a1e62039-42a4-42c2-8f80-48c912d42335; __Host-next-auth.csrf-token=1754ec5151569b464c55e5c71d579d43c1c140e22cced5fff269299efbe80bdc%7C66defc35d57a605b00093bc6ce30f00a533c6b56fa8d4c97c94936f588b6942c; __Secure-next-auth.callback-url=https%3A%2F%2Fchat.tsd.public.rakuten-it.com; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Jle46s5Ft2S-lr2s.9GKVd_ygBUJiO6wXj3oz9vh1sZukCN7WLux-3jHxsclaxQs-XJK_LblqGNaE7YI8zjoBVL9m7IfZwxkpe9LqZl1Dp3KFyUfZ2YB1zSxLvj0A0ZSNCmKRLzWmHx_sdAtM9wUucxMrqwtP2Ucw4pGxhvYJDtkf6LXh1lDIiApOF2SQyKTW_RZrVXunBvRtm1VzNr8-VSPBIO7D3jrrk176Zra1_BR7LRmYWOY17NgtpA.TdVDXo1-2Ta9K8hTc6faSw'
    },
    body: JSON.stringify(req)
  })
  // 如果状态码不在 200-299 的范围内，
  // 我们仍然尝试解析并抛出它。
  if (!res.ok) {
    const error = new CustomError('An error occurred while fetching the data.')
    // 将额外的信息附加到错误对象上。
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

function initCompletion(term: string) {
  return {
    messages: [
      {
        role: "system",
        content: `You are a digital video assistant working for services such as Netflix, Disney Plus & Amazon Prime Video. Your job is to provide suggestions based on the videos the user specifies. Provide an quirky breakdown of what the user should watch next! It should only list the names of the films after the introduction. Keep the response short and sweet! Always list at least 3 films as suggestions. If the user mentions a genre, you should provide a suggestion based on that genre.`,
      },
      {
        role: "user",
        content: `I like: ${term}`,
      },
    ],
    model: "azure-gpt-3.5-turbo",
  }
}

function useRakutenAI() {

  const fetchChatCompletion = async (term: string) => {
    const completions: (RChatResponseMessage | undefined)[] = []
    const COOKIE_VAL = process.env.RAKUTEN_OPENAI_COOKIE || RAKUTEN_OPENAI_COOKIE
    const endpoint = process.env.RAKUTEN_OPENAI_ENDPOINT || RAKUTEN_OPENAI_ENDPOINT

    if (!endpoint) throw new Error("Missing endpoint")

    const requestBody = initCompletion(term) || {}
    Cookies.set('Cookie', '_ra=1689125586433|a1e62039-42a4-42c2-8f80-48c912d42335; __Host-next-auth.csrf-token=1754ec5151569b464c55e5c71d579d43c1c140e22cced5fff269299efbe80bdc%7C66defc35d57a605b00093bc6ce30f00a533c6b56fa8d4c97c94936f588b6942c; __Secure-next-auth.callback-url=https%3A%2F%2Fchat.tsd.public.rakuten-it.com; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Jle46s5Ft2S-lr2s.9GKVd_ygBUJiO6wXj3oz9vh1sZukCN7WLux-3jHxsclaxQs-XJK_LblqGNaE7YI8zjoBVL9m7IfZwxkpe9LqZl1Dp3KFyUfZ2YB1zSxLvj0A0ZSNCmKRLzWmHx_sdAtM9wUucxMrqwtP2Ucw4pGxhvYJDtkf6LXh1lDIiApOF2SQyKTW_RZrVXunBvRtm1VzNr8-VSPBIO7D3jrrk176Zra1_BR7LRmYWOY17NgtpA.TdVDXo1-2Ta9K8hTc6faSw');

    console.log("rakutenFetcher: ", rakutenFetcher)
    const result = await rakutenFetcher(endpoint, COOKIE_VAL, requestBody).catch(error => {
      console.log('Error: ', error)
      return 'Server error'
    })
    console.log("suggestion result: ", result)

    // for (const choice of result.choices) {
    //   console.log(choice.message);
    //   completions.push(choice.message);
    // }

    return result || 'No Suggestions';

    // Call the fetch function
  }

  return { fetchChatCompletion, rakutenFetcher, initCompletion }
}

export default useRakutenAI