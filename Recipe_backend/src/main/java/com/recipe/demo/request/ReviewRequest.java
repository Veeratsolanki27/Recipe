package com.recipe.demo.request;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ReviewRequest {
    private Long userId;

    @JsonAlias({"username", "userName"})
    private String username;

    private int stars;

    @JsonAlias({"feedback", "feedBack", "comment"})
    @JsonProperty("feedBack")
    private String feedBack;
}
