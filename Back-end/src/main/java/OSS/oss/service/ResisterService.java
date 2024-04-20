package OSS.oss.service;

import OSS.oss.dto.ResisterDTO;
import OSS.oss.entity.User;
import OSS.oss.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class ResisterService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    public ResisterService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }
    public void resisterProcess(ResisterDTO resisterDTO) {
        String id = resisterDTO.getId();
        String password = resisterDTO.getPassword();
        String major = resisterDTO.getMajor();
        String category = resisterDTO.getCategory();
        Boolean isExist = userRepository.existsById(id);
        if (isExist) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }
        User data = new User();

        data.setId(id);
        data.setPassword(bCryptPasswordEncoder.encode(password));
        data.setMajor(major);
        data.setCategory(category);

}
}
