package com.cico.rest.services;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

public class CicoEventServiceClient {

  public static void main(String[] args) {
	try {
	  Client client = Client.create();
      WebResource webResource = client.resource("http://localhost:8090/CicoRestServiceExample/event/getIssuePriorityList");
	  String input = "{'eventId' : 13, 'typeOfEvent' : 13, 'observazione' : 'Y3', 'issuePriority' : 33, 'serviceName' : 'Test service3',  'eventDesc' : 'Test event description3'}";
	        
      ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);

	  if (response.getStatus() != 200) {
		throw new RuntimeException("Failed : HTTP error code : "+response.getStatus());
	  }

	  String output = response.getEntity(String.class);

	  System.out.println("Output from Server .... \n");
	  System.out.println(output);

	} catch (Exception e) {
      e.printStackTrace();
	}
  }
  
}
