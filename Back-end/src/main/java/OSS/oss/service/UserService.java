package OSS.oss.service;

import OSS.oss.dto.ResisterDTO;
import OSS.oss.dto.ResisterDTO;
import OSS.oss.entity.User;
import OSS.oss.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 회원정보 조회
    public User getUserProfile(String id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }

    // 회원정보 수정
    public User updateUserProfile(int userId, ResisterDTO userDTO) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setMajor(userDTO.getMajor());
            // 필요한 경우 비밀번호 암호화 추가
            return userRepository.save(user);
        }
        return null;
    }
    // 관심사 수정
    public User updateUserCategory(int userId, ResisterDTO userDTO) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setCategory(userDTO.getCategory());
            return userRepository.save(user);
        }
        return null;
    }
    public boolean validatePassword(int userId, String providedPassword) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return passwordEncoder.matches(providedPassword, user.getPassword());
        }
        return false;
    }
}
