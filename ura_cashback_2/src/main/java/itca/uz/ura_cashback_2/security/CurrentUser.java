package itca.uz.ura_cashback_2.security;


import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.lang.annotation.*;




@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE,ElementType.PARAMETER})
@Documented

@AuthenticationPrincipal
public @interface CurrentUser {

}
