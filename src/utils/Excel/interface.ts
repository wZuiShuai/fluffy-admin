import type { JSON2SheetOpts, WritingOptions } from 'xlsx'

export namespace Excel {
    export interface JsonToSheet<T = any> {
        data: T[]
        header?: T
        fileName?: string
        json2sheetOpts?: JSON2SheetOpts
        write2excelOpts?: WritingOptions
    }
    export interface AoaToSheet<T = any> {
        data: T[][]
        header?: T[]
        fileName?: string
        write2excelOpts?: WritingOptions
    }
}