package itca.uz.ura_cashback_2.controller;

import itca.uz.ura_cashback_2.service.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/attachment")
public class AttachmentController {
    @Autowired
    AttachmentService attachmentService;

    @PostMapping
    public HttpEntity<?> upload(MultipartHttpServletRequest request) throws IOException {
        UUID upload = attachmentService.upload(request);
        return ResponseEntity.ok(upload);
    }

    @GetMapping("/getFile/{id}")
    public HttpEntity<?> download(@PathVariable UUID id){
        return attachmentService.getFile(id);
    }
}
