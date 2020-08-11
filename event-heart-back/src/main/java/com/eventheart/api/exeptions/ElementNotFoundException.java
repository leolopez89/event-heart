package com.eventheart.api.exeptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author leonardo
 */
@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Element not found")
public class ElementNotFoundException extends RuntimeException {

    public ElementNotFoundException() {
        super();
    }

    public ElementNotFoundException(String string) {
        super(string);
    }
}
