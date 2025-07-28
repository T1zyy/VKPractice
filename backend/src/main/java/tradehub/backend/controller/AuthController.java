package tradehub.backend.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tradehub.backend.entity.UserEntity;
import tradehub.backend.model.user.CreateUser;
import tradehub.backend.service.JwtService;
import tradehub.backend.service.UserService;
import org.springframework.web.bind.annotation.RequestHeader;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody CreateUser profile) {
        String vkUserId = String.valueOf(profile.getId());
        if (vkUserId == null) return ResponseEntity.badRequest().build();

        Optional<UserEntity> existingUserOpt = userService.findUserById(profile.getId());
        if (existingUserOpt.isEmpty()) {
            userService.saveUser(profile);
        }

        String accessToken = jwtService.generateToken(vkUserId);
        String refreshToken = jwtService.generateRefreshToken(vkUserId);

        return ResponseEntity.ok(Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken
        ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String refreshToken = authHeader.substring(7);

        if (!jwtService.isTokenValid(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }

        String userId = jwtService.extractUserId(refreshToken);
        String newAccessToken = jwtService.generateToken(userId);
        String newRefreshToken = jwtService.generateRefreshToken(userId);

        return ResponseEntity.ok(Map.of(
                "accessToken", newAccessToken,
                "refreshToken", newRefreshToken
        ));
    }
}