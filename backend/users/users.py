from fastapi import APIRouter

router = APIRouter()

import os
import dotenv
from supabase import create_client, Client

dotenv.load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@router.get("/users")
def get_users():
    return {"message": "Hello, World!"}

