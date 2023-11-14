package com.project3.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.beans.factory.annotation.Autowired;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

	@Autowired
	private Oauth2LoginSuccessHandler oauth2LoginSuccessHandler;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		
		http.authorizeHttpRequests((requests) -> requests
				.requestMatchers("/", "/home", "/orders").permitAll()
				.anyRequest().permitAll()
			)
			.csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
			.cors(cors -> 
				cors.configurationSource(corsConfigurationSource())
			);
		// 	.logout(LogoutConfigurer::permitAll);
		// http
		// 	.authorizeHttpRequests(auth -> {
		// 		auth.requestMatchers("/").permitAll(); //for home route anyone can get to it
		// 		auth.anyRequest().authenticated(); //other pages will require login
		// 	})
		// 	.oauth2Login(Customizer.withDefaults());

		return http.build();

		/*return http
		.csrf(AbstractHttpConfigurer::disable)
		.cors(cors->cors.configurationSource(corsConfigurationSource()))
		.authorizeHttpRequests(auth ->{
			auth.anyRequest().authenticated();
		})
		.oauth2Login(oath2 ->{
			oath2.successHandler(oauth2LoginSuccessHandler);


		})
		.build();*/
		
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

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("http://173.255.198.143"); 
		configuration.addAllowedMethod("*"); 
		configuration.addAllowedHeader("*"); 
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new 
		UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}