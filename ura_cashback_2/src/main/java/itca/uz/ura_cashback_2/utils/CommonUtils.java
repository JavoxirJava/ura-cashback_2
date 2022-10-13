package itca.uz.ura_cashback_2.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class CommonUtils {
    public static Pageable getPageable(int page, int size) throws Exception {
        if (page<0){
            throw new Exception("Page soni 0 dan kichik bulmasin");
        }
        if (size>Integer.parseInt(AppConstant.MAX_SIZE)){
            throw new Exception("Size "+AppConstant.MAX_SIZE+" dan bolmasin");
        }
        return PageRequest.of(page, size, Sort.Direction.DESC, "createdAt","phoneNumber");
    }
}
