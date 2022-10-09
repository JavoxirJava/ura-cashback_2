package itca.uz.ura_cashback_2.service;
import itca.uz.ura_cashback_2.entity.Attachment;
import itca.uz.ura_cashback_2.entity.AttachmentContent;
import itca.uz.ura_cashback_2.repository.AttachmentContentRepository;
import itca.uz.ura_cashback_2.repository.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.Iterator;
import java.util.UUID;

@Service
public class AttachmentService {
    final
    AttachmentRepository attachmentRepository;
    final
    AttachmentContentRepository attachmentContentRepository;

    public AttachmentService(AttachmentRepository attachmentRepository, AttachmentContentRepository attachmentContentRepository) {
        this.attachmentRepository = attachmentRepository;
        this.attachmentContentRepository = attachmentContentRepository;
    }


    public UUID upload(MultipartHttpServletRequest request) throws IOException {
        try {
            Iterator<String> fileNames = request.getFileNames();
            while (fileNames.hasNext()) {
                MultipartFile file = request.getFile(fileNames.next());
                assert file != null;
                Attachment attachment = new Attachment(
                        file.getOriginalFilename(),
                        file.getContentType(),
                        file.getSize());
                Attachment save = attachmentRepository.save(attachment);
                AttachmentContent attachmentContent = new AttachmentContent(
                        save,
                        file.getBytes());
                attachmentContentRepository.save(attachmentContent);
                return save.getId();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public ResponseEntity<byte[]> getFile(UUID id){
        Attachment attachment = attachmentRepository.findById(id).get();
        AttachmentContent attachmentContent = attachmentContentRepository.findByAttachment(attachment);
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(attachment.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+attachment.getName()+"\"")
                .body(attachmentContent.getContentSize());
    }
}
