package com.project3.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import com.project3.backend.service.UserServiceImpl;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;
import java.util.stream.Collectors;

public class MappingJwtGrantedAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
    private String authoritiesClaimName = "email";
    private String authorityPrefix = "ROLE_";
    private Logger logger = Logger.getLogger(MappingJwtGrantedAuthoritiesConverter.class.getName());
    private FileHandler fh;

    private final UserServiceImpl userServiceImpl = new UserServiceImpl();

    @Override
    public Collection<GrantedAuthority> convert(Jwt source) {
        try 
        {
            fh = new FileHandler("MappingJwtGrantedAuthoritiesConverter.log");
            logger.addHandler(fh);
            SimpleFormatter formatter = new SimpleFormatter();
            fh.setFormatter(formatter);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        logger.info(source.getClaims().toString());
        Collection<String> tokenScopes = parseScopesClaim(source);
        if (tokenScopes.isEmpty()) {
            return Collections.emptyList();
        }
        
        return tokenScopes.stream()
          .map(this.userServiceImpl::fetchRole)
          .map(s -> this.authorityPrefix + s)
          .map(SimpleGrantedAuthority::new)
          .collect(Collectors.toCollection(HashSet::new));
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
