package com.cico.rest.model;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement (name="eventprocess")
public class EventProcess implements Serializable {

  private int processId;
  private String processValue;
  
  public int getProcessId() {
	return processId;
  }
  public void setProcessId(int processId) {
	this.processId = processId;
  }
  
  public String getProcessValue() {
	return processValue;
  }
  public void setProcessValue(String processValue) {
	this.processValue = processValue;
  }
  
  public String toString(){
	return "Process id :"+this.processId+" process value :"+this.processValue;
  }
  
}
