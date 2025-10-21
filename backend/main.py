from fastapi import FastAPI, Query
from services.api_services.jikan_services import search_anime, get_top_anime
app = FastAPI(
    title="AnimeApp API",
    description="Backend API for AnimeApp - fetches data from Jikan API",
    version="1.0.0"
)

@app.get("/")
def running_message():
    return {"message": "AnimeApp API is running!"}

@app.get("/anime/search")
async def search_anime_endpoint(
        query: str = Query(..., description="Search query", min_length=3),
        page: int = Query(1, ge=1, le=25, description="Page number"),
        limit: int = Query(10, ge=1, le=25, description="Number of results per page")
                                ):
    return await search_anime(query, page, limit)

@app.get("/top-anime")
async def top_anime_endpoint(
        page: int = Query(1, ge=1, le=25, description="Page number"),
        limit: int = Query(10, ge=1, le=25, description="Number of results per page")
                                ):
    return await get_top_anime(page, limit)