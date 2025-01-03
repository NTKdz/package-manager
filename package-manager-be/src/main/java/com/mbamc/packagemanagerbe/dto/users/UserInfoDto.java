package com.mbamc.packagemanagerbe.dto.users;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserInfoDto {
    String id_token;
    String access_token;
    String refresh_token;
    String username;
    String displayName;
    String department;
    String role;
    Boolean isFirstTimeLogin;
}
