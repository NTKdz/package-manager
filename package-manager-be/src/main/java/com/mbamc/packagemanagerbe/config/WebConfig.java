package com.mbamc.packagemanagerbe.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig  implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://127.0.0.1:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
//"iat": 1718091765,
//        "auth_time": 1718089908,
//        "jti": "3dc91866-30f0-4120-8f76-0e149abc3d8d",
//        "iss": "https://uatsso.mbamc.com.vn/realms/demo",
//        "aud": "account",
//        "sub": "f2f72f0d-313b-49f6-b821-fa889a660284",
//        "typ": "Bearer",
//        "azp": "SuperAppWeb",
//        "session_state": "66bde213-6214-4273-acfb-d28e5d72033a",
//        "acr": "0",
//        "allowed-origins": [
//        "*"
//        ],
//        "realm_access": {
//        "roles": [
//        "offline_access",
//        "uma_authorization",
//        "default-roles-demo"
//        ]
//        },
//        "resource_access": {
//        "SuperAppWeb": {
//        "roles": [
//        "admin"
//        ]
//        },
//        "account": {
//        "roles": [
//        "manage-account",
//        "manage-account-links",
//        "view-profile"
//        ]
//        }
//        },
//        "scope": "openid email profile",
//        "sid": "66bde213-6214-4273-acfb-d28e5d72033a",
//        "email_verified": false,
//        "name": "OS Nguyen The Khoi",
//        "preferred_username": "os.khoint",
//        "given_name": "OS Nguyen The Khoi"
//        }
