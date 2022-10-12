package itca.uz.ura_cashback_2.companent;


import itca.uz.ura_cashback_2.entity.Role;
import itca.uz.ura_cashback_2.entity.enums.RoleName;
import itca.uz.ura_cashback_2.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Dataloader implements CommandLineRunner {
    final RoleRepository roleRepository;


//    @Value("${spring.sql.init.mode}")
    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String initMode;

    public Dataloader(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {
        if (initMode.equals("create-drop") || initMode.equals("create")) {
            roleRepository.save(new Role(RoleName.ROLE_USER));
            roleRepository.save(new Role(RoleName.ROLE_ADMIN));
            roleRepository.save(new Role(RoleName.ROLE_SUPER_ADMIN));
        }
    }
}
