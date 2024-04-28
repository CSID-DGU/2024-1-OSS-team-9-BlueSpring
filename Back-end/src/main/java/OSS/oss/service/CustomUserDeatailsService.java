package OSS.oss.service;

import OSS.oss.dto.CustomUserDetails;
import OSS.oss.entity.User;
import OSS.oss.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDeatailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDeatailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

        User userData = userRepository.findById(id);

        if (userData != null) {

            //UserDetails에 담아서 return하면 AutneticationManager가 검증 함
            return new CustomUserDetails(userData);
        }
        return null;


    }
}
