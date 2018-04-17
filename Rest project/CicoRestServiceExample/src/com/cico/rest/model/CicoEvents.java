package com.cico.rest.model;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement (name="cicoevents")
public class CicoEvents implements Serializable {
  
  private int eventId;
  private int typeOfEvent;
  private String observazione;
  private int issuePriority;
  private String serviceName;
  private String eventDesc;
  private int[] impactedProcesses;
  
  public int getEventId() {
	return eventId;
  }
  public void setEventId(int eventId) {
	this.eventId = eventId;
  }
  
  public int getTypeOfEvent() {
	return typeOfEvent;
  }
  public void setTypeOfEvent(int typeOfEvent) {
	this.typeOfEvent = typeOfEvent;
  }
  
  public String getObservazione() {
	return observazione;
  }
  public void setObservazione(String observazione) {
	this.observazione = observazione;
  }
  
  public int getIssuePriority() {
	return issuePriority;
  }
  public void setIssuePriority(int issuePriority) {
	this.issuePriority = issuePriority;
  }
  
  public String getServiceName() {
	return serviceName;
  }
  public void setServiceName(String serviceName) {
	this.serviceName = serviceName;
  }
  
  public String getEventDesc() {
	return eventDesc;
  }
  public void setEventDesc(String eventDesc) {
	this.eventDesc = eventDesc;
  }
  
  public int[] getImpactedProcesses() {
	return impactedProcesses;
  }
  public void setImpactedProcesses(int[] impactedProcesses) {
	this.impactedProcesses = impactedProcesses;
  }
    
  public String toString(){
	return "id :"+this.eventId+" type of event :"+this.typeOfEvent+"  service name :"+this.serviceName;
  }
  
}
