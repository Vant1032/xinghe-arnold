# 如何使用ffmpeg转换图片格式


# ffmpeg简介与图片格式介绍

windows安装ffmpeg，从如下网站下载release版本 https://www.gyan.dev/ffmpeg/builds/

ffmpeg 6.1版本仍然不支持heic的图片格式，未来可能会支持，具体见该issue： https://trac.ffmpeg.org/ticket/6521

图片格式压缩率：jpeg < webp < heif < avif

图片压缩率比较高的还有个jxl格式，但是太新了而且各个平台支持都不到位，只能战未来了。

avif格式的图片由于android、windows、macos、各大浏览器都支持，未来覆盖率必然超过heif，heif由于专利授权原因，在浏览器上覆盖很差，chrome浏览器打不开heif格式图片。不过avif格式由于比较新，目前在老版本的系统、浏览器中支持率还不够。

avif格式其实跟heif格式类似，都是使用视频编码器技术应用到图片领域，heif的编码器用的跟 h.265\hevc 是一样的，avif则是使用av1编码器，av1编码器压缩率比hevc更高，目前国内B站算是比较早使用av1编码视频以及avif编码图片的平台，其技术团队有相关公开分享它们在编码器领域的研究。

网页端的图片格式转换工具，推荐使用https://squoosh.app/  ，图片格式支持非常全面。


# 查看图片格式详情

```
ffprobe example.webp
```

# 图片格式转换

## jpeg 转avif
```
ffmpeg -i source.jpg -c:v libaom-av1 -still-picture 1 dest.avif
```

## 转换jpeg为avif  debug级别 日志
```
ffmpeg -v debug -i source.jpg -c:v libaom-av1 -still-picture 1 dest.avif
```

## 转换jpeg为webp
```
ffmpeg -i source.jpg -c:v libwebp dest.webp
```

## 转换jpeg为jxl
```
ffmpeg -i source.jpg -c:v libjxl dest.jxl
```

## 转换avif为webp
```
ffmpeg -i source.avif -c:v libwebp dest.webp
```

## 转换avif为jpeg
```
ffmpeg -i source.avif  dest.jpg
```

## webp 转webp
```
ffmpeg -i source.webp -c:v libwebp dest.webp
```


