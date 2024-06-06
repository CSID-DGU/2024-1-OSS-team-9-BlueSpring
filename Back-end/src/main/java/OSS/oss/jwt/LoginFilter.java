package OSS.oss.jwt;

import OSS.oss.dto.CustomUserDetails;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Collection;
import java.util.Iterator;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {

        this.setUsernameParameter("id"); //id 파라미터로 받기
        this.setFilterProcessesUrl("/api/users/login"); // 로그인 엔드포인트를 /api/login으로 설정
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        //클라이언트 요청에서 id, password 추출
        String id = obtainUsername(request);
        String password = obtainPassword(request);

        System.out.println(id);
        System.out.println(password);

        //스프링 시큐리티에서 id와 password를 검증하기 위해서는 token에 담아야 함
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(id, password, null);
        //token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }
    @Override
    //로그인 성공시 실행하는 메소드(여기서 jwt 토큰 생성)
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        //super.successfulAuthentication(request, response, authResult);
        //UserDetailsS
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        String id = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();

        String token = jwtUtil.createJwt(id, role, 60*60*10000L); //jwt 생성 시간

        response.addHeader("Authorization", "Bearer " + token); //http rfc 7235정의에 의해 \
    }
    @Override
    //로그인 실패시 실행하는 메소드
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, org.springframework.security.core.AuthenticationException failed) {
        //super.unsuccessfulAuthentication(request, response, failed);
        response.setStatus(401);
    }
}
