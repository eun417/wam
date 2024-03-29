package com.chungjin.wam.domain.auth.handler;

import com.chungjin.wam.domain.auth.dto.CustomOAuth2User;
import com.chungjin.wam.domain.auth.dto.TokenDto;
import com.chungjin.wam.global.exception.CustomException;
import com.chungjin.wam.global.jwt.JwtTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static com.chungjin.wam.global.exception.error.ErrorCodeType.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공");

        CustomOAuth2User oAuth2User = getCustomOAuth2User(authentication);

        if (oAuth2User == null) {
            throw new CustomException(RESOURCE_NOT_FOUND);
        }

        //인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = jwtTokenProvider.generateTokenDto(authentication);

        //TokenDto 객체를 JSON으로 변환하여 HTTP 응답의 본문으로 전송
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        objectMapper.writeValue(response.getWriter(), tokenDto);

        response.sendRedirect("/"); //메인 페이지로 리다이렉트
    }

    /**
     * authentication.getPrincipal() 반환 객체가 CustomOAuth2User 타입인지 확인
     */
    private CustomOAuth2User getCustomOAuth2User(Authentication authentication) {
        Object principal = authentication.getPrincipal();

        //principal이 CustomOAuth2User 타입인지 확인
        if (principal instanceof CustomOAuth2User) {
            //CustomOAuth2User 타입으로 캐스팅하여 사용
            return (CustomOAuth2User) principal;
        }
        return null;
    }

}
