package com.mbamc.packagemanagerbe.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class RefreshRequestDto {
    String rfToken;
    String clientId;
    String realmUrl;
    String callbackUrl;
}
