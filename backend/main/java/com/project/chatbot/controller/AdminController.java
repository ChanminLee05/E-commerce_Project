package com.project.chatbot.controller;

import com.project.chatbot.dto.DeleteUserRequest;
import com.project.chatbot.dto.AdminResponse;
import com.project.chatbot.service.AdminService;
import com.project.chatbot.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final AdminService adminService;

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('admin:read')")
    public List<AdminResponse> getAllUsers() {

        return adminService.getAllUsers();
    }

    @GetMapping("/admin/find")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<AdminResponse> getUserByEmail(@RequestParam String email) {
        Optional<AdminResponse> userResponseOptional = adminService.getUserDetailByEmail(email);
        return userResponseOptional
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/delete")
    @PreAuthorize("hasAuthority('admin:delete')")
    public ResponseEntity<String> deleteUser(@RequestBody DeleteUserRequest deleteUserRequest) {
        boolean deleted = adminService.deleteUserByEmail(deleteUserRequest.getEmail());
        if (deleted) {
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete user");
        }
    }
}
