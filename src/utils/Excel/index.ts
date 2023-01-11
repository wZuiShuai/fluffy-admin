import * as xlsx from 'xlsx'
import type { WorkBook } from 'xlsx'
import { Excel } from './interface'

const { utils, writeFile } = xlsx


const setColumnWidth = (data: any, worksheet: any, min = 3) => { //判断宽度
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


export const jsonToSheet = <T = any>({ data, header, fileName = 'lits.xlsx', json2sheetOpts = {}, write2excelOpts = { bookType: 'xlsx' } }: Excel.JsonToSheet<T>) => { //导出Excel文件  data必填 参数为对象
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