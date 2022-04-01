package com.ssafy.sayeon.common.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.sayeon.common.config.ImageUploadProperties;

@Component
public class ImageUtil {
	private final Path dirLocation;

	@Autowired
	public ImageUtil(ImageUploadProperties imageUploadProperties) {
		this.dirLocation = Paths.get(imageUploadProperties.getLocation()).toAbsolutePath().normalize();
	}

	@PostConstruct
	public void init() {
		try {
			Files.createDirectories(this.dirLocation);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String saveImage(MultipartFile multipartFile) {
		String fileName = multipartFile.getOriginalFilename();

		fileName = new SimpleDateFormat("yyMMddhhmmss").format(new Date()) + fileName;

		Path location = this.dirLocation.resolve(fileName);

		try {
			Files.copy(multipartFile.getInputStream(), location, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return fileName;
	}

	public Resource loadFile(String fileName) throws FileNotFoundException {
		try {
			Path file = this.dirLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(file.toUri());

			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new FileNotFoundException("Could not find file");
			}
		} catch (MalformedURLException e) {
			throw new FileNotFoundException("Could not download file");
		}
	}

}
