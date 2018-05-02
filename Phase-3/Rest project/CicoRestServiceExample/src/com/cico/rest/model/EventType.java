package com.cico.rest.model;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement (name = "eventtype")
public class EventType implements Serializable {

  private int eventTypeId;
  private String eventType;
  
  public int getEventTypeId() {
	return eventTypeId;
  }
  public void setEventTypeId(int eventTypeId) {
	this.eventTypeId = eventTypeId;
  }

  public String getEventType() {
	return eventType;
  }
  public void setEventType(String eventType) {
	this.eventType = eventType;
  }
  
  public String toString(){
	return "Event type id :"+this.eventTypeId+" event type :"+this.eventType;
  }
  
}
