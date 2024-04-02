package com.project.chatbot.service;

import com.project.chatbot.dto.DeleteUserRequest;
import com.project.chatbot.entity.User;
import com.project.chatbot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public List<User> getAllUser() {
        return userRepository.findAllUsers();
    }

    public Optional<String> getUserByEmail(String email) {
        if (userRepository.existsByEmail(email)) {
            return userRepository.findByEmail(email)
                    .map(User::getUsername);
        }
        return Optional.empty();
    }

    public boolean deleteUserByEmailAndPassword(String email, String password) {

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                userRepository.deleteByEmail(email);
                return true;
            } else {
                throw new IllegalArgumentException("Incorrect password");
            }
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    public List<User> getUserById(UUID userId) {
        if (userId != null) {
            return userRepository.findUserById(userId);
        }
        return null;
    }

    public Optional<String> resetUserPasswordByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            String newPassword = generateNewPassword();

            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

            sendNewPasswordToEmail(email, newPassword);

            return Optional.of(newPassword);

        } else {
            System.out.println("User with the provided email does not exist");
            return Optional.empty();

        }
    }

    private void sendNewPasswordToEmail(String email, String newPassword) {
        String subject = "Password Reset Successful";
        String body = "Your Password has been successfully rest. Your new password is: " + newPassword;
        emailService.sendEmail(email, subject, body);
    }

    private String generateNewPassword() {
        String upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String specialCharacters = "!@#$%&*?";

        String allCharacters = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters;

        StringBuilder password = new StringBuilder();
        Random random = new Random();

        boolean hasNumber = false;
        boolean hasSpecialCharacter = false;
        while (password.length() < 8 || !hasNumber || !hasSpecialCharacter) {
            password.setLength(0);

            for (int i = 0; i < 12; i++) {
                password.append(allCharacters.charAt(random.nextInt(allCharacters.length())));
            }

            // Check if the password contains at least one number
            hasNumber = password.toString().matches(".*\\d.*");

            // Check if the password contains at least one special character
            hasSpecialCharacter = password.toString().matches(".*[" + Pattern.quote(specialCharacters) + "].*");
        }
        return password.toString();
    }
}
