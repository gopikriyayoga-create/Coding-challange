const API_KEY = 'd7a37ff6c5d044d09186ae434cb03051'
const BASE_URL = 'https://newsapi.org/v2'

export async function getNews() {
    try {
        const getNewsApi = await
        fetch(`${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`)

        console.log(await getNewsApi.json());
        
        
    } catch (error) {
        console.log(error);
        
    }
    
}
