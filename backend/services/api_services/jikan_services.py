# Jikan API services - helper functions and what not.
import httpx
from typing import Optional, Dict, Any
from fastapi import HTTPException

JIKAN_BASE_URL = "https://api.jikan.moe/v4"
REQUEST_TIMEOUT = 10.0

async def fetch_jikan_data(endpoint: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    # function to grab data from Jikan API, passing endpoint param to go to a specific endpoint
    url = f"{JIKAN_BASE_URL}{endpoint}"

    async with httpx.AsyncClient(timeout=REQUEST_TIMEOUT) as client:
        try:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            if response.status_code == 404:
                raise HTTPException(status_code=404, detail="Jikan API resource not found")
            elif response.status_code == 429:
                raise HTTPException(status_code=429, detail="Jikan API rate limit exceeded, Try again later.")
            else:
                raise HTTPException(status_code=e.response.status_code, detail=str(e))
        except httpx.RequestError as e:
            raise HTTPException(status_code=503, detail=f"Failed to connect to anime service: {str(e)}")

async def search_anime(query: str, page: int = 1, limit: int = 10) -> Dict[str, Any]:
    # returns search results from a specific query i.e. Attack on Titan
    params = {
        "q": query,
        "page": page,
        "limit": min(limit, 25)
    }
    return await fetch_jikan_data("/anime", params)

async def get_anime_details(anime_id: int) -> Dict[str, Any]:
    return await fetch_jikan_data(f"/anime/{anime_id}")

async def get_top_anime(page: int = 1, limit: int = 10) -> Dict[str, Any]:
    # get the current top rate anime
    params = {
        "page": page,
        "limit": min(limit, 25)
    }
    return await fetch_jikan_data("/top/anime", params)

async def get_seasonal_anime(year: int, season: str, page: int = 1) -> Dict[str, Any]:
    # get all anime from a specific season i.ee Fall 2024
    valid_seasons = ["winter", "spring", "summer", "fall"]
    if season.lower() not in valid_seasons:
        raise HTTPException(status_code=400, detail=f"Invalid season. Valid seasons are: {', '.join(valid_seasons)}")
    params = {"page": page}

    return await fetch_jikan_data(f"/season/{year}/{season.lower()}", params)

async def get_anime_characters(anime_id: int) -> Dict[str, Any]:
    # get anime characters from a specific anime using MyAnimeList anime_id

    return await fetch_jikan_data(f"/anime/{anime_id}/characters")

async def get_anime_recommendations(anime_id: int) -> Dict[str, Any]:
    # get anime recommendations for a specific anime using MyAnimeList anime_id
    return await fetch_jikan_data(f"/anime/{anime_id}/recommendations")