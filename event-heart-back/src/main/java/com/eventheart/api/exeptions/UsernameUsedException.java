package com.eventheart.api.exeptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "User not found")
public class UsernameUsedException extends RuntimeException {

    public UsernameUsedException() {
        super();
    }

    public UsernameUsedException(String string) {
        super(string);
    }
}