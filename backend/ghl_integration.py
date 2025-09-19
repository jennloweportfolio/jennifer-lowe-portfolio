import httpx
import logging
from typing import Dict, Any, Optional
import os
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

class GoHighLevelIntegration:
    def __init__(self):
        self.api_key = os.getenv("GHL_API_KEY")
        self.location_id = os.getenv("GHL_LOCATION_ID")
        self.base_url = "https://rest.gohighlevel.com/v1"
        
        if not self.api_key:
            logger.warning("GHL_API_KEY not found in environment variables")
        else:
            logger.info("GHL_API_KEY loaded successfully")
        if not self.location_id:
            logger.warning("GHL_LOCATION_ID not found in environment variables")
        else:
            logger.info(f"GHL_LOCATION_ID loaded: {self.location_id}")
    
    def get_headers(self) -> Dict[str, str]:
        """Get authentication headers for GHL API"""
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    async def create_contact(self, contact_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Create a new contact in GoHighLevel"""
        if not self.api_key or not self.location_id:
            logger.error("GHL API key or location ID not configured")
            return None
        
        # Map form data to GHL contact format
        ghl_contact = {
            "firstName": contact_data.get("name", "").split()[0] if contact_data.get("name") else "",
            "lastName": " ".join(contact_data.get("name", "").split()[1:]) if len(contact_data.get("name", "").split()) > 1 else "",
            "email": contact_data.get("email", ""),
            "locationId": self.location_id,
            "source": "Portfolio Website",
            "tags": ["Website Lead", "Portfolio Contact"]
        }
        
        # Add phone if provided
        if contact_data.get("phone"):
            ghl_contact["phone"] = contact_data["phone"]
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/contacts/",
                    headers=self.get_headers(),
                    json=ghl_contact,
                    timeout=30.0
                )
                
                if response.status_code in [200, 201]:
                    logger.info(f"Successfully created GHL contact for {contact_data.get('email')}")
                    return response.json()
                elif response.status_code == 409:
                    logger.info(f"Contact already exists: {contact_data.get('email')}")
                    return {"id": "existing", "message": "Contact already exists"}
                else:
                    logger.error(f"Failed to create GHL contact. Status: {response.status_code}, Response: {response.text}")
                    return None
                    
        except httpx.TimeoutException:
            logger.error("Timeout when creating GHL contact")
            return None
        except Exception as e:
            logger.error(f"Error creating GHL contact: {str(e)}")
            return None
    
    async def create_opportunity(self, contact_id: str, service_type: str) -> Optional[Dict[str, Any]]:
        """Create an opportunity for the contact based on service type"""
        if not self.api_key or not self.location_id:
            return None
        
        try:
            async with httpx.AsyncClient() as client:
                pipeline_response = await client.get(
                    f"{self.base_url}/pipelines/",
                    headers=self.get_headers(),
                    params={"locationId": self.location_id},
                    timeout=30.0
                )
                
                if pipeline_response.status_code != 200:
                    logger.error(f"Failed to get pipeline: {pipeline_response.status_code}")
                    return None
                
                pipelines = pipeline_response.json().get("pipelines", [])
                if not pipelines:
                    logger.error("No pipelines found")
                    return None
                
                pipeline = pipelines[0]
                pipeline_id = pipeline["id"]
                stage_id = pipeline["stages"][0]["id"] if pipeline.get("stages") else None
                
                if not stage_id:
                    logger.error("No stages found in pipeline")
                    return None
                
                # Map service types to opportunity values
                service_values = {
                    "Strategic Consulting": 5000,
                    "Regulatory Navigation Support": 3000,
                    "Transformation Coaching": 2500,
                    "Innovative Financial Strategies": 4000,
                    "Business System Optimization": 3500,
                    "General Inquiry": 1000
                }
                
                opportunity_data = {
                    "title": f"{service_type} - Portfolio Inquiry",
                    "pipelineId": pipeline_id,
                    "locationId": self.location_id,
                    "stageId": stage_id,
                    "status": "open",
                    "source": "Portfolio Website",
                    "monetaryValue": service_values.get(service_type, 1000),
                    "contactId": contact_id
                }
                
                opportunity_response = await client.post(
                    f"{self.base_url}/pipelines/{pipeline_id}/opportunities/",
                    headers=self.get_headers(),
                    json=opportunity_data,
                    timeout=30.0
                )
                
                if opportunity_response.status_code in [200, 201]:
                    logger.info(f"Created opportunity for contact {contact_id} in pipeline {pipeline_id}")
                    return opportunity_response.json()
                else:
                    logger.error(f"Failed to create opportunity: {opportunity_response.status_code} - {opportunity_response.text}")
                    return None
                    
        except Exception as e:
            logger.error(f"Error creating opportunity: {str(e)}")
            
        return None

# Initialize the integration
ghl_integration = GoHighLevelIntegration()
