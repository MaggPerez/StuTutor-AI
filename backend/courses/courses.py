from fastapi import APIRouter

router = APIRouter()

@router.get("/courses")
def get_courses():
    return {"message": "Hello, World!"}


@router.post("/courses")
def create_course():
    return {"message": "Course created"}



@router.get("/courses/{course_id}")
def get_course(course_id: int):
    return {"message": "Hello, World!"}