package itca.uz.ura_cashback_2.controller;

import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.payload.ApiResponse;
import itca.uz.ura_cashback_2.payload.AuthDto;
import itca.uz.ura_cashback_2.payload.ReqLogin;
import itca.uz.ura_cashback_2.repository.AuthRepository;
import itca.uz.ura_cashback_2.security.JwtTokenProvider;
import itca.uz.ura_cashback_2.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.UUID;

@RestController
@RequestMapping(path = "/api/auth")
@CrossOrigin

public class AuthController {

    final
    AuthService authService;
    final
    AuthRepository authRepository;
    final
    JwtTokenProvider jwtTokenProvider;
    final
    AuthenticationManager authenticationManager;

    public AuthController(AuthService authService, AuthRepository authRepository, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.authRepository = authRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping
    public HttpEntity<?> addAuth(@RequestBody AuthDto authDto){
        ApiResponse apiResponse = authService.addOrEditRegisterClient(new User(), authDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }


    @PutMapping("/{id}")
    public HttpEntity<?> editAuth(@PathVariable UUID id, @RequestBody AuthDto authDto){
        User user = authRepository.findById(id).orElseThrow(() -> new ResourceAccessException("getUser"));
        ApiResponse apiResponse = authService.addOrEditRegisterClient(user, authDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteAuth(@PathVariable UUID id){
        return ResponseEntity.ok(authService.deleteClient(id));
    }


//    @GetMapping("/list")
//    public HttpEntity<?> getUserPage(@RequestParam(value = "page",defaultValue = AppConstant.DEFAULT_PAGE) int page,
//                                     @RequestParam(value = "size",defaultValue = AppConstant.DEFAULT_SIZE) int size,
//                                     @CurrentUser User user) throws Exception {
//        return ResponseEntity.ok(authService.getUserList(page,size,user));
//    }

    @GetMapping("/list")
    public HttpEntity<?> getUser(){
        return ResponseEntity.ok(authService.getUser());
    }

    @PostMapping("/login")
    public HttpEntity<?>  login(@RequestBody ReqLogin reqLogin){
        User user = authRepository.findByPhoneNumberEquals(reqLogin.getPhoneNumber()).orElseThrow(() -> new ResourceAccessException("getUser"));
        String generatedToken = jwtTokenProvider.generatedToken(user.getId());
        return ResponseEntity.ok(generatedToken);
    }

    @PostMapping("/checkUser")
    public HttpEntity<?>  checkUser(@RequestBody ReqLogin reqLogin){
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(reqLogin.getPhoneNumber(), reqLogin.getPassword()));
        User user = (User) authenticate.getPrincipal();
        return ResponseEntity.ok(new ReqLogin(user.getPhoneNumber(), user.getPassword()));
    }

    @PutMapping("/active/{id}")
    public HttpEntity<?> activeUser(@PathVariable UUID id){
        return ResponseEntity.ok(authService.activeUser(id));
    }

}
