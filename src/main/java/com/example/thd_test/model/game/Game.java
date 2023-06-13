package com.example.thd_test.model.game;

import com.example.thd_test.model.relations.ReleasedGame;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "games")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Game {
    @Id
    @GeneratedValue
    @Column(name = "game_id")
    private Long id;
    private String gameTitle;
    private String genre;
    private int score;
    @ManyToOne
    @JoinColumn(name = "min_req_id")
    @JsonIdentityReference(alwaysAsId = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private SystemRequirement minReq;
    @ManyToOne
    @JoinColumn(name = "rec_req_id")
    @JsonIdentityReference(alwaysAsId = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private SystemRequirement recReq;

    @OneToOne(mappedBy = "game")
    @JsonIgnore
    private ReleasedGame release;
}
