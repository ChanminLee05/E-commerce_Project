package com.project.chatbot.controller;

import com.project.chatbot.dto.AuthenticationRequest;
import com.project.chatbot.dto.AuthenticationResponse;
import com.project.chatbot.dto.RegisterRequest;
import com.project.chatbot.entity.User;
import com.project.chatbot.repository.UserRepository;
import com.project.chatbot.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already registered");
        } else if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("User Name is already registered");
        } else if (userRepository.existsByPhone_number(registerRequest.getPhone_number())) {
            return ResponseEntity.badRequest().body("Phone number is already registered");
        }
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) {
        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                AuthenticationResponse authenticationResponse = authenticationService.authenticate(authenticationRequest);
                return ResponseEntity.ok(authenticationResponse);
            }
        }

        // If the username or password is incorrect, return unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


}
