package com.mbamc.packagemanagerbe.dto.users;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserUpdateDto {
    String username;
    String department;
}
