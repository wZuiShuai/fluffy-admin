<template>
  <el-upload
    v-model:file-list="fileList"
    :objectBind="12313"
    :action="urlHeader"
    list-type="picture-card"
    accept=".gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG,.webp"
    :before-upload="beforeAvatarUpload"
  >
    <!-- 默认插槽 -->
    <el-icon>
      <component is="Plus" />
    </el-icon>
    <!-- 上传后插槽 -->
    <template #file="value">
      <!-- {{ value }} -->
      <div class="icon">
        <el-icon
          class="fly"
          color="#67C23A"
          size="20"
          @click="deletaImg(value)"
        >
          <component is="Promotion" />
        </el-icon>
        <el-icon class="close" color="#fff" size="20" @click="deletaImg(value)">
          <component is="Close" />
        </el-icon>
      </div>
      <el-image
        ref="image"
        style="width: 100%; height: 100%"
        :src="value.file.url"
        :zoom-rate="1.2"
        hide-on-click-modal
        :preview-src-list="[value.file.url]"
        fit="cover"
      />
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { ElMessage } from "element-plus"

import type { UploadProps } from "element-plus"

const urlHeader = import.meta.env.VITE_API_URL

const fileList = ref([
  {
    url: "https://cdn.pixabay.com/photo/2022/12/18/19/30/christmas-7664112_640.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2022/12/18/19/30/christmas-7664112_640.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2022/12/18/19/30/christmas-7664112_640.jpg",
  },
])

//删除照片
const deletaImg = (e: any) => {
  console.log(e.file.url.replace(urlHeader, ""))
}

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type.indexOf("image") === -1) {
    ElMessage.error("Oops, this is a error message.")
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage({
      message: "图片不能超过4MB！",
      type: "warning",
    })
    return false
  }
  return true
}
</script>

<style lang="scss" scoped>
.icon {
  height: 20px;
}

:deep(.el-upload-list__item) {
  position: relative;
  .icon {
    position: absolute;
    z-index: 99;
    top: 0;
    right: 0;
    background: #666;
    opacity: 0.8;
    cursor: pointer;
    display: none;
  }
  &:hover .icon {
    display: inline;
  }
  .fly :hover {
    background-color: #999;
  }
  .close:hover {
    background-color: red;
  }
}
.el-image {
  :deep(.el-image__inner) {
    cursor: default;
  }
}
</style>
