package OSS.oss.controller;

import OSS.oss.dto.ResisterDTO;
import OSS.oss.service.ResisterService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController //controller+responsebody
@RequestMapping("/api")

public class ResisterController {
    //주입 받기 위한 객체 변수
    private final ResisterService resisterService; //주입 받기 위한 객체 변수
    //autowired 대신 생성자 주입 방식
    public ResisterController(ResisterService resisterService) {
        this.resisterService = resisterService;
    }

    @PostMapping("/resister")
    public String resisterProcess(ResisterDTO resisterDTO) {
        resisterService.resisterProcess(resisterDTO);
        return "ok";
    }
}
