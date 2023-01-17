<template>
    <div style="height: 100%;position: relative;">
        <ImgUpload class="imgUpload" @ready="handleImageReady" @success="handleSuccess" @fail="handleFail" />
        <textarea :id="tinymceId" style="height: 100%;"></textarea>
    </div>
</template>

<script setup lang="ts" name="tinymce">
import type { Editor, RawEditorOptions } from 'tinymce'
import tinymce from 'tinymce/tinymce'

import 'tinymce/plugins/lists' //列表
import 'tinymce/plugins/advlist' //列表
import 'tinymce/plugins/anchor' //锚点
import 'tinymce/plugins/visualchars' //显示不可见符号
import 'tinymce/plugins/searchreplace' //查找替换
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
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons' //默认icon
import 'tinymce/plugins/autolink' //自动链接
import 'tinymce/plugins/codesample' //代码示例
// import 'tinymce/plugins/autosave' //自动保存
// import 'tinymce/plugins/emoticons' //表情
// import 'tinymce/plugins/autoresize' //自动调整大小
// import 'tinymce/plugins/save' //保存
// import 'tinymce/plugins/template' //模板
import 'tinymce/models/dom'

import { toolbar, plugins } from './utils/tinymce'
import ImgUpload from './component/ImgUpload.vue'
import { buildShortUUID } from '@/utils/uuid'
import { onMounted, useAttrs, ref, computed, inject, unref } from 'vue'
import { main } from '@/store'
import { ElMessage } from 'element-plus'

const mainState = main()

const attrs = useAttrs()

const props = withDefaults(defineProps<{
    options?: any
    toolbar?: any
    plugins?: any
    modelValue?: string
    showImageUpload?: boolean
}>(), {
    options: () => ({}),
    toolbar,
    plugins,
    showImageUpload: true
})

const emit = defineEmits<{
    (e: 'change', arr: any): void
}>()

const tinymceId = ref<string>(buildShortUUID('tiny-vue'))
const editorRef = ref<null | Editor>(null)

//是否深色模式
const isDark: any = inject('isDark')
const skinName = computed(() => {
    return isDark.value ? 'oxide-dark' : 'oxide'
})

//国际化
const langName = computed(() => {
    return mainState.i18n === 'zh_CN' ? 'zh_CN' : 'en'
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
        promotion: false,
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
        statusbar: true, //状态栏
        toolbar_sticky: true,
        textContent: props.modelValue,
        ...options,
        setup: (editor: Editor) => {
            editorRef.value = editor
            editor.on('init', () => initSetup())
        },
    }
})

const setValue = (editor: any, val: string, prevVal?: string) => {
    if (
        editor &&
        typeof val === 'string' &&
        val !== prevVal &&
        val !== editor.getContent({ format: attrs.outputFormat })
    ) {
        editor.setContent(val)
    }
}

const initSetup = () => {
    const editor = unref(editorRef)
    if (editor) {
        const value = props.modelValue || ''
        editor.setContent(value)

        const modelEvents: any = attrs.modelEvents ? attrs.modelEvents : null
        const normalizedEvents = Array.isArray(modelEvents) ? modelEvents.join(' ') : modelEvents

        // if (props.modelValue) {
        //     watch(
        //         () => props.modelValue,
        //         (val: string, prevVal: string) => {
        //             setValue(editor, val, prevVal)
        //         }
        //     )
        // }

        editor.on(normalizedEvents ? normalizedEvents : 'change keyup undo redo', () => {
            const content = editor.getContent({ format: attrs.outputFormat as any })
            emit('change', content)
        })
    }
}

onMounted(async () => {
    await tinymce.init(initOptions.value)
})


//上传图片
const setImgName = (name: string): string => `[ready:${name}]`

const handleImageReady = (name: string) => {
    const editor = unref(editorRef)
    if (editor) {
        editor.execCommand('mceInsertContent', false, setImgName(name))
        const content = editor?.getContent() ?? ''
        setValue(editor, content)
    }
}

const handleSuccess = (name: string, url: string) => {
    const editor = unref(editorRef)
    if (editor) {
        const content = editor?.getContent() ?? ''
        const val = content?.replace(setImgName(name), `<img src="${url}"/>`) ?? ''
        setValue(editor, val)
    }
}

const handleFail = () => {
    ElMessage.error('上传失败!')
}


</script>

<style scoped lang="scss">
.imgUpload{
    position: absolute;
    top: 4px;
    right: 10px;
    z-index: 999;
}
</style>