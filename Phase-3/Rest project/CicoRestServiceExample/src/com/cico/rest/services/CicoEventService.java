package com.cico.rest.services;

import java.util.List;

import com.cico.rest.model.CicoEvents;
import com.cico.rest.model.EventProcess;
import com.cico.rest.model.EventType;
import com.cico.rest.model.IssuePriority;

public interface CicoEventService {

  public List<EventProcess> getProcessList();
  
  public List<EventType> getEventTypeList();
  
  public List<IssuePriority> getIssuePriorityList();
	
  public String addCicoEvent(CicoEvents cicoEvents);	
  	
  public List<CicoEvents> getAllCicoEvents();
  
  public CicoEvents getCicoEventById(int eventId);
  
  public String modifyCicoEvent(CicoEvents cicoEvents);
  
}
