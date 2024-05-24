package OSS.oss.service;

import OSS.oss.dto.ResisterDTO;
import OSS.oss.dto.ResisterDTO;
import OSS.oss.entity.User;
import OSS.oss.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 회원정보 조회
    public User getUserProfile(int userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.orElse(null);
    }

    // 회원정보 수정
    public User updateUserProfile(int userId, ResisterDTO userDTO) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setId(userDTO.getId());
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
            // 필요한 경우 비밀번호 암호화 추가
            return userRepository.save(user);
        }
        return null;
    }
}
/* 사용자 인증 및 권한 확인
    public boolean validateUser(String id, String role, int userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getId().equals(id) && (user.getRole().equals(role) || role.equals("ADMIN"));        }
        return false;
    }*/