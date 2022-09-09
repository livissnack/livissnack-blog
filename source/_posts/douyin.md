---
title: 抖音视频解析原理分析
cover: https://livissnack.oss-cn-shanghai.aliyuncs.com/img/bg2.jpg
---

# 抖音视频解析原理分析

## 一、概述

需求：视频剪辑工作者日常生活中需要获取无水印短视频！

## 二、原理分析

1. 获取短视频的短连接（有下角：点击（复制链接），链接地址内容：https://v.douyin.com/eReT43D）
获取方式如下：
![抖音短视频](http://showdoc.doniai.com/server/index.php?s=/api/attachment/visitFile&sign=c3dac60acf17827831ed7ff84efe0f61 "抖音短视频")

2. 对获取到的视频地址进行分析


- 将链接地址放入POSTMAN中，用GET请求，如下：
![抖音视频链接请求](http://showdoc.doniai.com/server/index.php?s=/api/attachment/visitFile&sign=4e7f9afb3733ecf1cf9cf796f31c57a8 "抖音视频链接请求")

这个时候返回的是一个html页面，验证码动画页面，分析html内容，没有啥有价值的内容

- 将POSTMAN自动重定向功能关闭，捕获地址
![关闭重定向功能](http://showdoc.doniai.com/server/index.php?s=/api/attachment/visitFile&sign=f90240eda80d669d78799bbc1b2a4be1 "关闭重定向功能")

关闭重定向按钮，然后重新请求：
![捕获重定向的视频地址](http://showdoc.doniai.com/server/index.php?s=/api/attachment/visitFile&sign=6fba57484de22816cd8f7faf1b9aa0fd "捕获重定向的视频地址")


3. 获取真实的短视频编号（获取：短视频编号items_ids）

- 上面已经成功获取重定向前的的地址，解析其短视频编号

```javascript
	const urlParse = require('url');
	const redirect_url = 'https://www.iesdouyin.com/share/video/6929752969407712527/?region=CN&mid=6929753013247249165&u_code=165clhefe&titleType=title&did=69367132613&iid=3026285263608399&timestamp=1615274868&app=aweme&utm_campaign=client_share&utm_medium=ios&tt_from=copy&utm_source=copy'
    const parse_url = urlParse.parse(redirect_url, true).pathname
    const items_ids = parse_url.split("/")[3]
```

4. 解密真实的视频信息

- 将获取到的短视频编号进行组装url（拼装真实的请求接口地址）

接口地址：https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=6929752969407712527

发送请求如下图：
![请求获取视频信息接口](http://showdoc.doniai.com/server/index.php?s=/api/attachment/visitFile&sign=01f68c98383e64c81eb8ed9b8cdaa71a "请求获取视频信息接口")

获取的接口数据如下：

```json
{
    "item_list": [
        {
            "group_id": 6929752969407712000,
            "anchor_info": {
                "id": "6601169158962956301",
                "name": "",
                "type": 2
            },
            "images": null,
            "statistics": {
                "digg_count": 8,
                "play_count": 0,
                "share_count": 0,
                "aweme_id": "6929752969407712527",
                "comment_count": 1
            },
            "video_text": null,
            "long_video": null,
            "forward_id": "0",
            "cha_list": null,
            "comment_list": null,
            "video": {
                "play_addr": {
                    "uri": "v0300fff0000c0lmr8kf43g0fjthuuv0",
                    "url_list": [
                        "https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300fff0000c0lmr8kf43g0fjthuuv0&ratio=720p&line=0"
                    ]
                },
                "cover": {
                    "uri": "tos-cn-p-0015/355f17492ad94f8f83ce0f92af64e170",
                    "url_list": [
                        "https://p3-sign.douyinpic.com/tos-cn-p-0015/355f17492ad94f8f83ce0f92af64e170~c5_300x400.jpeg?x-expires=1652173200&x-signature=x9fB3uzrjn4TC5kNkjZeyryUb%2BI%3D&from=4257465056_large&s=PackSourceEnum_DOUYIN_REFLOW&se=false&sc=cover&l=2022042617383801021004302247071E94",
                        "https://p26-sign.douyinpic.com/tos-cn-p-0015/355f17492ad94f8f83ce0f92af64e170~c5_300x400.jpeg?x-expires=1652173200&x-signature=E7JvFgo8AB9iSJM7Flvab1YzyvE%3D&from=4257465056_large&s=PackSourceEnum_DOUYIN_REFLOW&se=false&sc=cover&l=2022042617383801021004302247071E94",
                        "https://p9-sign.douyinpic.com/tos-cn-p-0015/355f17492ad94f8f83ce0f92af64e170~c5_300x400.jpeg?x-expires=1652173200&x-signature=gMPSDW3cd1nq02ITlfBhR0oE4zc%3D&from=4257465056_large&s=PackSourceEnum_DOUYIN_REFLOW&se=false&sc=cover&l=2022042617383801021004302247071E94"
                    ]
                },
                "height": 1280,
                "duration": 15115,
                "vid": "v0300fff0000c0lmr8kf43g0fjthuuv0",
                "width": 720,
                "dynamic_cover": {
                    "uri": "tos-cn-p-0015/b06efc45b4d14e94b2b0acd19ca05328_1613458861",
                    "url_list": [
                        "https://p26-sign.douyinpic.com/obj/tos-cn-p-0015/b06efc45b4d14e94b2b0acd19ca05328_1613458861?x-expires=1652173200&x-signature=6Fk%2FE9N5zXEllsh7t10j7MCEGK8%3D&from=4257465056_large",
                        "https://p9-sign.douyinpic.com/obj/tos-cn-p-0015/b06efc45b4d14e94b2b0acd19ca05328_1613458861?x-expires=1652173200&x-signature=DBpJj0OTXw3D7D%2FCUKjMFKsk%2BbY%3D&from=4257465056_large",
                        "https://p3-sign.douyinpic.com/obj/tos-cn-p-0015/b06efc45b4d14e94b2b0acd19ca05328_1613458861?x-expires=1652173200&x-signature=DDsO6RQjnLQYoKKCLVuIyHe9Y9M%3D&from=4257465056_large"
                    ]
                },
                "origin_cover": {
                    "uri": "tos-cn-p-0015/9ce4788ce562489dbc9fbe36c2e46220_1613458859",
                    "url_list": [
                        "https://p3-sign.douyinpic.com/tos-cn-p-0015/9ce4788ce562489dbc9fbe36c2e46220_1613458859~tplv-dy-360p.jpeg?x-expires=1652173200&x-signature=7iQ7rueXlSF32lRBlGO%2BwyP93Tg%3D&from=4257465056&se=false&biz_tag=feed_cover&l=2022042617383801021004302247071E94",
                        "https://p9-sign.douyinpic.com/tos-cn-p-0015/9ce4788ce562489dbc9fbe36c2e46220_1613458859~tplv-dy-360p.jpeg?x-expires=1652173200&x-signature=EQ6LCV9WDE6E3sXBJTkp074GSXY%3D&from=4257465056&se=false&biz_tag=feed_cover&l=2022042617383801021004302247071E94",
                        "https://p6-sign.douyinpic.com/tos-cn-p-0015/9ce4788ce562489dbc9fbe36c2e46220_1613458859~tplv-dy-360p.jpeg?x-expires=1652173200&x-signature=WPxhonQHd%2F%2FducJC4sQ2iuXxwjM%3D&from=4257465056&se=false&biz_tag=feed_cover&l=2022042617383801021004302247071E94"
                    ]
                },
                "ratio": "720p",
                "has_watermark": true,
                "bit_rate": null
            },
            "duration": 15115,
            "risk_infos": {
                "content": "",
                "reflow_unplayable": 0,
                "warn": false,
                "type": 0
            },
            "label_top_text": null,
            "is_live_replay": false,
            "aweme_poi_info": {
                "poi_name": "濒湖游乐园",
                "type_name": "黄冈市",
                "tag": "点击了解视频中的地点",
                "icon": {
                    "uri": "33a2200013bb98733b01e",
                    "url_list": [
                        "https://p26-sign.douyinpic.com/obj/33a2200013bb98733b01e?x-expires=1651136400&x-signature=PDamf40CD3v%2FWurKOjoHW5EpyeE%3D&from=2347263168",
                        "https://p9-sign.douyinpic.com/obj/33a2200013bb98733b01e?x-expires=1651136400&x-signature=8BG2WivxcyEo29gxXl5HZ%2FHctaU%3D&from=2347263168",
                        "https://p3-sign.douyinpic.com/obj/33a2200013bb98733b01e?x-expires=1651136400&x-signature=hq5ZI%2F29bIyOyvvVa8JxZe%2FwtR8%3D&from=2347263168"
                    ]
                }
            },
            "create_time": 1613458859,
            "share_url": "https://www.iesdouyin.com/share/video/6929752969407712527/?region=&mid=6929753013247249165&u_code=0&did=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&titleType=title",
            "image_infos": null,
            "geofencing": null,
            "is_preview": 0,
            "author": {
                "unique_id": "",
                "type_label": null,
                "nickname": "Bruce Snack",
                "avatar_larger": {
                    "uri": "1080x1080/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30",
                    "url_list": [
                        "https://p26.douyinpic.com/aweme/1080x1080/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172",
                        "https://p6.douyinpic.com/aweme/1080x1080/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172",
                        "https://p9.douyinpic.com/aweme/1080x1080/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172"
                    ]
                },
                "avatar_thumb": {
                    "uri": "100x100/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30",
                    "url_list": [
                        "https://p11.douyinpic.com/aweme/100x100/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172",
                        "https://p26.douyinpic.com/aweme/100x100/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172",
                        "https://p3.douyinpic.com/aweme/100x100/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172"
                    ]
                },
                "follow_status": 0,
                "card_entries": null,
                "short_id": "1008831394",
                "avatar_medium": {
                    "uri": "720x720/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30",
                    "url_list": [
                        "https://p26.douyinpic.com/aweme/720x720/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172",
                        "https://p9.douyinpic.com/aweme/720x720/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172",
                        "https://p6.douyinpic.com/aweme/720x720/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172"
                    ]
                },
                "platform_sync_info": null,
                "geofencing": null,
                "uid": "99563444789",
                "signature": "阳光总在风雨后！",
                "followers_detail": null,
                "policy_version": null,
                "mix_info": null
            },
            "desc": "旋转飞机",
            "music": {
                "play_url": {
                    "uri": "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6929753004283333390.mp3",
                    "url_list": [
                        "https://sf6-cdn-tos.douyinstatic.com/obj/ies-music/6929753004283333390.mp3",
                        "https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/6929753004283333390.mp3"
                    ]
                },
                "duration": 15,
                "status": 1,
                "id": 6929753013247249000,
                "mid": "6929753013247249165",
                "author": "Bruce Snack",
                "cover_hd": {
                    "uri": "1080x1080/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30",
                    "url_list": [
                        "https://p9.douyinpic.com/aweme/1080x1080/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172",
                        "https://p11.douyinpic.com/aweme/1080x1080/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172",
                        "https://p3.douyinpic.com/aweme/1080x1080/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172"
                    ]
                },
                "position": null,
                "title": "@Bruce Snack创作的原声一Bruce Snack",
                "cover_large": {
                    "uri": "1080x1080/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30",
                    "url_list": [
                        "https://p9.douyinpic.com/aweme/1080x1080/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172",
                        "https://p11.douyinpic.com/aweme/1080x1080/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172",
                        "https://p3.douyinpic.com/aweme/1080x1080/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172"
                    ]
                },
                "cover_medium": {
                    "uri": "720x720/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30",
                    "url_list": [
                        "https://p3.douyinpic.com/aweme/720x720/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172",
                        "https://p11.douyinpic.com/aweme/720x720/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172",
                        "https://p26.douyinpic.com/aweme/720x720/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30.jpeg?from=116350172"
                    ]
                },
                "cover_thumb": {
                    "uri": "168x168/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30",
                    "url_list": [
                        "https://p26.douyinpic.com/img/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30~c5_168x168.jpeg?from=116350172",
                        "https://p3.douyinpic.com/img/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30~c5_168x168.jpeg?from=116350172",
                        "https://p6.douyinpic.com/img/aweme-avatar/mosaic-legacy_23f83000347a91d48fd30~c5_168x168.jpeg?from=116350172"
                    ]
                }
            },
            "video_labels": null,
            "aweme_id": "6929752969407712527",
            "aweme_type": 4,
            "promotions": null,
            "text_extra": [],
            "author_user_id": 99563444789,
            "group_id_str": "6929752969407712527",
            "share_info": {
                "share_desc": "在抖音，记录美好生活",
                "share_title": "旋转飞机",
                "share_weibo_desc": "#在抖音，记录美好生活#旋转飞机"
            }
        }
    ],
    "filter_list": [],
    "extra": {
        "logid": "2022042617383801021004302247071E94",
        "now": 1650965918000
    },
    "status_code": 0
}
```


- 通过字段内容，我们可以清晰的知道，视频播放地址、封面图片地址、视频里的背景音乐地址

```javascript
    let really_video_url = [data.item_list][0][0]['video']['play_addr']['url_list'][0]
    let really_cover_url = [data.item_list][0][0]['video']['origin_cover']['url_list'][0]
    let really_music_url = [data.item_list][0][0]['music']['play_url']['url_list'][0]
```

5. 解析到真实的视频信息

- 对短视频地址进行分析

```text
https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300fff0000c0lmr8kf43g0fjthuuv0&ratio=720p&line=0

其中我们看到ratio参数，720p，此处代表视频码率，我们可以尝试切换不同码率1080p等等
```

三、视频下载

1. 浏览器打开视频地址下载
![浏览器下载视频](http://showdoc.doniai.com/server/index.php?s=/api/attachment/visitFile&sign=636e8ee6be26308424f3e9a6de3cf58d "浏览器下载视频")


2. 程序自动下载

- 构建html的form表单，输入框视频地址，点击下载按钮，调用此js方法即可
```javascript
      async do_download() {
                    let link = await document.createElement('a')
                    let url = this.video_url
                    // 这里是将url转成blob地址，
                    await fetch(url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
                        link.href = URL.createObjectURL(blob)
                        link.download = ''
                        document.body.appendChild(link)
                        link.click()
                    })
                },
```

实现效果图片：
![视频下载示例](http://showdoc.doniai.com/server/index.php?s=/api/attachment/visitFile&sign=4c88abd9ce3d874e0fc2e07b563f6315 "视频下载示例")

四、备注说明

- 以上只提供视频解析思路，编程开发语言不限

五、作者信息

© 2022 Doniai 。 Bruce Snack。