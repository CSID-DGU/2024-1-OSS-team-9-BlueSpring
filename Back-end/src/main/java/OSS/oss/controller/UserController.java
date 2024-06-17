package OSS.oss.controller;

import OSS.oss.dto.CustomUserDetails;
import OSS.oss.dto.ResisterDTO;
import OSS.oss.dto.UpdateResponse;
import OSS.oss.entity.User;
import OSS.oss.jwt.JWTUtil;
import OSS.oss.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/users/mypage")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtil jwtUtil;

    // 회원정보 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable String id) {
        User user = userService.getUserProfile(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    // 회원정보 수정
    @PutMapping("/update/{userId}/profile")
    public ResponseEntity<?> updateUserProfile(@PathVariable int userId, @RequestBody ResisterDTO userDTO) { // ResisterDTO 사용

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User updatedUser = userService.updateUserProfile(userId, userDTO);
        if (!userService.validatePassword(userId, userDTO.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }
        if(updatedUser != null) {
            return ResponseEntity.ok(new UpdateResponse("Profile updated successfully", updatedUser));
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    // 관심사 수정
    @PutMapping("/update/{userId}/category")
public ResponseEntity<?> updateUserCategory(@PathVariable int userId, @RequestBody ResisterDTO userDTO) { // ResisterDTO 사용

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User updatedUser = userService.updateUserCategory(userId, userDTO);
        if(updatedUser != null) {
            return ResponseEntity.ok(new UpdateResponse("Category updated successfully", updatedUser));
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

}