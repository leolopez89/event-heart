package com.eventheart.dao;

import com.eventheart.dto.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long>{
    List<Event> findByIdCategory(Long id);
    Optional<Event> findByUidAndIdCategory(Long uid, Long idCategory);
}
