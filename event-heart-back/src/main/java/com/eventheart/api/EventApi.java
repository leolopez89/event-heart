package com.eventheart.api;

import com.eventheart.dto.Event;
import com.eventheart.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class EventApi {

    @Autowired
    EventService eventService;

    /**
     * Get all Events
     * @return List of Events
     */
    @GetMapping("/events")
    public List<Event> getEvents() {
        return eventService.getAll();
    }

    /**
     * Add new Event
     * @param id ID of Category
     * @param event The new Event
     * @return Created Event
     */
    @PostMapping(value="/events/{id}/event", consumes={"application/json;charset=UTF-8"})
    public Event addEvent(@PathVariable Long id, @RequestBody @Valid Event event) {
        return eventService.save(id, event);
    }

    /**
     * Delete a Event
     * @param id ID of Category
     * @param uid UID of Event
     */
    @DeleteMapping("/events/{id}/events/{uid}")
    public void deleteEvent(@PathVariable Long id, @PathVariable Long uid) {
        eventService.delete(id, uid);
    }
}
