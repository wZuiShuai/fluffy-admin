<template>
    <div :style="{height: '100%',width: '100%'}">
        <textarea :id="tinymceId" ref="tinymceRef" style="height: 100%;width: 100%;"></textarea>
    </div>
</template>

<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts" name="tinymce">
import type { Editor, RawEditorOptions } from 'tinymce'
import tinymce from 'tinymce/tinymce'

import 'tinymce/plugins/lists' //列表
import 'tinymce/plugins/advlist' //列表
import 'tinymce/plugins/anchor' //锚点
import 'tinymce/plugins/visualchars' //显示不可见符号
import 'tinymce/plugins/searchreplace' //查找替换
import 'tinymce/plugins/autosave' //自动保存
import 'tinymce/plugins/link' //插入链接
import 'tinymce/plugins/charmap' //插入符号
import 'tinymce/plugins/code' //代码
import 'tinymce/plugins/directionality' //方向
import 'tinymce/plugins/fullscreen' //全屏
import 'tinymce/plugins/help' //帮助
import 'tinymce/plugins/image' //插入图片
import 'tinymce/plugins/importcss' //插入图片
import 'tinymce/plugins/insertdatetime' //插入时间
import 'tinymce/plugins/media' //插入视频
import 'tinymce/plugins/nonbreaking' //不间断的空格
import 'tinymce/plugins/pagebreak' //分页符
import 'tinymce/plugins/preview' //预览
import 'tinymce/plugins/table' //表格
import 'tinymce/plugins/quickbars' //快速工具
import 'tinymce/plugins/visualblocks' //视觉快
import 'tinymce/plugins/wordcount' //数据
// import 'tinymce/plugins/emoticons' //表情
// import 'tinymce/plugins/autoresize' //自动调整大小
// import 'tinymce/plugins/save' //保存
// import 'tinymce/plugins/template' //模板
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons' //默认icon
import 'tinymce/plugins/autolink' //自动链接
import 'tinymce/plugins/codesample' //代码示例
import 'tinymce/models/dom'

import { toolbar, plugins } from './utils/tinymce'
import { buildShortUUID } from '@/utils/uuid'
import { onMounted,useAttrs,ref,computed,inject,unref } from 'vue'
import { main } from '@/store'

const mainState = main()

const attrs = useAttrs()
console.log(attrs,'全部参数')


const props = withDefaults(defineProps<{
    options?: any
    value?: string
    toolbar?: any
    plugins?: any
    modelValue: string
    showImageUpload?: boolean
}>(),{
    options:() => ({}),
    toolbar,
    plugins,
    showImageUpload: true
})

const emit = defineEmits<{
    (e: 'change', arr: any): void
    (e: 'update:modelValue', arr: any): void
    (e: 'inited', arr: any): void
    (e: 'init-error', arr: any): void
}>()

const tinymceId = ref<string>(buildShortUUID('tiny-vue'))
const tinymceRef = ref<HTMLElement | null>(null)

//是否深色模式
const isDark: any = inject('isDark')
const skinName = computed(() => {
    return isDark.value ? 'oxide-dark' : 'oxide'
})

//国际化
const langName = computed(() => {
    return mainState.i18n === 'en' ? 'en' : 'zh_CN'
})

const initOptions = computed((): RawEditorOptions => {
    const { options, toolbar, plugins } = props
    const publicPath = '/'
    return {
        selector: `#${unref(tinymceId)}`,
        toolbar,
        editimage_cors_hosts: ['picsum.photos'],
        menubar: 'file edit insert view format table',
        plugins,
        language_url: publicPath + 'tinymce/langs/' + langName.value + '.js',
        language: langName.value,
        branding: false,
        default_link_target: '_blank',
        link_title: false,
        object_resizing: false,
        lists_indent_on_tab: false,
        auto_focus: true,
        skin: skinName.value,
        skin_url: publicPath + 'tinymce/skins/ui/' + skinName.value,
        content_css:
            publicPath + 'tinymce/skins/ui/' + skinName.value + '/content.min.css',
        help_tabs: ['shortcuts'], //帮助
        ...options,
        // images_upload_handler: (blobInfo: any, success) => {
        //     const img = 'data:image/jpeg;base64,' + blobInfo.base64()
        //     console.log('图片上传处理：',img)
        //     success(img)
        // }
    }
})

onMounted(() => {
    tinymce.init(initOptions.value)
})
</script>

<style scoped lang="scss">

</style>