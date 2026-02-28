# MyWebsite

一个可直接部署到 GitHub Pages 的个人网站模板，包含 4 个页面：

- Home
- Family
- Hobby
- Professional

## 目录结构

```
MyWebsite/
  assets/
    images/   # 放你的照片
    files/    # 放你的 PDF 简历
  family.html
  hobby.html
  index.html
  professional.html
  script.js
  style.css
```

## 你需要替换的内容

1. `index.html` 里你的名字、自我介绍、联系方式。
2. `assets/images/` 里放照片，并使用以下文件名：
   - `profile.jpg`
   - `family-1.jpg` ~ `family-4.jpg`
   - `hobby-1.jpg` ~ `hobby-3.jpg`
3. `assets/files/resume.pdf` 放你的简历。

## 发布到 GitHub Pages（Project Site）

1. 新建 GitHub 仓库并 push 此目录代码。
2. 进入仓库 `Settings` -> `Pages`。
3. `Build and deployment` 选择 `Deploy from a branch`。
4. 分支选 `main`，文件夹选 `/ (root)`，保存。
5. 等待 1-2 分钟，访问你的 Pages 链接。
