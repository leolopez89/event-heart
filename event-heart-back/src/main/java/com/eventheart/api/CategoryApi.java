package com.eventheart.api;

import com.eventheart.dto.Category;
import com.eventheart.service.CategoryService;
import com.eventheart.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class CategoryApi {

    @Autowired
    CategoryService categoryService;

    @Autowired
    EventService eventService;

    /**
     * Add new Category
     * @param category The new Category
     * @return Created Category
     */
    @PostMapping(value="/categories", consumes={"application/json"}, produces = {"application/json"})
    public ResponseEntity<?> addCategory(@RequestBody @Valid Category category) {
        return ResponseEntity.ok(categoryService.save(category));
    }

    /**
     * Get all Categories
     * @return List of Categories
     */
    @GetMapping("/categories")
    public List<Category> getCategory() {
        return categoryService.getAll();
    }

    /**
     * Get single Category
     * @param id ID of Category
     * @return The specific Category
     */
    @GetMapping("/categories/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return categoryService.findById(id);
    }

    /**
     * Delete a Category
     * @param id ID of the Category
     */
    @DeleteMapping("/categories/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}
