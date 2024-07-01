package com.mbamc.packagemanagerbe.controller;

import com.google.gson.Gson;
import com.mbamc.packagemanagerbe.converter.UserConverter;
import com.mbamc.packagemanagerbe.dto.tables.UserDto;
import com.mbamc.packagemanagerbe.dto.users.UserInfoDto;
import com.mbamc.packagemanagerbe.model.User;
import com.mbamc.packagemanagerbe.request.LoginRequestDto;
import com.mbamc.packagemanagerbe.request.RefreshRequestDto;
import com.mbamc.packagemanagerbe.service.AuthService;
import com.mbamc.packagemanagerbe.service.UserService;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/sso/auth")
public class AuthController {
    private final AuthService authService;
    private final UserService userService;
    @Value("${secret.token}")
    private String secret;

    @Autowired
    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/user")
    public ResponseEntity<UserInfoDto> getUserInfo(
            @RequestBody LoginRequestDto loginRequestDto) {
        Map<String, Object> res = authService.getTokenFromAuthCode(loginRequestDto.getCode(),
                loginRequestDto.getClientId(),
                secret,
                loginRequestDto.getRealmUrl(),
                loginRequestDto.getCallbackUrl());
        System.out.println(res);

        if (res != null && (boolean) res.get("status")) {
            return ResponseEntity.ok(getDataUser((String) res.get("id_token"),
                    (String) res.get("access_token"),
                    (String) res.get("refresh_token")));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @PostMapping("/refresh")
    public ResponseEntity<Object> refreshTokenApp(@RequestBody RefreshRequestDto refreshRequestDto) {
        Map<String, Object> res = authService.getTokenFromRefreshToken(refreshRequestDto.getRfToken(),
                refreshRequestDto.getClientId(),
                secret,
                refreshRequestDto.getRealmUrl());
        return ResponseEntity.ok(res);
    }

    UserInfoDto getDataUser(String idToken, String accessToken, String rfToken) {
        try {
            String[] split_string = accessToken.split("\\.");
            String base64EncodedBody = split_string[1];
            Base64 base64Url = new Base64(true);
            String body = new String(base64Url.decode(base64EncodedBody));

            Gson gson = new Gson();
            Map claims = gson.fromJson(body, Map.class);

            UserInfoDto userInfoDto = new UserInfoDto();

            String username = claims.get("preferred_username").toString();

            User user = userService.getUserByUsername(username);
            boolean firstTimeLogin = false;
            String department = "none";
            if (user == null) {
                UserDto userDto = new UserDto();
                userDto.setName(claims.get("name").toString());
                userDto.setUsername(claims.get("preferred_username").toString());
                userDto.setCompany("MBAMC");
                userDto.setDepartment(null);
                if (userService.createUser(userDto) == null) {
                    throw new RuntimeException("Failed to create a new user");
                }
                firstTimeLogin = true;
            } else {
                department = user.getDepartment();
            }

            String roles = null;
            try {
                roles = getNestedValue(claims, "resource_access", "package-manager", "roles").toString();
                System.out.println(roles);
            } catch (Exception e) {
                roles = "[reader]";
            }

            userInfoDto.setUsername(username);
            userInfoDto.setDisplayName(claims.get("name").toString());
            userInfoDto.setDepartment(department);
            userInfoDto.setRole(roles);
            userInfoDto.setId_token(idToken);
            userInfoDto.setAccess_token(accessToken);
            userInfoDto.setRefresh_token(rfToken);
            userInfoDto.setIsFirstTimeLogin(firstTimeLogin);
            return userInfoDto;
        } catch (Exception ex) {
            return null;
        }
    }

    public static <T> T getNestedValue(Map map, String... keys) {
        Object value = map;

        for (String key : keys) {
            value = ((Map) value).get(key);
        }

        return (T) value;
    }

}
