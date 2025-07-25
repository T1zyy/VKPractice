package tradehub.backend.util;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tradehub.backend.service.JwtService;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();
        System.out.println("[JwtFilter] Path: " + path);

        if (path.startsWith("/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        System.out.println("[JwtFilter] Authorization Header: " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);
        String userId = jwtService.extractUserId(jwt);

        System.out.println("[JwtFilter] Extracted userId: " + userId);

        if (userId != null) {
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    userId, null, List.of()
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
            System.out.println("[JwtFilter] Authentication set!");
        }

        filterChain.doFilter(request, response);
        System.out.println("[JwtFilter] Authorization: " + request.getHeader("Authorization"));
        System.out.println("[JwtFilter] User ID: " + userId);
        System.out.println("[JwtFilter] Auth set? " + (SecurityContextHolder.getContext().getAuthentication() != null));
    }
}