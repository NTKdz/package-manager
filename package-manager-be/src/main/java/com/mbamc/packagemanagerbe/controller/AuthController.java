package com.mbamc.packagemanagerbe.controller;

import com.mbamc.packagemanagerbe.dto.users.UserInfoDto;
import com.mbamc.packagemanagerbe.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/sso/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/user")
    public ResponseEntity<UserInfoDto> getUserInfo(
            @RequestParam(value = "code") String code,
            @RequestParam(value = "clientId") String clientId,
            @RequestParam(value = "realmUrl") String realmUrl,
            @RequestParam(value = "callbackUrl") String callbackUrl) {
        Map<String, Object> res = authService.getTokenFromAuthCode(code, clientId, "t7lYljTN1a7OPRo7rqyEuudc6D2C3LcT", realmUrl, callbackUrl);
        System.out.println(res);
        UserInfoDto userInfoDto = new UserInfoDto();

        if (res != null && (boolean) res.get("status")) {
            userInfoDto.setAccess_token((String) res.get("access_token"));
            userInfoDto.setRefresh_token((String) res.get("refresh_token"));

//            // Assuming you want to extract username and displayName from the token or the response.
//            // Adjust this according to where you store these values.
//            userInfoDto.setUsername((String) res.get("preferred_username"));
//            userInfoDto.setDisplayName((String) res.get("name"));
//
//            // If the roles are stored in a nested map or a specific structure, you might need to adjust the following code.
//            Map<String, Object> resourceAccess = (Map<String, Object>) res.get("resource_access");
//            if (resourceAccess != null) {
//                Map<String, Object> clientAccess = (Map<String, Object>) resourceAccess.get(clientId);
//                if (clientAccess != null) {
//                    List<String> roles = (List<String>) clientAccess.get("roles");
//                    if (roles != null && !roles.isEmpty()) {
//                        userInfoDto.setRole(roles.get(0));  // Setting the first role as an example
//                    }
//                }
//            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        System.out.println(userInfoDto);
        return ResponseEntity.ok(userInfoDto);
    }
}
