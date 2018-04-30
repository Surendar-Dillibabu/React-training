package com.cico.rest.model;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement (name = "issuepriority")
public class IssuePriority implements Serializable {

  private int priorityId;
  private String priorityValue;
  
  public int getPriorityId() {
	return priorityId;
  }
  public void setPriorityId(int priorityId) {
	this.priorityId = priorityId;
  } 
  
  public String getPriorityValue() {
	return priorityValue;
  }
  public void setPriorityValue(String priorityValue) {
	this.priorityValue = priorityValue;
  }
  
  public String toString(){
	return "Priority id :"+this.priorityId+" priority name :"+this.priorityValue;
  }
  
}
