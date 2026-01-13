from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from users.users import router as users_router
from courses.courses import router as courses_router
from gemini.gemini import router as gemini_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}




@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

app.include_router(users_router, prefix="/users")
app.include_router(courses_router, prefix="/courses")
app.include_router(gemini_router, prefix="/gemini")