from fastapi import FastAPI

app = FastAPI(title="AnimeApp API")

@app.get("/")
def running_message():
    return {"message": "AnimeApp API is running!"}

@app.get("/animes")
def get_animes():
    return {"animes": ["One Piece", "Naruto", "Bleach"]}