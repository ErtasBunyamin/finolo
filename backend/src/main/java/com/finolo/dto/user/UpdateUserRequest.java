package com.finolo.dto.user;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String password;
    private String businessName;
    private String themePreference;
}
