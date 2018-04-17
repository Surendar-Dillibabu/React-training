package com.cico.rest.services;

import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.Provider;
import com.cico.rest.model.CicoEvents;
import com.cico.rest.model.EventProcess;
import com.cico.rest.model.EventType;
import com.cico.rest.model.IssuePriority;
import com.sun.jersey.spi.inject.Inject;

@Path("/event")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Provider
public class CicoEventServiceImpl implements CicoEventService {
  
  @Inject
  private CicoEventServiceDAO cicoEventServiceDAO;
	
  @Override
  @GET
  @Path("/getProcessList")
  public List<EventProcess> getProcessList() {	
    return cicoEventServiceDAO.getProcessListFromFile();	
  }
  
  @Override
  @GET
  @Path("/getEventTypeList")
  public List<EventType> getEventTypeList() {	
    return cicoEventServiceDAO.getEventTypeListFromFile();	
  }
  
  @Override
  @GET
  @Path("/getIssuePriorityList")
  public List<IssuePriority> getIssuePriorityList() {	
    return cicoEventServiceDAO.getIssuePrioityListFromFile();	
  }
  
  @Override
  @POST
  @Path("/addEvent")
  public String addCicoEvent(CicoEvents cicoEvents){	
	return cicoEventServiceDAO.addCicoEventInFile(cicoEvents);
  }
  
  @Override
  @GET
  @Path("/getAllEvents")
  public List<CicoEvents> getAllCicoEvents() {	
    return cicoEventServiceDAO.getAllCicoEventFromFile();	
  }
  
  @Override
  @GET
  @Path("/{id}/getEvent")
  public CicoEvents getCicoEventById(@PathParam("id") int eventId){	
	return cicoEventServiceDAO.getCicoEventByIdFromFile(eventId);
  }
  
  @Override
  @POST
  @Path("/modifyEvent")
  public String modifyCicoEvent(CicoEvents cicoEvents) {	
	return cicoEventServiceDAO.modifyCicoEvent(cicoEvents);
  }
  
}
