package com.mbamc.packagemanagerbe.util;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;

public class DateHandler {
    public static String formatDate(Date date, String format) {
        SimpleDateFormat formatter = new SimpleDateFormat(format);
        return formatter.format(date);
    }

    public static String getDateTrunc(LocalDate start, LocalDate end) {
        long daysDiff = ChronoUnit.DAYS.between(start, end);
        if (daysDiff <= 90) {
            return "1";
        } else if (daysDiff <= 730) {
            return "7";
        } else {
            return "30";
        }
    }
}
