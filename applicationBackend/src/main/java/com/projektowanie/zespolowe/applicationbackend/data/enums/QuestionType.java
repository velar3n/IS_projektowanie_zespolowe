package com.projektowanie.zespolowe.applicationbackend.data.enums;

import lombok.Getter;

@Getter
public enum QuestionType {
    MULTIPLE_CHOICE("MULTIPLE-CHOICE"),
    SINGLE_CHOICE("SINGLE-CHOICE");

    private final String displayName;

    QuestionType(String displayName) {
        this.displayName = displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}
