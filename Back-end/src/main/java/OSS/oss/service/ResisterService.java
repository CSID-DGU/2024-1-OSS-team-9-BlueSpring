package OSS.oss.service;

import OSS.oss.dto.ResisterDTO;
import OSS.oss.entity.User;
import OSS.oss.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ResisterService {
    private final UserRepository userRepository; // DB에 접근하기 위한 객체
    private final BCryptPasswordEncoder bCryptPasswordEncoder; // 비밀번호 암호화 객체 임시 생성
    public ResisterService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    public void resisterProcess(ResisterDTO resisterDTO) {
        String id = resisterDTO.getId();
        String password = resisterDTO.getPassword();
        String major = resisterDTO.getMajor();
        String category = resisterDTO.getCategory();
        Boolean isExist = userRepository.existsById(id); // 아이디 중복 확인
        if (isExist) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }
        User data = new User(); // 회원가입할 새 User 객체 생성

        data.setId(id);
        data.setPassword(bCryptPasswordEncoder.encode(password)); // 비밀번호 암호화
        data.setMajor(major);
        data.setCategory(category);
        //data.setRole("ROLE_ADMIN"); // 임시로 ROLE_ADMIN으로 설정

        userRepository.save(data);

}
}
