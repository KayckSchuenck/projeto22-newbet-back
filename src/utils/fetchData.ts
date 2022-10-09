import axios from "axios";


export async function fetchData(ids:string) {
    const config = {
      headers: {
        ["x-rapidapi-key"]: process.env.API_KEY,
      },
    }
    const { data: result } = await axios.get(
    `${process.env.EXTERNAL_API_BASE_URL}/fixtures?ids=${ids}`,
    config)
    const filterFinishedMatches=result.response.filter(match=>match.fixture.status.short==="FT")
    return filterFinishedMatches
}