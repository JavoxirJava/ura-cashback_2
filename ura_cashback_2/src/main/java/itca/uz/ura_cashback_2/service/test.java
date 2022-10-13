package itca.uz.ura_cashback_2.service;

import java.util.Scanner;

public class test {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("son: ");
        int son = scanner.nextInt();
        int count = 0;
        for (int i = 0; i <= 8; i++) {
            count = son % 2;
            son /= 2;
            System.out.print(count);
        }
    }
}
