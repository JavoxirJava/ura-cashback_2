package itca.uz.ura_cashback_2.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResPageable {
    private Integer page;
    private Integer size;
    private Long totalElements;
    private Integer totalPages;
    private Object object;
}
