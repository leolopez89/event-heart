package com.eventheart.service;

import com.eventheart.api.exeptions.ElementNotFoundException;
import com.eventheart.dao.CategoryRepository;
import com.eventheart.dao.EventRepository;
import com.eventheart.dao.UserRepository;
import com.eventheart.dto.Category;
import com.eventheart.dto.Event;
import com.eventheart.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    CategoryRepository categoryRepository;

    public List<Event> getAllById(Long categoryId){
        return eventRepository.findByIdCategory(categoryId);
    }
    
    public Event save(Long id, Event event){

        List<Category> category = categoryRepository.findByCategoryId(id);
        if (category.size() == 0) {
            throw new ElementNotFoundException();
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        List<User> users = userRepository.findByName(name.split(",")[0]);
        if (users.size() == 0) {
            throw new ElementNotFoundException();
        }

        event.setIdUser(users.get(0));
        event.setIdCategory(category.get(0));
        return eventRepository.saveAndFlush(event);
    }
    
    public void delete(Long id, Long uid){
        Optional<Event> event = eventRepository.findByUidAndIdCategory(uid, id);
        if (!event.isPresent()) {
            throw new ElementNotFoundException();
        }
        eventRepository.delete(event.get());
    }

    public List<Event> getAll(){
        return eventRepository.findAll();
    }
    
}
