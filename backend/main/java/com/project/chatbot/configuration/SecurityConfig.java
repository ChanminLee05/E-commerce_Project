package com.project.chatbot.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.project.chatbot.entity.Permission.*;
import static com.project.chatbot.entity.RoleType.ADMIN;
import static com.project.chatbot.entity.RoleType.USER;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .exceptionHandling(ex -> ex.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/chatbot").permitAll()
                        .requestMatchers("/chatbot/**").permitAll()
                        .requestMatchers("/chatbot/register").permitAll()
                        .requestMatchers("/chatbot/authenticate").permitAll()

                        .requestMatchers("/chatbot/admin/**").hasRole(ADMIN.name())
                        .requestMatchers(HttpMethod.GET,"/chatbot/admin").hasAuthority(ADMIN_READ.name())
                        .requestMatchers(HttpMethod.GET,"/chatbot/admin/find").hasAuthority(ADMIN_READ.name())
                        .requestMatchers(HttpMethod.DELETE,"/chatbot/admin/delete").hasAuthority(ADMIN_DELETE.name())

                        .requestMatchers("/chatbot/user/**").hasAnyRole(ADMIN.name(), USER.name())
                        .requestMatchers(HttpMethod.GET,"/chatbot/user/find").hasAnyAuthority(ADMIN_READ.name(), USER_READ.name())
                        .requestMatchers(HttpMethod.PUT,"/user/reset-password").hasAnyAuthority(ADMIN_UPDATE.name(), USER_UPDATE.name())
                        .requestMatchers(HttpMethod.DELETE,"/chatbot/user/delete").hasAnyAuthority(ADMIN_DELETE.name(), USER_DELETE.name())

                        .requestMatchers("/product").permitAll()
                        .requestMatchers("/product/**").permitAll()

                        .requestMatchers("/category").permitAll()
                        .requestMatchers("/category/**").permitAll()

                        .requestMatchers("/user/cart").hasAnyRole(ADMIN.name(), USER.name())
                        .requestMatchers(HttpMethod.GET,"/chatbot/cart").hasAnyAuthority(ADMIN_READ.name(), USER_READ.name())
                        .requestMatchers(HttpMethod.GET,"/chatbot/cart/user").hasAnyAuthority(ADMIN_READ.name(), USER_READ.name())
                        .requestMatchers(HttpMethod.POST,"/chatbot/cart/add").hasAnyAuthority(ADMIN_POST.name(), USER_POST.name())
                        .anyRequest().authenticated());

        return http.build();
    }

}
