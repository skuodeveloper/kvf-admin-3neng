package com.kalvin.kvf.common.utils;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class ExcelKit {
    /**
     * 处理上传的文件
     *
     * @param in
     * @param fileName
     * @return
     * @throws Exception
     */
    public static List readExcel(InputStream in, String fileName) throws Exception {
        List list = new ArrayList<>();
        //创建Excel工作薄
        Workbook work = getWorkbook(in, fileName);

        Row row = null;
        Cell cell = null;

        Sheet sheet = work.getSheetAt(0);

        for (int i = sheet.getFirstRowNum(); i <= sheet.getLastRowNum(); i++) {
            row = sheet.getRow(i);

            if (row == null || row.getFirstCellNum() == i) {
                continue;
            }
            List<Object> li = new ArrayList<>();
            for (int j = row.getFirstCellNum(); j < row.getLastCellNum(); j++) {
                cell = row.getCell(j);
                li.add(readCellValue(cell));
            }
            list.add(li);
        }
        work.close();//这行报错的话  看下导入jar包的版本
        return list;
    }

    /**
     * 判断文件格式
     *
     * @param inStr
     * @param fileName
     * @return
     * @throws Exception
     */
    public static Workbook getWorkbook(InputStream inStr, String fileName) throws Exception {
        Workbook workbook = null;
        String fileType = fileName.substring(fileName.lastIndexOf("."));

        if (".xls".equals(fileType)) {
            workbook = new HSSFWorkbook(inStr);
        } else if (".xlsx".equals(fileType)) {
            workbook = new XSSFWorkbook(inStr);
        } else {
            throw new Exception("请上传excel文件！");
        }
        return workbook;
    }

    /**
     * 读取单元格的值
     * @param cell
     * @return
     * @throws IOException
     */
    public static String readCellValue(Cell cell) throws IOException{
        if(cell == null){ throw new IOException("单元格为空");}
        String value;
        CellType cellType = cell.getCellTypeEnum();

        switch (cellType){
            case STRING:
                value = cell.getStringCellValue();
                break;
            case BOOLEAN:
                boolean booleanValue = cell.getBooleanCellValue();
                value = String.valueOf(booleanValue);
                break;
            case NUMERIC:
                if(HSSFDateUtil.isCellDateFormatted(cell)){
                    SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd hh:ss");
                    value = sf.format(cell.getDateCellValue());
                }else{
                    double numbericValue = cell.getNumericCellValue();
                    DecimalFormat df = new DecimalFormat("0");
                    value = df.format(numbericValue);
                }
                break;
            default:
                value = "";
                break;
        }
        return value;
    }
}
