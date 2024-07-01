package com.mbamc.packagemanagerbe.service;

import com.mbamc.packagemanagerbe.dto.users.UserInfoDto;
import com.mbamc.packagemanagerbe.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;

@Service
public class AuthService {
    private final UserService userService;

    @Autowired
    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public HashMap<String, Object> getTokenFromAuthCode(String code, String clientId,
                                                        String secret, String realmUrl, String callbackUrl) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/x-www-form-urlencoded");

            // Encode clientId and secret for Basic Auth
            String originalInput = clientId + ":" + secret;
            String encodedString = Base64.getEncoder().encodeToString(originalInput.getBytes(StandardCharsets.UTF_8));
            headers.add("Authorization", "Basic " + encodedString);

            // Encode redirect_uri
            String redirectUri = URLEncoder.encode(callbackUrl, StandardCharsets.UTF_8);

            // Prepare request body
            String body = "code=" + URLEncoder.encode(code, StandardCharsets.UTF_8) +
                    "&grant_type=authorization_code" +
                    "&redirect_uri=" + redirectUri +
                    "&scope=openid email profile";

            HttpEntity<String> entity = new HttpEntity<>(body, headers);

            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<HashMap> response = restTemplate.exchange(
                    realmUrl + "protocol/openid-connect/token",
                    HttpMethod.POST,
                    entity,
                    HashMap.class
            );

            HashMap<String, Object> res = response.getBody();
            assert res != null;
            res.put("status", true);
            return res;

        } catch (Exception ex) {
            HashMap<String, Object> res = new HashMap<>();
            res.put("status", false);
            res.put("error", ex.getMessage());
            return res;
        }
    }

    public HashMap<String, Object> getTokenFromRefreshToken(String rfToken, String clientId,
                                String secret, String realmUrl) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/x-www-form-urlencoded");
            String originalInput = clientId + ":" + secret;
            String encodedString = Base64.getEncoder().encodeToString(originalInput.getBytes());
            headers.add("Authorization", "Basic " + encodedString);

            HttpEntity<String> entity = new HttpEntity<>(
                    "refresh_token=" + rfToken + "&grant_type=refresh_token",
                    headers
            );

            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<HashMap> response = restTemplate.exchange(
                    realmUrl + "protocol/openid-connect/token",
                    HttpMethod.POST,
                    entity,
                    HashMap.class
            );

            HashMap<String, Object> res = response.getBody();
            res.put("status", true);
            return res;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            HashMap<String, Object> res = new HashMap<>();
            res.put("status", false);
            return res;
        }
    }


    public UserInfoDto getUserInfo(String username) {
        User user = userService.getUserByUsername(username);
//        if(!user){
//            userService.c
//        }
        return null;
    }
}
