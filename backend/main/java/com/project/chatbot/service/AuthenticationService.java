package com.project.chatbot.service;

import com.project.chatbot.dto.AuthenticationRequest;
import com.project.chatbot.dto.AuthenticationResponse;
import com.project.chatbot.dto.RegisterRequest;
import com.project.chatbot.entity.User;
import com.project.chatbot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        var user = User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phone_number(registerRequest.getPhone_number())
                .created(LocalDate.now())
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Incorrect password. Authentication failed.", e);
        } catch (UsernameNotFoundException e) {
            throw new RuntimeException("User with username " + username + " not found.", e);
        } catch (LockedException e) {
            throw new RuntimeException("User account is locked. Please contact support.", e);
        } catch (DisabledException e) {
            throw new RuntimeException("User account is disabled.", e);
        } catch (AuthenticationException e) {
            throw new RuntimeException("Authentication failed.", e);
        }
        var user = userRepository.findUserByUsername(authenticationRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found."));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
