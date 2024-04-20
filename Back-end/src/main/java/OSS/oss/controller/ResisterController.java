package OSS.oss.controller;

import OSS.oss.dto.ResisterDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class ResisterController {
    @PostMapping("/resister")
    public String resister(ResisterDTO resisterDTO) {
        return "ok";
    }
}
