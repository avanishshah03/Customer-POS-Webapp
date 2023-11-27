package com.project3.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import com.project3.backend.service.UserServiceImpl;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.stream.Collectors;

@Component
public class MappingJwtGrantedAuthoritiesConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    private String authoritiesClaimName = "email";
    private String authorityPrefix = "ROLE_";

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Override
    public AbstractAuthenticationToken convert(Jwt source) {
        Collection<String> tokenScopes = parseScopesClaim(source);
        Collection<GrantedAuthority> authorities;
        if (tokenScopes.isEmpty()) {
            authorities = Collections.emptyList();
        }
        
        authorities = tokenScopes.stream()
          .map(this.userServiceImpl::fetchRole)
          .map(s -> this.authorityPrefix + s)
          .map(SimpleGrantedAuthority::new)
          .collect(Collectors.toCollection(HashSet::new));
        return new JwtAuthenticationToken(source, authorities);
    }

    private Collection<String> parseScopesClaim(Jwt jwt) {
        Object scopesAsObject = jwt.getClaims().get(this.authoritiesClaimName);
        if (scopesAsObject instanceof String) {
            return Arrays.asList(((String) scopesAsObject).split(" "));
        }
        if (scopesAsObject instanceof Collection) {
            return (Collection<String>) scopesAsObject;
        }
        return Collections.emptyList();
    }

}
