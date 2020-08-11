package com.eventheart;

import com.eventheart.api.exeptions.ElementNotFoundException;

import java.util.Optional;

import com.eventheart.dao.CategoryRepository;
import com.eventheart.dto.Category;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class EventHeartApplicationTests {

    @MockBean
    private CategoryRepository categoryRepository;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void canRetrieveByIdWhenExists() {
        // given
        given(categoryRepository.findById("1"))
                .willReturn(Optional.of(new Category(1L, "Pop", null)));

        // when
        ResponseEntity<Category> categoryResponse = restTemplate.getForEntity("/categories/1", Category.class);

        // then
        assertThat(categoryResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(categoryResponse.getBody().equals(new Category(1L, "Pop", null)));
    }

	@Test
    public void canRetrieveByIdWhenDoesNotExist() {
        // given
        given(categoryRepository.findById("1"))
                .willThrow(new ElementNotFoundException());

        // when
        ResponseEntity<Category> categoryResponse = restTemplate.getForEntity("/categories/2",Category.class);

        // then
        assertThat(categoryResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

	@Test
    public void canCreateANewCategory() {
        // when
        ResponseEntity<Category> categoryResponse = restTemplate.postForEntity("/categories/",
				new Category(1L, "Pop", null), Category.class);

        // then
        assertThat(categoryResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
