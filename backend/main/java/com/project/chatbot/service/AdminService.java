package com.project.chatbot.service;

import com.project.chatbot.dto.AdminResponse;
import com.project.chatbot.entity.Role;
import com.project.chatbot.entity.RoleType;
import com.project.chatbot.entity.User;
import com.project.chatbot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;

    public List<AdminResponse> getAllUsers() {
        // Retrieve all users
        List<User> users = userRepository.findAll();

        // Convert users to UserResponse DTOs
        return users.stream()
                .map(this::mapToAdminResponse)
                .collect(Collectors.toList());
    }

    public Optional<AdminResponse> getUserDetailByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        return userOptional.map(this::mapToAdminResponse);
    }

    public boolean deleteUserByEmail(String email) {

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userRepository.deleteByEmail(email);
            return true;
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    private AdminResponse mapToAdminResponse(User user) {
        Set<RoleType> roleTypes = user.getRoles().stream()
                .map(Role::getRoleType)
                .collect(Collectors.toSet());

        return AdminResponse.builder()
                .user_id(user.getUser_id())
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPassword())
                .phone_number(user.getPhone_number())
                .created(user.getCreated())
                .roles(roleTypes)
                .build();
    }

}
