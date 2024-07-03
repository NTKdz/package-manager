package com.mbamc.packagemanagerbe.util;

import java.io.IOException;

import com.mbamc.packagemanagerbe.model.Package;
import com.mbamc.packagemanagerbe.model.User;
import com.mbamc.packagemanagerbe.repository.UserRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFFont;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.time.LocalDateTime;

public class PackageExcelHandler {
    List<Package> packages;
    private static SXSSFWorkbook workbook;
    private SXSSFSheet sheet;

    public PackageExcelHandler(List<Package> packages) {
        this.packages = packages;
        workbook = new SXSSFWorkbook();
    }

    private void writeHeaderLine() {
        sheet = workbook.createSheet("Packages");

        Row row = sheet.createRow(0);

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = (XSSFFont) workbook.createFont();
        font.setBold(font.getBold());
        font.setFontHeight(16);
        style.setFont(font);

        sheet.setColumnWidth(0, 5000); // Waybill
        sheet.setColumnWidth(1, 5000); // Username
        sheet.setColumnWidth(2, 8000); // Name
        sheet.setColumnWidth(3, 5000); // Requested Date
        sheet.setColumnWidth(4, 8000); // Department
        sheet.setColumnWidth(5, 4000); // Company
        sheet.setColumnWidth(6, 6000); // Confidentiality
        sheet.setColumnWidth(7, 6000); // Priority

        createCell(row, 0, "Mã vận đơn", style);
        createCell(row, 1, "Người dùng", style);
        createCell(row, 2, "Tên đầy đủ", style);
        createCell(row, 3, "Ngày yêu cầu", style);
        createCell(row, 4, "Phòng ban", style);
        createCell(row, 5, "Công ty", style);
        createCell(row, 6, "Độ mật", style);
        createCell(row, 7, "Độ khẩn", style);
    }

    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Long) {
            cell.setCellValue((Long) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        } else {
            cell.setCellValue((String) value);
        }
        cell.setCellStyle(style);
    }

    private void writeDataLines() {
        int rowCount = 1;

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = (XSSFFont) workbook.createFont();
        font.setBold(font.getBold());
        font.setFontHeight(16);
        style.setFont(font);

        int columnCount = 0;
        for (Package requestPackage : packages) {
            Row row = sheet.createRow(rowCount++);
            createCell(row, columnCount++, requestPackage.getWaybill(), style);
            createCell(row, columnCount++, requestPackage.getUser().getUsername(), style);
            createCell(row, columnCount++, requestPackage.getUser().getName(), style);
            createCell(row, columnCount++, new SimpleDateFormat("yyyy-MM-dd").format(requestPackage.getRequestedDate()), style);
            createCell(row, columnCount++, requestPackage.getUser().getDepartment(), style);
            createCell(row, columnCount++, requestPackage.getUser().getCompany(), style);
            createCell(row, columnCount++, requestPackage.getConfidentiality().toString(), style);
            createCell(row, columnCount++, requestPackage.getPriority().toString(), style);

            columnCount = 0;
        }
    }

    public void export(HttpServletResponse response) throws IOException {
        writeHeaderLine();
        writeDataLines();

        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();

        outputStream.close();

    }

    //import
    public static List<Package> excelToPackages(InputStream input, UserRepository userRepository) {
        try {
            Workbook workbook1 = new XSSFWorkbook(input);
            Sheet sheet = workbook1.getSheet("Packages");
            Iterator<Row> rows = sheet.iterator();
            List<Package> packages = new ArrayList<>();

            int rowNum = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();
                if (rowNum == 0) {
                    rowNum++;
                    continue;
                }

                Iterator<Cell> currentCell = currentRow.cellIterator();
                Package newPackage = new Package();

                int cellIndex = 0;
                while (currentCell.hasNext()) {
                    Cell cell = currentCell.next();

                    switch (cellIndex) {
                        case 0:
                            newPackage.setWaybill((long) cell.getNumericCellValue());
                            break;
                        case 1:
                            newPackage.setUser(userRepository.getUserByUsername(cell.getStringCellValue()));
                            break;
                        case 3:
                            newPackage.setRequestedDate(Date.valueOf(LocalDate.parse(cell.getStringCellValue())));
                            break;
                        case 6:
                            newPackage.setConfidentiality(Package.Confidentiality.valueOf(cell.getStringCellValue()));
                            break;
                        case 7:
                            newPackage.setPriority(Package.Priority.valueOf(cell.getStringCellValue()));
                            break;
                        default:
                            break;
                    }

                    cellIndex++;
                }
                packages.add(newPackage);
            }

            workbook1.close();
            return packages;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
