package com.chungjin.wam.domain.support.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/support")
public class SupportController {

    /**
     * 후원 목록 조회
     */
    @GetMapping("/list")
    public String goQnaList() {
        return "donation/donationList";
    }

    /**
     * 후원 상세 조회
     */
    @GetMapping("/detail/{supportId}")
    public String goQnaDetail(@PathVariable("supportId") Long supportId, Model model) {
        model.addAttribute("supportId", supportId);
        return "donation/donationDetail";
    }

}
