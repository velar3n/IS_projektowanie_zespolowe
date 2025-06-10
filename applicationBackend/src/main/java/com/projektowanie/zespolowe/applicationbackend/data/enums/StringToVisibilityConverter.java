package com.projektowanie.zespolowe.applicationbackend.data.enums;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToVisibilityConverter implements Converter<String, Visibility> {

  @Override
  public Visibility convert(String source) {
    for (Visibility v : Visibility.values()) {
      if (v.getValue().equalsIgnoreCase(source)) {
        return v;
      }
    }
    throw new IllegalArgumentException("Unknown visibility: " + source);
  }
}
