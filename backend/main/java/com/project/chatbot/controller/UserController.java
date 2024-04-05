package com.project.chatbot.controller;

import com.project.chatbot.dto.DeleteUserRequest;
import com.project.chatbot.dto.UserResponse;
import com.project.chatbot.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @GetMapping("/user")
    public List<UserResponse> getAllUsers() {

        return userService.getAllUsers();
    }

    @GetMapping("/user/find/{email}")
    public ResponseEntity<UserResponse> getUserByEmail(@PathVariable String email) {
        Optional<UserResponse> userResponseOptional = userService.getUserByEmail(email);
        return userResponseOptional
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/user/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String email) {
        Optional<String> newPasswordOptional = userService.resetUserPasswordByEmail(email);
        if (newPasswordOptional.isPresent()) {
            String newPassword = newPasswordOptional.get();
            return ResponseEntity.ok(newPassword);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/user/delete")
    public ResponseEntity<String> deleteUser(@RequestBody DeleteUserRequest deleteUserRequest) {
        boolean deleted = userService.deleteUserByEmailAndPassword(deleteUserRequest.getEmail(), deleteUserRequest.getPassword());
        if (deleted) {
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete user");
        }
    }

}
