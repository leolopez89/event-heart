package com.eventheart.dao;

import com.eventheart.dto.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, String>{
    List<Category> findByCategoryId(Long id);

}
