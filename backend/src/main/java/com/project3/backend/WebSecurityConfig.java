package com.project3.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests((requests) -> requests
				.requestMatchers("/", "/home", "/orders").permitAll()
				.anyRequest().permitAll()
			).csrf((csrf) -> csrf.disable());
			// .formLogin((form) -> form
			// 	.loginPage("/login")
			// 	.permitAll()
			// )
			// .logout((logout) -> logout.permitAll());
		/*return http
			.authorizeHttpRequests(auth -> {
				auth.requestMatchers("/").permitAll(); //for home route anyone can get to it
				auth.anyRequest().authenticated(); //other pages will require login
			})
			.oauth2Login(Customizer.withDefaults())
			.formLogin(Customizer.withDefaults()).build();*/
		return http.build();
	}

	@Bean
	public UserDetailsService userDetailsService() {
		UserDetails user =
			 User.withDefaultPasswordEncoder()
				.username("user")
				.password("password")
				.roles("USER")
				.build();

		return new InMemoryUserDetailsManager(user);
	}
}