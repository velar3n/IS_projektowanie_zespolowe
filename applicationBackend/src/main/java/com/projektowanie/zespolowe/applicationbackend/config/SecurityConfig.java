package com.projektowanie.zespolowe.applicationbackend.config;

import com.projektowanie.zespolowe.applicationbackend.services.UserService;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.session.security.web.authentication.SpringSessionRememberMeServices;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserService userService;

    public SecurityConfig(UserService userService) {
        this.userService = userService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource)
            throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(CsrfConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.NEVER))
                .rememberMe(rememberMe -> rememberMe.rememberMeServices(rememberMeServices()))
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()
                // .requestMatchers("/login", "/register", "/registerAdmin").permitAll()
                // .requestMatchers("/user", "/user/**").authenticated()
                // .requestMatchers("/users").hasRole("ADMIN")
                // .requestMatchers("/testSession").authenticated()
                // .requestMatchers(HttpMethod.POST, "/surveys").hasRole("ADMIN")//
                // .requestMatchers(HttpMethod.GET, "/surveys").hasRole("USER")// Temporary
                // endpoint for session POC
                ).logout(logout -> logout
                        .logoutUrl("/logout")
                        .invalidateHttpSession(true)
                        .deleteCookies("sessionId")
                        .logoutSuccessHandler((request, response, auth) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                        }));

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(authenticationProvider);
    }

    @Bean
    public SpringSessionRememberMeServices rememberMeServices() {
        SpringSessionRememberMeServices rememberMeServices = new SpringSessionRememberMeServices();
        rememberMeServices.setAlwaysRemember(true);
        return rememberMeServices;
    }
}