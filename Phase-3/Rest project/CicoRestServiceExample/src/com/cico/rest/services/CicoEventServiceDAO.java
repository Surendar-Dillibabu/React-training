package com.cico.rest.services;

import java.io.EOFException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;
import com.cico.rest.model.CicoEvents;
import com.cico.rest.model.EventProcess;
import com.cico.rest.model.EventType;
import com.cico.rest.model.IssuePriority;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CicoEventServiceDAO {

  public String addCicoEventInFile(CicoEvents cicoEvents){	
	String filePath = "D:\\Workspace\\Risk-Project\\CicoRestServiceExample\\CicoEventData.txt";
	String returnMsg = "FAILURE";
	try{
	  boolean fileExists = new File(filePath).exists();
	  File fileObj = new File(filePath);
	  fileObj.createNewFile();
	  FileOutputStream fos = new FileOutputStream(filePath, true);
	  try {		  
	    ObjectOutputStream oos = fileExists ? 
	            new ObjectOutputStream(fos) {
	              protected void writeStreamHeader() throws IOException {
	                reset();
	              }
	            }
	    :  new ObjectOutputStream(fos);
		oos.writeObject(cicoEvents);
		oos.flush();
		oos.close();		
		returnMsg = "SUCCESS";
	  } catch (Exception ex) {
		ex.printStackTrace();
	  } finally {
		if(fos != null){
		  fos.close();	
		}
	  }
	}catch(Exception ex){
	  ex.printStackTrace();
    }
	return returnMsg;
  }
  
  public List<CicoEvents> getAllCicoEventFromFile(){
	String filePath = "D:\\Workspace\\Risk-Project\\CicoRestServiceExample\\CicoEventData.txt";
	List<CicoEvents> cicoEventList = new ArrayList<>();	
	try{
	  FileInputStream fis = new FileInputStream(filePath);
      ObjectInputStream ois = new ObjectInputStream(fis);
      while(fis.available() > 0) {
        try {
          CicoEvents obj = (CicoEvents) ois.readObject();
          if(obj != null)
  		    cicoEventList.add(obj);
        } catch (ClassNotFoundException e) {
           e.printStackTrace();
        }
      }
      ois.close();
      fis.close();
	} catch(Exception ex){
	  ex.printStackTrace();
	}
	return cicoEventList;
  }
  
  public CicoEvents getCicoEventByIdFromFile(final int eventId){
	String filePath = "D:\\Workspace\\Risk-Project\\CicoRestServiceExample\\CicoEventData.txt";
	CicoEvents cicoEvents = null;
	boolean cont = true;
	try(FileInputStream fileIn = new FileInputStream(filePath); ObjectInputStream objectIn = new ObjectInputStream(fileIn);){	  
	  while(cont){
		try{
		  cicoEvents = (CicoEvents) objectIn.readObject();
	      if(cicoEvents != null){
	        if(cicoEvents.getEventId() == eventId){
	    	  cont = false;  
	        }
	      }else{
	        cont = false;
	      }
		}catch(EOFException ex){
		  cont = false;	
		}	
	  }
	}catch(Exception ex){
	  ex.printStackTrace();	
	}
	return cicoEvents;
  }
  
  public List<EventProcess> getProcessListFromFile() {
	List<EventProcess> eventProcessList = null;
	try{
	  ObjectMapper mapper = new ObjectMapper();
	  eventProcessList = mapper.readValue(new File("D:\\Workspace\\Risk-Project\\CicoRestServiceExample\\CicoEventProcessList.txt"), new TypeReference<List<EventProcess>>(){});	
	} catch(Exception ex){
	  ex.printStackTrace();	
	}			  
    return eventProcessList;
  }
  
  public List<EventType> getEventTypeListFromFile() {	  
	List<EventType> eventTypeList = null;
	try{
	  ObjectMapper mapper = new ObjectMapper();
	  eventTypeList = mapper.readValue(new File("D:\\Workspace\\Risk-Project\\CicoRestServiceExample\\CicoEventTypeList.txt"), new TypeReference<List<EventType>>(){});	
	} catch(Exception ex){
	  ex.printStackTrace();	
	}			  
	return eventTypeList;
  }
  
  
  public List<IssuePriority> getIssuePrioityListFromFile() {	  
	List<IssuePriority> issuePriorityList = null;
	try{
	  ObjectMapper mapper = new ObjectMapper();
	  issuePriorityList = mapper.readValue(new File("D:\\Workspace\\Risk-Project\\CicoRestServiceExample\\CicoIssuePriorityList.txt"), new TypeReference<List<IssuePriority>>(){});	
	} catch(Exception ex){
	  ex.printStackTrace();	
	}			  
	return issuePriorityList;
  }
  
  public String modifyCicoEvent(CicoEvents cicoEvents){
    List<CicoEvents> cicoEventList = getAllCicoEventFromFile();    
    String returnMsg = "FAILURE";
    File file = new File("D:\\Workspace\\Risk-Project\\CicoRestServiceExample\\CicoEventData.txt");
    file.delete();
    for(CicoEvents obj : cicoEventList){
      if(obj.getEventId() == cicoEvents.getEventId()){
    	returnMsg = addCicoEventInFile(cicoEvents);
      } else{
    	returnMsg = addCicoEventInFile(obj);
      }      
    }
    return returnMsg;
  }
  
}
