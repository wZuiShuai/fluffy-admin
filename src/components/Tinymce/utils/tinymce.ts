// Any plugins you want to setting has to be imported
// Detail plugins list see https://www.tinymce.com/docs/plugins/
// Custom builds see https://www.tinymce.com/download/custom-builds/
// colorpicker/contextmenu/textcolor plugin is now built in to the core editor, please remove it from your editor configuration

export const plugins = [
    'lists','advlist','anchor','visualchars','searchreplace','link','autosave','charmap','code','codesample',
    'directionality','fullscreen','help','image','importcss','insertdatetime','media','nonbreaking','pagebreak',
    'preview','table','visualblocks','wordcount'
]

export const toolbar = [
    'fontsizeselect fontsize lineheight searchreplace bold italic underline strikethrough alignleft alignright outdent indent blockquote undo redo removeformat subscript superscript code codesample',
    'hr forecolor   numlist bullist anchor visualchars link charmap  ltr rtl help image insertdatetime media nonbreaking pagebreak preview table visualblocks wordcount fullscreen'
]
