# 🚀 Auto Hide Ultimate

**Auto Hide Ultimate** 是 VS Code 侧边栏和面板管理的终极解决方案。它不仅能根据你的点击自动切换 UI 显示，还引入了延迟处理、闲置隐藏和环境感知等高级功能，为你打造最纯粹、最沉浸的编程环境。

---

## ✨ 核心功能 (Core Features)

![演示](Images/Features/AutoHideSideBar.gif)

### 🖱️ 交互式自动隐藏
*   **侧边栏 (SideBar)**: 点击编辑器时自动隐藏左侧或右侧栏。
*   **底部面板 (Panel)**: 自动管理终端、输出、调试控制台的可见性。
*   **引用搜索 (References)**: 在跳转引用后点击编辑器，自动清理残留的搜索窗口。

### 🛡️ 调试模式联动
*   **环境感知**: 自动根据是否处于调试状态切换不同的显示策略。
*   **入场/离场自动化**: 进入调试时打开调试面板，退出时恢复清爽界面。

---

## 🏆 终极版独有功能 (Ultimate Pro Features)

### ⏱️ 精准延迟隐藏 (Hide Delay)
不再因为误触导致 UI 频繁闪烁。你可以设置延迟时间（如 300ms），让 UI 的消失更加自然、平滑。

### 🚫 智能语言排除 (Exclusion List)
在编写 Markdown 时需要一直看着 Outline？在处理 JSON 时需要参考结构？
通过 `excludeLanguages` 设置，你可以让特定语言的文件完全忽略自动隐藏逻辑。

### 💤 闲置自动隐藏 (Idle Auto-Hide)
如果你停止操作一段时间（如 10 秒），Auto Hide Ultimate 会自动为你清理桌面，让你在思考时不受任何 UI 干扰。

### 🌑 失去焦点自动隐藏 (Focus-Lost Hide)
当你切换到浏览器查找资料时，VS Code 会自动收起所有辅助栏。当你切回 VS Code 时，迎接你的是最宽敞的编辑区域。

### 🔘 全局一键开关 (Master Toggle)
随时通过状态栏或命令面板开启/关闭所有功能，无需修改繁琐的设置。

---

## ⚙️ 快速配置 (Quick Settings)

| 设置项 | 描述 | 默认值 |
| :--- | :--- | :--- |
| `autoHidePlus.enabled` | 全局功能总开关 | `true` |
| `autoHidePlus.hideDelay` | 隐藏前的延迟（毫秒） | `0` |
| `autoHidePlus.autoHideIdleTimeout` | 闲置隐藏超时（秒，0为禁用） | `0` |
| `autoHidePlus.excludeLanguages` | 排除自动隐藏的语言列表 | `[]` |
| `autoHidePlus.hideOnFocusLost` | 失去焦点时自动隐藏 | `false` |

---

## 🎹 快捷键支持 (Commands)

*   `Auto Hide Plus: Toggle Auto Hide Plus Global Switch`: 切换插件总开关。
*   `Auto Hide Plus: Toggle AutoHide SideBars...`: 切换特定栏位的自动隐藏状态。

---

**享受纯净代码，从 Auto Hide Ultimate 开始。**
