package com.eventheart.api;

import com.eventheart.api.exeptions.ElementNotFoundException;
import com.eventheart.api.exeptions.UsernameNotFoundException;
import com.eventheart.api.exeptions.UsernameUsedException;
import com.eventheart.dao.UserRepository;
import com.eventheart.dto.JwtAuthenticationResponse;
import com.eventheart.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
public class UserApi {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Autowired
    UserRepository userRepository;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestParam("user") String username, @RequestParam("password") String pwd) {

        List<User> users = userRepository.findByName(username.split(",")[0]);
        if(users.size() == 0 || !users.get(0).getPassword().equals(pwd)){
            throw new UsernameNotFoundException("User not found with username: " + username.split(",")[0]);
        }
        String token = getJWTToken(username);
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));

    }

    private String getJWTToken(String username) {
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_USER");

        String token = Jwts
                .builder()
                .setId("eventhearthash")
                .setSubject(username)
                .claim("authorities",
                        grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret.getBytes())
                .compact();

        return "Bearer " + token;
    }

    /**
     * Add new User
     * @param user The new User
     * @return Created User
     */
    @PostMapping(value = "/register")
    public ResponseEntity<?> saveUser(@RequestBody @Valid User user) {
        if(userRepository.existsByName(user.getName())){
            return new ResponseEntity(new UsernameUsedException("Username is already taken!"), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(userRepository.save(user));
    }

    /**
     * Get Logged User Data
     * @return User information with Events
     */
    @GetMapping("/user")
    public User getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        List<User> users = userRepository.findByName(name.split(",")[0]);
        if(users.size() == 0)
            throw new ElementNotFoundException();
        return users.get(0);
    }

    /**
     * Delete a User
     */
    @DeleteMapping("/user")
    public void deleteEvent() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        List<User> users = userRepository.findByName(name.split(",")[0]);
        userRepository.delete(users.get(0));
    }

    /**
     * Get User Data
     * @return User information with Events
     */
    @GetMapping("/user/{id}")
    public String getUser(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            throw new ElementNotFoundException();
        }
        return user.get().getName();
    }
}
