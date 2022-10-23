package itca.uz.ura_cashback_2.companent;


import itca.uz.ura_cashback_2.entity.CompanyUserRole;
import itca.uz.ura_cashback_2.entity.Role;
import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.entity.enums.RoleName;
import itca.uz.ura_cashback_2.repository.AuthRepository;
import itca.uz.ura_cashback_2.repository.CompanyRepository;
import itca.uz.ura_cashback_2.repository.CompanyUserRoleRepository;
import itca.uz.ura_cashback_2.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashSet;

@Component
public class Dataloader implements CommandLineRunner {
    final RoleRepository roleRepository;
    final
    AuthRepository authRepository;
    final
    CompanyUserRoleRepository companyUserRoleRepository;
    @Autowired
    CompanyRepository companyRepository;


//    @Value("${spring.sql.init.mode}")
    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String initMode;

    public Dataloader(RoleRepository roleRepository, AuthRepository authRepository, CompanyUserRoleRepository companyUserRoleRepository) {
        this.roleRepository = roleRepository;
        this.authRepository = authRepository;
        this.companyUserRoleRepository = companyUserRoleRepository;
    }

    @Override
    public void run(String... args) {
        if (initMode.equals("create-drop") || initMode.equals("create")) {
            roleRepository.save(new Role(RoleName.ROLE_USER));
            roleRepository.save(new Role(RoleName.ROLE_KASSA));
            roleRepository.save(new Role(RoleName.ROLE_SUPER_ADMIN));
            User save = authRepository.save(new User(
                    "SuperAdmin",
                    "SuperAdmin",
                    "+998914648580",
                    "istardimovs@gmail.com",
                    null,
                    true,
                    "SuperAdmin123"
            ));

        }
    }
}
