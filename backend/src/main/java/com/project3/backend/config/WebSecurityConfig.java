package com.project3.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import org.springframework.beans.factory.annotation.Autowired;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	String issuerUri = "https://accounts.google.com";


	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		
		/*http.authorizeHttpRequests((requests) -> requests
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

		return http.build();*/

		return http
		.csrf(AbstractHttpConfigurer::disable)
		.cors(cors->cors.configurationSource(corsConfigurationSource()))
		.authorizeHttpRequests(auth ->
			auth.requestMatchers("/menuItems", "/itemCategories").permitAll()
			.requestMatchers(HttpMethod.POST, "/orders").permitAll()
			.requestMatchers(HttpMethod.GET, "/orders").hasAnyAuthority("ROLE_server", "ROLE_manager")
			.requestMatchers("/ingredients", "/itemToIngredient").hasAuthority("ROLE_manager")
			.anyRequest().authenticated()
		)
		.oauth2ResourceServer(oauth2 ->
			oauth2.jwt(jwt ->
				jwt.jwtAuthenticationConverter(MappingJwtGrantedAuthoritiesConverter())
			)
		)
		.build();
		
	}

	@Bean
	JwtDecoder jwtDecoder() {
		NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder)
			JwtDecoders.fromIssuerLocation(issuerUri);

		OAuth2TokenValidator<Jwt> idTokenValidator = googleIdTokenValidator();
		OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuerUri);
		OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, idTokenValidator);

		jwtDecoder.setJwtValidator(withAudience);

		return jwtDecoder;
	}
	OAuth2TokenValidator<Jwt> googleIdTokenValidator() {
		return new GoogleIdTokenValidator();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("https://closedfuture.com"); 
		configuration.addAllowedMethod("*"); 
		configuration.addAllowedHeader("*"); 
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new 
		UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	public Converter<Jwt, ? extends AbstractAuthenticationToken> MappingJwtGrantedAuthoritiesConverter() {
		return new MappingJwtGrantedAuthoritiesConverter();
	}
	
}