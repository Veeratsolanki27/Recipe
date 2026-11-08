package com.recipe.demo.service.image;

import com.recipe.demo.dto.ImageDto;
import com.recipe.demo.model.Image;
import com.recipe.demo.model.Recipe;
import com.recipe.demo.repository.ImageRepository;
import com.recipe.demo.repository.RecipeRepository;
import com.recipe.demo.service.recipe.IRecipeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.SQLException;

import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ImageService implements IImageService {
    private final ImageRepository imageRepository;
    private final IRecipeService recipeService;
    private final RecipeRepository recipeRepository;

    @Override
    @Transactional(readOnly = true)
    public Image getImageById(Long imageId) {
        return imageRepository.findById(imageId)
                .orElseThrow(() -> new EntityNotFoundException("Image not found"));
    }

    @Override
    public void deleteImage(Long imageId) {
        imageRepository.findById(imageId).ifPresentOrElse(imageRepository::delete, () ->{
            throw new EntityNotFoundException("Image not found");
        });

    }

    @Override
    public void updateImage(MultipartFile file, Long imageId) {
        Image image = getImageById(imageId);
        try {
            image.setFileName(file.getOriginalFilename());
            image.setFileType(file.getContentType());
            image.setImage(new SerialBlob(file.getBytes()));
            imageRepository.save(image);
        }catch (IOException | SQLException e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public ImageDto saveImage(Long recipeId, MultipartFile file) {
        Recipe recipe = recipeService.getRecipeById(recipeId);

        try {
            Image image = imageRepository.findByRecipeId(recipeId);
            if (image == null) {
                image = new Image();
            }
            image.setFileName(file.getOriginalFilename());
            image.setFileType(file.getContentType());
            image.setImage(new SerialBlob(file.getBytes()));
            image.setRecipe(recipe);

            Image savedImage = imageRepository.save(image);
            String downloadUrl = "/api/images/image/download/" + savedImage.getId();
            savedImage.setDownloadUrl(downloadUrl);
            savedImage = imageRepository.save(savedImage);

            recipe.setImage(savedImage);
            recipeRepository.save(recipe);

            ImageDto imageDto = new ImageDto();
            imageDto.setId(savedImage.getId());
            imageDto.setFileName(savedImage.getFileName());
            imageDto.setFileType(savedImage.getFileType());
            imageDto.setDownloadUrl(savedImage.getDownloadUrl());
            return imageDto;
        } catch (SQLException | IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
