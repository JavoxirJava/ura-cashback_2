package itca.uz.ura_cashback_2.controller;

import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.payload.*;
import itca.uz.ura_cashback_2.repository.AuthRepository;
import itca.uz.ura_cashback_2.service.AuthService;
import itca.uz.ura_cashback_2.utils.AppConstant;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.UUID;

@RestController
@RequestMapping(path = "/api/auth")
@CrossOrigin
public class AuthController {

    final AuthService authService;
    final AuthRepository authRepository;


    public AuthController(AuthService authService, AuthRepository authRepository) {
        this.authService = authService;
        this.authRepository = authRepository;
    }

    @PreAuthorize(value = "hasAnyRole('ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_KASSA')")
    @PostMapping
    public HttpEntity<?> addAuth(@RequestBody AuthDto authDto){
        ApiResponse apiResponse = authService.addOrEditRegisterClient(new User(),authDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

//    @PreAuthorize(value = "hasAnyRole('ROLE_SUPERADMIN', 'ROLE_ADMIN')")
    @PostMapping("/companyAdmin")
    public HttpEntity<?> addCompanyAdmin(@RequestBody AuthDto authDto){
        return ResponseEntity.ok(authService.addOrEditCompanyAdmin(authDto, new User()));
    }

    @PreAuthorize(value = "hasAnyRole('ROLE_SUPERADMIN', 'ROLE_ADMIN')")
    @PostMapping("/companyKassa")
    public HttpEntity<?> addCompanyKassa(@RequestBody AuthDto authDto){
        return ResponseEntity.ok(authService.addOrEditKassa(new User(), authDto));
    }

//    @PreAuthorize(value = "hasAnyRole('ROLE_SUPERADMIN', 'ROLE_ADMIN')")
    @PostMapping("/company/login")
    public HttpEntity<?> loginCompany(@RequestBody ReqLogin reqLogin){
        return ResponseEntity.ok( authService.loginCompany(reqLogin));
    }

    @PreAuthorize(value = "hasAnyRole('ROLE_SUPERADMIN')")
    @PostMapping("/superAdmin/login")
    public HttpEntity<?> loginSuperAdmin(@RequestBody ReqLogin reqLogin){
        return ResponseEntity.ok(authService.loginSuperAdmin(reqLogin));
    }

    @PreAuthorize(value = "hasAnyRole('ROLE_SUPERADMIN', 'ROLE_ADMIN')")
    @PostMapping("/admin/password")
    public HttpEntity<?> passwordEdit(@RequestBody ReqPassword reqPassword){
        return ResponseEntity.ok(authService.editPassword(reqPassword));
    }


    @PreAuthorize(value = "hasAnyRole('ROLE_SUPERADMIN', 'ROLE_ADMIN')")
    @PutMapping("/companyAdmin/{id}")
    public HttpEntity<?> editCompanyAdmin(@PathVariable UUID id, @RequestBody AuthDto authDto){
        User user = authRepository.findById(id).orElseThrow(() -> new ResourceAccessException("getUser"));
        return ResponseEntity.ok(authService.addOrEditCompanyAdmin(authDto, user));
    }

    @PreAuthorize(value = "hasAnyRole('ROLE_SUPERADMIN', 'ROLE_ADMIN')")
    @PutMapping("/companyKassa/{id}")
    public HttpEntity<?> editCompanyKassa(@PathVariable UUID id, @RequestBody AuthDto authDto){
        User user = authRepository.findById(id).orElseThrow(() -> new ResourceAccessException("getUser"));
        return ResponseEntity.ok(authService.addOrEditKassa(user, authDto));
    }

    @PreAuthorize(value = "hasAnyRole('ROLE_SUPERADMIN', 'ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteAuth(@PathVariable UUID id){
        return ResponseEntity.ok(authService.deleteClient(id));
    }


    @PreAuthorize(value = "hasAnyRole('ROLE_SUPERADMIN')")
    @GetMapping
    public HttpEntity<?> getUserPage(@RequestParam(value = "page",defaultValue = AppConstant.DEFAULT_PAGE) int page ,
                                     @RequestParam(value = "size",defaultValue = AppConstant.DEFAULT_SIZE) int size) throws Exception {
        return ResponseEntity.ok(authService.getUserList(page,size));
    }

    @PreAuthorize(value = "hasAnyRole('ROLE_SUPERADMIN', 'ROLE_ADMIN')")
    @GetMapping("/{id}")
    public HttpEntity<?> getOneUser(@PathVariable UUID id) {
        return ResponseEntity.ok(authService.getOneUser(id));
    }



    @PreAuthorize(value = "hasAnyRole('ROLE_SUPERADMIN', 'ROLE_ADMIN')")
    @PutMapping("/active/{id}")
    public HttpEntity<?> activeUser(@PathVariable UUID id){
        return ResponseEntity.ok(authService.activeUser(id));
    }


    @PreAuthorize(value = "hasAnyRole('ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_KASSA')")
    @GetMapping("/order/{phoneNumber}")
    public HttpEntity<?> findByPhoneNumber(@PathVariable String phoneNumber) {
        return ResponseEntity.ok(authService.findByPhoneNumber(phoneNumber));
    }

}