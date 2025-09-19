from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import httpx
from pathlib import Path
from models import *
from database import DatabaseManager
from ghl_integration import ghl_integration

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="Jennifer Lowe Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Portfolio API Routes
@api_router.get("/")
async def root():
    return {"message": "Jennifer Lowe Portfolio API", "version": "1.0.0"}

@api_router.get("/profile")
async def get_profile():
    """Get profile information"""
    try:
        profile = await DatabaseManager.get_profile()
        about = await DatabaseManager.get_about()
        
        if not profile or not about:
            raise HTTPException(status_code=404, detail="Profile information not found")
        
        return {
            "name": profile["name"],
            "tagline": profile["tagline"],
            "subtitle": profile["subtitle"],
            "email": profile["email"],
            "phone": profile["phone"],
            "location": profile["location"],
            "website": profile["website"],
            "profileImage": profile["profile_image"],
            "about": {
                "title": about["title"],
                "description": about["description"],
                "story": about["story"]
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching profile: {str(e)}")

@api_router.get("/skills")
async def get_skills():
    """Get all skills"""
    try:
        skills = await DatabaseManager.get_skills()
        return skills
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching skills: {str(e)}")

@api_router.get("/experience")
async def get_experience():
    """Get professional experience"""
    try:
        experience = await DatabaseManager.get_experience()
        return experience
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching experience: {str(e)}")

@api_router.get("/projects")
async def get_projects():
    """Get featured projects"""
    try:
        projects = await DatabaseManager.get_projects()
        return projects
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching projects: {str(e)}")

@api_router.get("/testimonials")
async def get_testimonials():
    """Get testimonials"""
    try:
        testimonials = await DatabaseManager.get_testimonials()
        return testimonials
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching testimonials: {str(e)}")

@api_router.post("/contact", response_model=ContactMessageResponse)
async def submit_contact_form(contact_data: ContactMessageCreate):
    """Submit contact form and integrate with GoHighLevel"""
    try:
        # Save to local database
        message_id = await DatabaseManager.create_contact_message(contact_data)
        
        # Send to GoHighLevel
        ghl_contact = None
        try:
            contact_dict = contact_data.dict()
            ghl_contact = await ghl_integration.create_contact(contact_dict)
            
            if ghl_contact:
                logging.info(f"Successfully integrated contact with GHL: {contact_data.email}")
                
                # Create opportunity based on service type - check both response formats
                contact_id = None
                if ghl_contact.get("contact", {}).get("id"):
                    contact_id = ghl_contact["contact"]["id"]
                elif ghl_contact.get("id"):
                    contact_id = ghl_contact["id"]
                
                if contact_id:
                    opportunity = await ghl_integration.create_opportunity(
                        contact_id, 
                        contact_data.service_type
                    )
                    if opportunity:
                        logging.info(f"Created opportunity for contact {contact_id}")
                    else:
                        logging.warning(f"Failed to create opportunity for contact {contact_id}")
            else:
                logging.warning(f"Failed to integrate with GHL for: {contact_data.email}")
                
        except Exception as ghl_error:
            logging.error(f"GHL integration error: {str(ghl_error)}")
            # Continue without failing the entire request
        
        return ContactMessageResponse(
            success=True,
            message="Thank you for your message! I'll get back to you within 24 hours.",
            id=message_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting contact form: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize database with default data on startup"""
    await DatabaseManager.init_default_data()

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection on shutdown"""
    pass
