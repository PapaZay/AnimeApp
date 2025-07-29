from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def running_message():
    return {"message": "AnimeApp API is running!"}