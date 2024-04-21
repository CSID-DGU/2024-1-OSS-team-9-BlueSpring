package OSS.oss.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api")
public class AdminController {
    @GetMapping("/admin")
    @ResponseBody
    public String admin() {
        return "admin controller";
    }
}