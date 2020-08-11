package com.eventheart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 *
 * @author leonardo
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {                                    

    @Bean
    public Docket productionApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select().apis(RequestHandlerSelectors.basePackage("com.eventheart.api"))
                .build()
                .apiInfo(metadata());
    }

    private ApiInfo metadata() {
        return new ApiInfoBuilder()
                .title("EventHeart Manager REST API documentation")
                .description("see Leonardo for more info")
                .version("1.0")
                .license("Leonardo © 2020")
                .build();
    }
}
