package com.recipe.demo.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ReviewDto {
    private Long id;
    private int stars;

    @JsonAlias({"feedback", "feedBack"})
    @JsonProperty("feedBack")
    private String feedBack;
    private UserDto user;
}
