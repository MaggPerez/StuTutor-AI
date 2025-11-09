# StuTutor-AI FastAPI Backend

FastAPI backend server for the StuTutor-AI application.

## Setup

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

### Installation

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# On macOS/Linux
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file:
```bash
cp .env.example .env
```

5. Edit the `.env` file with your configuration values.

## Running the Server

### Development Mode

Run the server with auto-reload:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --port 8000
```

### Production Mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The server will start at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:

- **Interactive API docs (Swagger UI)**: http://localhost:8000/docs
- **Alternative API docs (ReDoc)**: http://localhost:8000/redoc
- **OpenAPI schema**: http://localhost:8000/openapi.json

## Project Structure

```
server/
├── api/                  # API routes
│   ├── __init__.py
│   └── routes.py        # Route definitions
├── config/              # Configuration
│   ├── __init__.py
│   └── settings.py      # App settings
├── models/              # Data models
│   ├── __init__.py
│   └── schemas.py       # Pydantic models
├── services/            # Business logic
│   └── __init__.py
├── .env.example         # Example environment variables
├── .gitignore          # Git ignore rules
├── main.py             # Application entry point
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## Available Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /api/hello` - Example API endpoint

## Adding New Routes

1. Define your route in `api/routes.py`:
```python
@router.post("/your-endpoint")
async def your_function(request: YourModel):
    return {"result": "success"}
```

2. Define your models in `models/schemas.py`:
```python
class YourModel(BaseModel):
    field: str
```

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `PORT`: Server port (default: 8000)
- `ENVIRONMENT`: Environment mode (development/production)
- `ALLOWED_ORIGINS`: CORS allowed origins (comma-separated)

## Testing

You can test the API using:
- The built-in Swagger UI at `/docs`
- curl commands
- Postman or similar tools

Example:
```bash
curl http://localhost:8000/api/hello
```

## License

See the main project LICENSE file.

