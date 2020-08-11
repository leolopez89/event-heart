package com.eventheart.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

/**
 *
 * @author leonardo
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Event implements Serializable {

    private static final long serialVersionUID = 4894729030347835898L;

    @Id
    @GeneratedValue
    Long uid;

    @NotNull
    String name;

    @NotNull
    String description;

    Date created;

    @NotNull
    Date execution;

    @NotNull
    boolean enabled;

    @NotNull
    Double price;

    @ManyToOne
    @JoinColumn
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="categoryId")
    @JsonIdentityReference(alwaysAsId=true)
    Category idCategory;

    @ManyToOne
    @JoinColumn
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="uid")
    @JsonIdentityReference(alwaysAsId=true)
    User idUser;

    @PrePersist
    void created() {
        this.created = new Date();
    }
}
