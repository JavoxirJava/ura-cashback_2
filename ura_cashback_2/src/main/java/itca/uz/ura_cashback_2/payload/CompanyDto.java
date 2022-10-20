package itca.uz.ura_cashback_2.payload;

import itca.uz.ura_cashback_2.entity.Attachment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {

    private UUID id;

    private String name;

    private String bio;

    private String description;

    private Double clintPercentage;


    private Attachment attachment;
    private UUID attachmentId;

    private UUID userId;

    private boolean active;


    public CompanyDto(UUID id, String name, String bio, String description, Double clintPercentage, Attachment attachment, boolean active) {
        this.id = id;
        this.name = name;
        this.bio = bio;
        this.description = description;
        this.clintPercentage = clintPercentage;
        this.attachment = attachment;
        this.active = active;
    }
}