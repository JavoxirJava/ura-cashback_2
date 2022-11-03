package itca.uz.ura_cashback_2.security;

import io.jsonwebtoken.*;
import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;


public class  JwtTokenFilter extends OncePerRequestFilter {

    public static final Logger logger = LoggerFactory.getLogger(JwtErrors.class);

    @Autowired
    AuthService authService;

    @Value("${app.jwtSecretKey}")
    String key;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = request.getHeader("Authorization");
            if(token != null){
                if(tokenValid(token)){
                    String userInToken = getUserInToken(token);
                    User user = authService.getUserByToken(UUID.fromString(userInToken));
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            user.getAuthorities()
                    );
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
        }catch (Exception e){
            System.out.println("xatolik");
        }
        filterChain.doFilter(request,response);
    }

    public String getUserInToken(String token){
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean tokenValid(String token){
        try {
            Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            return true;
        }catch (SignatureException e){
            logger.error("Invalid JWT signature");
        }catch (MalformedJwtException e){
            logger.error("Invalid JWT malformed");
        }catch (ExpiredJwtException e){
            logger.error("Invalid JWT expired");
        }catch (UnsupportedJwtException e){
            logger.error("Invalid JWT unsupported");
        }catch (IllegalArgumentException e){
            logger.error("Invalid is empty");
        }
        return false;
    }
}
