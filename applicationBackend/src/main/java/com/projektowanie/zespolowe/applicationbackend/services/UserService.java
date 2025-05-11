package com.projektowanie.zespolowe.applicationbackend.services;

import com.projektowanie.zespolowe.applicationbackend.data.model.Authority;
import com.projektowanie.zespolowe.applicationbackend.data.model.User;
import com.projektowanie.zespolowe.applicationbackend.data.model.UserInformation;
import com.projektowanie.zespolowe.applicationbackend.data.model.UserInformation.Status;
import com.projektowanie.zespolowe.applicationbackend.data.model.AuthorityRepository;
import com.projektowanie.zespolowe.applicationbackend.data.model.UserInformationRepository;
import com.projektowanie.zespolowe.applicationbackend.data.model.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final UserInformationRepository userInformationRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Set<SimpleGrantedAuthority> authorities = user.getAuthorities().stream()
                .map(auth -> new SimpleGrantedAuthority(auth.getAuthority()))
                .collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.isEnabled(),
                true, true, true,
                authorities
        );
    }

    @Transactional
    public User createUser(String username, String password, Set<String> roles, String email) {
        // Create new User entity
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEnabled(true);

        // Create UserInformation with default values
        UserInformation userInformation = new UserInformation();
        userInformation.setUsername(username);
        userInformation.setEmail(email);
        userInformation.setCreatedAt(LocalDateTime.now());
        userInformation.setLastLogin(LocalDateTime.now());
        userInformation.setStatus(Status.ACTIVE);
        userInformation.setUser(user);

        // Set relationships
        user.setUserInformation(userInformation);

        // Create authorities
        Set<Authority> authorities = roles.stream()
                .map(role -> new Authority(username, role, user))
                .collect(Collectors.toSet());

        user.setAuthorities(authorities);

        // Save everything using repositories
        userRepository.save(user);
        userInformationRepository.save(userInformation);
        authorityRepository.saveAll(authorities);

        return user;
    }

    public User getUserByUsername(String username) {
        return userRepository.findById(username).orElse(null);
    }

    public UserInformation getUserInformationByUsername(String username) {
        return userInformationRepository.findById(username).orElse(null);
    }

    public List<UserInformation> getAllUsersInformation() {
        return userInformationRepository.findAll();
    }

    public List<String> getUserAuthorities(String username) {
        return userRepository.findById(username)
                .map(user -> user.getAuthorities().stream()
                        .map(Authority::getAuthority)
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
    }

}
