package com.example.thd_test.model.relations;

import com.example.thd_test.model.date.Date;
import com.example.thd_test.model.game.Developer;
import com.example.thd_test.model.game.Game;
import com.example.thd_test.model.game.Publisher;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@Table(name = "released_games")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class ReleasedGame {
    @Id
    @GeneratedValue
    @Column(name = "released_game_id")
    private Long id;
    @OneToOne
    @JsonIdentityReference(alwaysAsId = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "game_id")
    private Game game;
    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "dev_id")
    private Developer developer;
    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "pub_id")
    private Publisher publisher;
    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "date_id")
    private Date date;
}
