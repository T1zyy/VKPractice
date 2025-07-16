package tradehub.backend.controller;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tradehub.backend.entity.UserEntity;
import tradehub.backend.service.JwtService;
import tradehub.backend.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserEntity profile) {
        String vkUserId = String.valueOf(profile.getId());

        if (vkUserId == null) return ResponseEntity.badRequest().build();

        userService.saveUser(profile);

        String token = jwtService.generateToken(vkUserId);
        return ResponseEntity.ok(token);
    }
}