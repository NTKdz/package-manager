package com.mbamc.packagemanagerbe.dto.users;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserInfoDto {
    String access_token;
    String refresh_token;
    String username;
    String displayName;
    String role;
}
