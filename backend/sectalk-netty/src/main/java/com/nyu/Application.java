package com.nyu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import tk.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan(basePackages = "com.nyu.mapper")
@ComponentScan(basePackages= {"com.nyu", "org.n3r.idworker"})
public class  Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
