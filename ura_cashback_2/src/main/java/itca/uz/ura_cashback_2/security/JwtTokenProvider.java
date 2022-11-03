package itca.uz.ura_cashback_2.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
public class JwtTokenProvider {

    @Value("${app.jwtSecretKey}")
    String key;

    @Value("${app.jwtExpireInMilSec}")
    long expireDate;

    public String generatedToken(UUID uuid){
        Date expireTime = new Date(new Date().getTime() + expireDate);
        return Jwts
                .builder()
                .setIssuedAt(new Date())
                .setExpiration(expireTime)
                .setSubject(uuid.toString())
                .signWith(SignatureAlgorithm.HS512,key)
                .compact();
    }
}
