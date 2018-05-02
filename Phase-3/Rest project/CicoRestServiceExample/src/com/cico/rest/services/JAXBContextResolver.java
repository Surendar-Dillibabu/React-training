package com.cico.rest.services;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;
import javax.xml.bind.JAXBContext;
import com.cico.rest.model.CicoEvents;
import com.sun.jersey.api.json.JSONJAXBContext;

@Provider
public class JAXBContextResolver implements ContextResolver<JAXBContext> {

  private JAXBContext context;
  
  private Class[] types = {CicoEvents.class};
  
  public JAXBContextResolver() throws Exception {    	
    Map props = new HashMap<String, Object>();
    props.put(JSONJAXBContext.JSON_NOTATION, "MAPPED");
    props.put(JSONJAXBContext.JSON_ROOT_UNWRAPPING, Boolean.TRUE);
    props.put(JSONJAXBContext.JSON_ARRAYS, new 
     		HashSet<String>(types.length){{ 
      			 add("impactedProcesses"); 
      			 add("cicoevents");
       		}});
    this.context = new JSONJAXBContext(types, props);
  }
  
  public JAXBContext getContext(Class<?> objectType) {
    return (types[0].equals(objectType)) ? context : null;
  }
}