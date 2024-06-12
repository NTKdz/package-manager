package com.mbamc.packagemanagerbe.util;

import java.io.IOException;

import com.mbamc.packagemanagerbe.model.Package;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

public class PackageExcelExporter {
    List<Package> packages;
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;

    public PackageExcelExporter(List<Package> packages) {
        this.packages = packages;
        workbook = new XSSFWorkbook();
    }

    private void writeHeaderLine() {
        sheet = workbook.createSheet("Packages");

        Row row = sheet.createRow(0);

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);

        createCell(row, 0, "Mã vận đơn", style);
        createCell(row, 1, "Người dùng", style);
        createCell(row, 2, "Ngày yêu cầu", style);
        createCell(row, 3, "Phòng ban", style);
        createCell(row, 4, "Công ty", style);
        createCell(row, 5, "CPN", style);
        createCell(row, 6, "Độ mật", style);
        createCell(row, 7, "Độ khẩn", style);
    }

    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
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
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);

        for (Package requestPackage : packages) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;

            createCell(row, columnCount++, requestPackage.getWaybill().toString(), style);
            createCell(row, columnCount++, requestPackage.getUser().getName(), style);
            createCell(row, columnCount++, requestPackage.getRequestedDate().toString(), style);
            createCell(row, columnCount++, requestPackage.getUser().getDepartment(), style);
            createCell(row, columnCount++, requestPackage.getUser().getDepartment(), style);
            createCell(row, columnCount++, requestPackage.getCompany(), style);
            createCell(row, columnCount++, requestPackage.getConfidentiality().toString(), style);
            createCell(row, columnCount++, requestPackage.getPriority().toString(), style);
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
}
