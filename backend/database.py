from motor.motor_asyncio import AsyncIOMotorClient
from models import *
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'portfolio_db')]

# Collection references
profile_collection = db.profile
about_collection = db.about
skills_collection = db.skills
experience_collection = db.experience
projects_collection = db.projects
testimonials_collection = db.testimonials
contact_messages_collection = db.contact_messages

class DatabaseManager:
    """Database operations manager"""
    
    @staticmethod
    async def init_default_data():
        """Initialize database with default portfolio data"""
        
        # Check if profile already exists
        existing_profile = await profile_collection.find_one()
        if existing_profile:
            return
        
        # Insert default profile
        default_profile = Profile(
            name="Jennifer Ann Lowe",
            tagline="Transforming Challenges Into Success Stories",
            subtitle="Transformation Coach & Strategic Financial Consultant",
            email="jenn@boostithub.com",
            phone="(808) 294-1414",
            location="Hawaii, USA",
            website="stayvolcano.com",
            profile_image="https://customer-assets.emergentagent.com/job_206f622d-a351-459e-9358-22cbc368f865/artifacts/3tq2mims_Jenn%20blue%20background.png"
        )
        await profile_collection.insert_one(default_profile.dict())
        
        # Insert default about section
        default_about = AboutSection(
            title="About Me",
            description="I'm built differently - I thrive on solving complex regulatory challenges and tackling overwhelming problems that others avoid. My superpower is transforming obstacles that paralyze people into breakthrough solutions, whether it's navigating complex statutes, codes, or innovative financial strategies.",
            story=[
                "With over 15 years in innovative financial services, I've built my expertise on unconventional strategies that create real results. From forensic accounting that revealed hidden business losses to achieving exceptional performance in competitive markets, I excel where complexity meets opportunity.",
                "My transformation journey - from overcoming significant personal challenges to qualifying for the Kona Ironman World Championship - taught me that our greatest obstacles become our greatest strengths. I help purpose-driven entrepreneurs navigate their most daunting challenges using proven methodologies.",
                "Whether it's regulatory navigation, innovative financial strategies, or personal transformation, I bring the same fearless problem-solving approach and relentless efficiency that has defined my success across industries."
            ]
        )
        await about_collection.insert_one(default_about.dict())
        
        # Insert default skills
        default_skills = [
            SkillCategory(
                category="Strategic Problem-Solving",
                items=["Complex Regulatory Navigation", "Forensic Business Analysis", "Systematic Process Optimization", "Crisis Resolution", "Strategic Implementation"]
            ),
            SkillCategory(
                category="Innovative Financial Services", 
                items=["Infinite Banking Strategies", "Credit Repair & Consumer Law", "Alternative Financial Solutions", "Banking System Analysis", "Wealth Building Strategies"]
            ),
            SkillCategory(
                category="Business Operations",
                items=["Revenue Optimization", "Operations Management", "Vendor Coordination", "Performance Analysis", "System Integration"]
            ),
            SkillCategory(
                category="Transformation Coaching",
                items=["Personal Development", "Goal Achievement Systems", "Change Management", "Strategic Planning", "Mindset Transformation"]
            ),
            SkillCategory(
                category="Technology & Systems",
                items=["Process Automation", "Data Analytics", "Digital Strategy", "System Implementation", "Performance Tracking"]
            )
        ]
        
        for skill in default_skills:
            await skills_collection.insert_one(skill.dict())
        
        print("✅ Default portfolio data initialized successfully")

    @staticmethod
    async def get_profile():
        """Get profile information"""
        profile = await profile_collection.find_one()
        if profile:
            profile['_id'] = str(profile['_id'])
            return profile
        return None

    @staticmethod
    async def get_about():
        """Get about section"""
        about = await about_collection.find_one()
        if about:
            about['_id'] = str(about['_id'])
            return about
        return None

    @staticmethod
    async def get_skills():
        """Get all skills"""
        skills = await skills_collection.find().to_list(100)
        for skill in skills:
            skill['_id'] = str(skill['_id'])
        return skills

    @staticmethod
    async def get_experience():
        """Get all experience"""
        experience = await experience_collection.find().sort("order", 1).to_list(100)
        for exp in experience:
            exp['_id'] = str(exp['_id'])
        return experience

    @staticmethod
    async def get_projects():
        """Get all projects"""
        projects = await projects_collection.find({"featured": True}).sort("order", 1).to_list(100)
        for project in projects:
            project['_id'] = str(project['_id'])
        return projects

    @staticmethod
    async def get_testimonials():
        """Get all testimonials"""
        testimonials = await testimonials_collection.find({"featured": True}).sort("order", 1).to_list(100)
        for testimonial in testimonials:
            testimonial['_id'] = str(testimonial['_id'])
        return testimonials

    @staticmethod
    async def create_contact_message(message_data: ContactMessageCreate):
        """Create new contact message"""
        message = ContactMessage(**message_data.dict())
        result = await contact_messages_collection.insert_one(message.dict())
        return str(result.inserted_id)

    @staticmethod
    async def get_contact_messages():
        """Get all contact messages"""
        messages = await contact_messages_collection.find().sort("created_at", -1).to_list(100)
        for message in messages:
            message['_id'] = str(message['_id'])
        return messages
