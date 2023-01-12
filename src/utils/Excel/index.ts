import * as xlsx from 'xlsx'
import type { WorkBook } from 'xlsx'
import { Excel } from './interface'

const { utils, writeFile } = xlsx

//判断宽度
const setColumnWidth = (data: any, worksheet: any, min = 3) => {
    const obj: any = {}
    worksheet['!cols'] = []
    data.forEach((item: { [x: string]: any }) => {
        Object.keys(item).forEach(key => {
            const cur = item[key]
            const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
            const length = reg.test(cur) ? cur.length * min : cur?.length ?? min
            obj[key] = Math.max(length, obj[key] ?? min)
        })
    })
    Object.keys(obj).forEach(key => {
        worksheet['!cols']?.push({
            wch: obj[key]
        })
    })
}

//导出Excel文件  data必填 参数为对象
export const jsonToSheet = <T = any>({ data, header, fileName = 'lits.xlsx', json2sheetOpts = {}, write2excelOpts = { bookType: 'xlsx' } }: Excel.JsonToSheet<T>) => {
    const arrData = [...data]
    if (header) { //设置表头
        arrData.unshift(header)
        json2sheetOpts.skipHeader = true
    }

    const worksheet = utils.json_to_sheet(arrData, json2sheetOpts)

    setColumnWidth(arrData, worksheet)
    /* add worksheet to workbook */
    const workbook: WorkBook = {
        SheetNames: [fileName],
        Sheets: {
            [fileName]: worksheet,
        },
    }
    /* output format determined by filename */
    writeFile(workbook, fileName, write2excelOpts)
    /* at this point, lits.xlsx will have been downloaded */
}

//二维数组  数据导出Excel文件
export const aoaToSheetXlsx = <T = any>({ data, header, fileName = 'lits.xlsx', write2excelOpts = { bookType: 'xlsx' } }: Excel.AoaToSheet<T>) => {
    const arrData = [...data]
    if (header) {
        arrData.unshift(header)
    }

    const worksheet = utils.aoa_to_sheet(arrData)
    /* 二维数组转对象 */
    const value: any = []
    arrData.forEach(item => value.push(Object.fromEntries(item.map((item,index) => [index,item]))))
    setColumnWidth(value, worksheet)
    /* add worksheet to workbook */
    const workbook: WorkBook = {
        SheetNames: [fileName],
        Sheets: {
            [fileName]: worksheet,
        },
    }
    /* output format determined by filename */
    writeFile(workbook, fileName, write2excelOpts)
    /* at this point, out.xlsb will have been downloaded */
}

//导入Excel文件
