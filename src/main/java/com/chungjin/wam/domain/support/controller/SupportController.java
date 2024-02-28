package com.chungjin.wam.domain.support.controller;

import com.chungjin.wam.domain.auth.service.CustomUserDetails;
import com.chungjin.wam.domain.support.dto.request.SupportRequestDto;
import com.chungjin.wam.domain.support.dto.request.UpdateSupportRequestDto;
import com.chungjin.wam.domain.support.dto.response.SupportDetailDto;
import com.chungjin.wam.domain.support.dto.response.SupportResponseDto;
import com.chungjin.wam.domain.support.service.SupportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/support")
public class SupportController {

    private final SupportService supportService;

    /**
     * 후원 생성
     */
    @PostMapping("/")
    public ResponseEntity<String> createSupport(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                @RequestBody @Valid SupportRequestDto supportReq) {
        supportService.createSupport(userDetails.getMember().getMemberId(), supportReq);
        return ResponseEntity.ok("후원이 생성되었습니다.");
    }

    /**
     * 후원 조회
     */
    @GetMapping("/{supportId}")
    public ResponseEntity<SupportDetailDto> readSupport(@PathVariable(value = "supportId") Long supportId) {
        return ResponseEntity.ok().body(supportService.readSupport(supportId));
    }

    /**
     * 후원 List 조회 (Pagination)
     */
    @GetMapping("/page={page}")
    public ResponseEntity<List<SupportResponseDto>> readAllSupport(@PathVariable(value = "page") int page) {
        return ResponseEntity.ok().body(supportService.readAllSupport(page));
    }

    /**
     * 후원 수정
     */
    @PutMapping("/{supportId}")
    public ResponseEntity<String> updateSupport(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                @PathVariable(value = "supportId") Long supportId,
                                                @RequestBody @Valid UpdateSupportRequestDto updateSupportReq) {
        supportService.updateSupport(userDetails.getMember().getMemberId(), supportId, updateSupportReq);
        return ResponseEntity.ok("후원이 수정되었습니다.");
    }

    /**
     * 후원 삭제
     */
    @DeleteMapping("/{supportId}")
    public ResponseEntity<String> deleteSupport(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                @PathVariable(value = "supportId") Long supportId) {
        supportService.deleteSupport(userDetails.getMember().getMemberId(), supportId);
        return ResponseEntity.ok("후원이 삭제되었습니다.");
    }

    /**
     * 좋아요 생성
     */
    @PostMapping("/{supportId}/like")
    public ResponseEntity<String> createLike(@AuthenticationPrincipal CustomUserDetails userDetails,
                                             @PathVariable(value = "supportId") Long supportId) {
        supportService.createLike(userDetails.getMember().getMemberId(), supportId);
        return ResponseEntity.ok("좋아요가 생성되었습니다.");
    }

    /**
     * 좋아요 삭제
     */
    @DeleteMapping("/{supportId}/like/{supportLikeId}")
    public ResponseEntity<String> deleteLike(@AuthenticationPrincipal CustomUserDetails userDetails,
                                             @PathVariable(value = "supportId") Long supportId,
                                             @PathVariable(value = "supportLikeId") Long supportLikeId) {
        supportService.deleteLike(userDetails.getMember().getMemberId(), supportId, supportLikeId);
        return ResponseEntity.ok("좋아요가 삭제되었습니다.");
    }

    /**
     * 검색 - 제목+내용
     */
    @GetMapping("/search/page={page}")
    public ResponseEntity<List<SupportResponseDto>> searchSupport(@RequestParam("keyword") String keyword,
                                                                  @PathVariable(value = "page") int page) {
        return ResponseEntity.ok().body(supportService.searchSupport(keyword, page));
    }

    /**
     * 검색 - 태그(동물 분류)
     */
    @GetMapping("/search/tag/page={page}")
    public ResponseEntity<List<SupportResponseDto>> searchSupportTag(@RequestParam("keyword") String keyword,
                                                             @PathVariable(value = "page") int page) {
        return ResponseEntity.ok().body(supportService.searchSupportTag(keyword, page));
    }

}
