from fastapi import APIRouter


router = APIRouter()

import os
import dotenv
from pydantic import BaseModel, EmailStr
from supabase import create_client, Client

dotenv.load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

class UserCreate(BaseModel):
    auth_id: str
    email: EmailStr
    full_name: str
    username: str
    role: str

@router.get("/users")
def get_users():
    return {"message": "Hello, World!"}

@router.post("/create-user")
def create_user(user: UserCreate):
    return supabase.table("users").insert(user.model_dump()).execute().data[0]
