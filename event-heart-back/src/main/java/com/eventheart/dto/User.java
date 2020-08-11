package com.eventheart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

/**
 *
 * @author leonardo
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User implements Serializable {

    private static final long serialVersionUID = 4894729040357835898L;

    @Id
    @GeneratedValue
    Long uid;

    @NotNull
    String name;

    @NotNull
    String password;

    @OneToMany(mappedBy = "idUser", cascade = CascadeType.ALL)
    private Set<Event> events;

}
