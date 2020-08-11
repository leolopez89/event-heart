package com.eventheart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
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
public class Category implements Serializable {

    private static final long serialVersionUID = 4894729030347835498L;

    @Id
    @GeneratedValue
    Long categoryId;

    @NotNull(message = "Name is required")
    String name;

    @OneToMany(mappedBy = "idCategory", cascade = CascadeType.ALL)
    private Set<Event> events;
}
