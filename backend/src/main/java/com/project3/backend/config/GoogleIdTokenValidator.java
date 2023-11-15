package com.project3.backend.config;

import org.springframework.security.oauth2.client.http.OAuth2ErrorResponseErrorHandler;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2Token;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;

import com.fasterxml.jackson.core.JsonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.http.HttpTransport;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;


import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.*;

/**
 * JwtTokenValidator
 */
public class GoogleIdTokenValidator implements OAuth2TokenValidator {

    OAuth2Error error = new OAuth2Error("custom_code", "Custom error message", null);
    GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
    .setAudience(Collections.singletonList("92522781514-n0k71ngp0e7efn0tptb2cp4p6ktgmbje.apps.googleusercontent.com"))
        // Or, if multiple clients access the backend:
        //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
    .build();
    
    @Override
    public OAuth2TokenValidatorResult validate(OAuth2Token token) {
        // (Receive idTokenString by HTTPS POST)

        String idTokenString = token.getTokenValue();
        GoogleIdToken idToken;
        try {
            idToken = verifier.verify(idTokenString);
        } catch (GeneralSecurityException | IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            idToken = null;
        }
        if (idToken != null) {
            return OAuth2TokenValidatorResult.success();
 
        }
        return OAuth2TokenValidatorResult.failure();
    }
    
}