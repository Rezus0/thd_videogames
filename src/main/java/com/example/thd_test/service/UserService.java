package com.example.thd_test.service;

import com.example.thd_test.dto.game.GameDTO;
import com.example.thd_test.dto.user.UserDTO;
import com.example.thd_test.model.Store;
import com.example.thd_test.model.game.Game;
import com.example.thd_test.model.relations.SoldGame;
import com.example.thd_test.model.user.Purchase;
import com.example.thd_test.model.user.User;
import com.example.thd_test.model.user.UserGameData;
import com.example.thd_test.repos.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final TimeService timeService;
    @PersistenceContext
    private final EntityManager entityManager;

    public List<User> findAllUsers() {
        Sort byId = Sort.by(Sort.Direction.ASC, "id");
        return userRepository.findAll(byId);
    }

    public List<User> findByParams(
            String nickname, Double balance, Long regTimeId,
            String country, Integer gameDataLevel, Double gameDataPlaytime,
            String storeTitle, Double price, String genre
    ) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<User> query = cb.createQuery(User.class);
        Root<Purchase> subRoot = query.from(Purchase.class);
        Join<Purchase, User> userJoin = subRoot.join("user", JoinType.RIGHT);
        Join<Purchase, SoldGame> soldGameJoin = subRoot.join("soldGame", JoinType.LEFT);
        Join<SoldGame, Store> storeJoin = soldGameJoin.join("store", JoinType.LEFT);
        Join<SoldGame, Game> gameJoin = soldGameJoin.join("game", JoinType.LEFT);
        Join<User, UserGameData> gameDataJoin = userJoin.join("gameDataList", JoinType.LEFT);
        List<Predicate> predicates = new ArrayList<>();
        if (nickname != null) {
            predicates.add(cb.equal(userJoin.get("nickname"), nickname));
        }
        if (balance != null) {
            predicates.add(cb.equal(userJoin.get("balance"), balance));
        }
        if (regTimeId != null) {
            predicates.add(cb.equal(userJoin.get("regTime"), regTimeId));
        }
        if (country != null) {
            predicates.add(cb.equal(userJoin.get("country"), country));
        }
        if (gameDataLevel != null) {
            predicates.add(cb.equal(gameDataJoin.get("level"), gameDataLevel));
        }
        if (gameDataPlaytime != null) {
            predicates.add(cb.equal(gameDataJoin.get("playtime"), gameDataPlaytime));
        }
        if (storeTitle != null) {
            predicates.add(cb.equal(storeJoin.get("storeTitle"), storeTitle));
        }
        if (price != null) {
            predicates.add(cb.equal(soldGameJoin.get("price"), price));
        }
        if (genre != null) {
            predicates.add(cb.equal(gameJoin.get("genre"), genre));
        }
        query.select(userJoin).where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(userJoin.get("id")));
        return entityManager.createQuery(query).getResultList();
    }

    public void save(UserDTO userDTO) {
        User user = User.builder()
                .nickname(userDTO.nickname())
                .balance(userDTO.balance())
                .regTime(timeService.getTime(userDTO.regTimeId()))
                .country(userDTO.country())
                .build();
        userRepository.save(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public void update(Long id, UserDTO userDTO) {
        User user = getUser(id);
        user.setNickname(userDTO.nickname());
        user.setBalance(userDTO.balance());
        user.setRegTime(timeService.getTime(userDTO.regTimeId()));
        user.setCountry(userDTO.country());
        userRepository.save(user);
    }
}
