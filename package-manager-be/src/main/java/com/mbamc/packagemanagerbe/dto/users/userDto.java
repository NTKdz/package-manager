package com.mbamc.packagemanagerbe.dto.users;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class userDto {
    String username;
    String name;
    String department;
    String company;
}
