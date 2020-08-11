package com.eventheart.service;

import com.eventheart.api.exeptions.ElementNotFoundException;
import com.eventheart.dao.CategoryRepository;
import com.eventheart.dto.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public Category save(Category category){
        return categoryRepository.saveAndFlush(category);
    }

    public List<Category> getAll(){
        return categoryRepository.findAll();
    }

    public Category findById(Long id){
        List<Category> category = categoryRepository.findByCategoryId(id);
        if (category.size() == 0) {
            throw new ElementNotFoundException();
        }
        return category.get(0);
    }

    public void deleteCategory(Long id){
        categoryRepository.delete(findById(id));
    }

}
