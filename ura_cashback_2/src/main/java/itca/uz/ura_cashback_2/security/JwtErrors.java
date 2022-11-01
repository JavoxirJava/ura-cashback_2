package itca.uz.ura_cashback_2.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtErrors implements AuthenticationEntryPoint {

    public static final Logger logger = LoggerFactory.getLogger(JwtTokenFilter.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        logger.error(authException.getMessage(), "Sizga kirish taqiqlandadi");
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Sizning tokeningiz mavjud emas"+authException.getMessage());
    }
}
