# Bat语法快速入门
后缀为bat或cmd的文件就是window下命令行可以执行的脚本了，一般称为批处理脚本，类似于Linux系统下的shell脚本。利用它，我们可以快速实现一些简易功能。




# 常用指令


书写bat文件，想要双击bat后窗口继续保留，可在末尾加上：

`cmd /k`

`cmd /k` 是执行完dir命令后不关闭命令窗口

调用外部bat文件：

`call b.bat`

执行结束暂停

`pause`

\: 代表批处理标签引导符，用于goto到特定标签

START 启动另一个窗口来运行指定的程序或命令。

`start a.bat`

指定工作目录执行

```bat
start cmd /k "d: && dir"

call cmd /k "d: && dir"
```

# **变量**

设置全局变量（不要在名称和值之间使用空格，SET覆盖任何现有变量）：

```bat
set a=1

Set /A 开关支持算数操作

SET /A four=2+2

4
```

输出变量：

`echo %a%`

获取参数变量：

```bat
echo %0
echo %1
```

动态变量：

```
%CD% - 扩展到当前目录字符串。

%DATE% - 用跟 DATE 命令同样的格式扩展到当前日期。

%TIME% - 用跟 TIME 命令同样的格式扩展到当前时间。

%RANDOM% - 扩展到 0 和 32767 之间的任意十进制数字。

%ERRORLEVEL% - 扩展到当前 ERRORLEVEL 数值。

%CMDEXTVERSION% - 扩展到当前命令处理器扩展版本号。

%CMDCMDLINE% - 扩展到调用命令处理器的原始命令行。

%HIGHESTNUMANODENUMBER% - 扩展到此计算机上的最高 NUMA 节点号。
```

特殊变量：

```
%~dp0：代表的是脚本文件在磁盘的位置

%~dpI 第I个文件路径参数的完整父级路径

%~nxI 第I个文件路径参数的文件名（包括扩展名）

%~nI 第I个文件路径参数的文件名（不包括扩展名）
```

~用法：

```
%~1：当参数以引号开头时，%~1会自动将引号删除。

%1：当参数以引号开头时，%1不会自动将引号删除。
```

# **注释**

1. 官方推荐： REM (Remark) 关键字。

`REM This is a comment!`

1. 使用 ::，两个冒号。

`:: This is also a comment too! (usually!!)`

有几个地方 :: 会导致错误。比如，一个 for 循环中使用 :: 就会导致错误。如果有这种情况，只需要换回 REM 即可。

# **回显**

回显就是执行命令前的"C:\Users"这种东西

关闭回显：

```bat
echo off
```

开启回显

```bat
echo on
```

@:作用是后面接的命令关闭回显

```bat
@echo a

a
```

# **丢弃输出**

```bat
echo a > NUL
```

# **逻辑**

检查文件或文件夹是否存在：

if语句：

```bat
IF EXIST "a.txt" echo found

IF NOT EXIST "temp.txt" ECHO not found

If 和 Else 语句：

IF EXIST "temp.txt" (

  ECHO found

) ELSE (

  ECHO not found

)
```

检查变量是否与字符串匹配

```bat
SET var=Hello, World!

IF "%var%"=="Hello, World!" (

  ECHO found

)

不区分大小写来比较：

SET var=Hello, World!

IF /I "%var%"=="hello, world!" (

ECHO found

)
```



# **读取用户输入**

```bat
set /p var="prompt"
set /p confirm="please confirm:"
echo %confirm%
```



# **||和&&的用法：**

使用&&连接的两条命令，当第一条执行成功之后（%ERRORLEVEL%是0），紧接着会执行第二条命令。

```bat
DIR myfile.txt >NUL 2>&1 && TYPE myfile.txt
```

||则相反，当第一条命令执行失败后，执行第二条命令。

```bat
DIR myfile.txt >NUL 2>&1 || CALL :WARNING file not found - myfile.txt
```

也可以把这两个技巧结合起来使用，通过()来构造，当第一条执行失败后，执行()中的两条语句。

```bat
DIR myfile.txt >NUL 2>&1 || (ECHO %me%: WARNING - file not found - myfile.txt >2 && EXIT /B 1)
```



# **退出**

EXIT

退出 CMD.EXE 程序(命令翻译程序)或当前批处理脚本。

```
EXIT [/B] [exitCode]

 /B     指定要退出当前批处理脚本而不是 CMD.EXE。如果从一个批处理脚本外执行，则会退出 CMD.EXE
```

exitCode  指定一个数字号码。如果指定了 /B，将 ERRORLEVEL设成那个数字。如果退出 CMD.EXE，则用那个数字设置过程退出代码。

# **字符串操作**

**拼接**：

直接放在一起即可

```bat
set aa=aabbcc
set bb=ddeeff
echo %aa%%bb%
```

**截取**:

```bat
set testStr=abcdefghijklmnopqrstuvwxyz0123456789
echo 原始字符串 %testStr%
echo 提取前五个字符串：%testStr:~0,5%
echo 提取最后五个字符串：%testStr:~-5%
echo 提取第一个到倒数第六个字符串：%testStr:~0,-5%
echo 提取五个字符串，从第四个字符开始:%testStr:~3,5%
```

**替换**:

```bat
set repStr=aaabbbcccdddeeefff

echo 替换之前:%repStr%

echo 替换后：%repStr:aa=zz%
```


# 例子
快速启动elasticsearch相关程序：
```bat
:: 启动elasticsearch
start cmd /k "d: && cd D:\InstallDir\elk\elasticsearch-7.9.3-windows-x86_64\elasticsearch-7.9.3\bin\ && D:\InstallDir\elk\elasticsearch-7.9.3-windows-x86_64\elasticsearch-7.9.3\bin\elasticsearch.bat"

echo "started elastic-search"

:: 启动elasticsearch-head
start cmd /k "d: && cd D:\InstallDir\elk\elasticsearch-head && npm run start"

echo "started elasticsearch-head"

:: 启动kibana
start cmd /k "d: && cd D:\InstallDir\elk\kibana-7.9.3-windows-x86_64\bin && D:\InstallDir\elk\kibana-7.9.3-windows-x86_64\bin\kibana.bat"

echo "started kibana"

echo on

cmd /k
```



# **附录**
命令列表
```
ASSOC  显示或修改文件扩展名关联。

AT    计划在计算机上运行的命令和程序。

ATTRIB  显示或更改文件属性。

BREAK  设置或清除扩展式 CTRL+C 检查。

CACLS  显示或修改文件的访问控制列表(ACLs)。

CALL   从另一个批处理程序调用这一个。

CD    显示当前目录的名称或将其更改。

CHCP   显示或设置活动代码页数。

CHDIR  显示当前目录的名称或将其更改。

CHKDSK  检查磁盘并显示状态报告。

CHKNTFS 显示或修改启动时间磁盘检查。

CLS   清除屏幕。

CMD   打开另一个 Windows 命令解释程序窗口。

COLOR  设置默认控制台前景和背景颜色。

COMP   比较两个或两套文件的内容。

COMPACT 显示或更改 NTFS 分区上文件的压缩。

CONVERT 将 FAT 卷转换成 NTFS。您不能转换当前驱动器。

COPY   将至少一个文件复制到另一个位置。

DATE   显示或设置日期。

DEL   删除至少一个文件。

DIR   显示一个目录中的文件和子目录。

DISKCOMP 比较两个软盘的内容。

DISKCOPY 将一个软盘的内容复制到另一个软盘。

DOSKEY  编辑命令行、调用 Windows 命令并创建宏。

ECHO   显示消息，或将命令回显打开或关上。

ENDLOCAL 结束批文件中环境更改的本地化。

ERASE  删除至少一个文件。

EXIT   退出 CMD.EXE 程序(命令解释程序)。

FC    比较两个或两套文件，并显示不同处。

FIND   在文件中搜索文字字符串。

FINDSTR 在文件中搜索字符串。

FOR   为一套文件中的每个文件运行一个指定的命令。

FORMAT  格式化磁盘，以便跟 Windows 使用。

FTYPE  显示或修改用于文件扩展名关联的文件类型。

GOTO   将 Windows 命令解释程序指向批处理程序中某个标明的行。

GRAFTABL 启用 Windows 来以图像模式显示扩展字符集。

HELP   提供 Windows 命令的帮助信息。

IF    执行批处理程序中的条件性处理。

LABEL  创建、更改或删除磁盘的卷标。

MD    创建目录。

MKDIR  创建目录。

MODE   配置系统设备。

MORE   一次显示一个结果屏幕。

MOVE   将文件从一个目录移到另一个目录。

PATH   显示或设置可执行文件的搜索路径。

PAUSE  暂停批文件的处理并显示消息。

POPD   还原 PUSHD 保存的当前目录的上一个值。

PRINT  打印文本文件。

PROMPT  更改 Windows 命令提示符。

PUSHD  保存当前目录，然后对其进行更改。

RD    删除目录。

RECOVER 从有问题的磁盘恢复可读信息。

REM   记录批文件或 CONFIG.SYS 中的注释。

REN   重命名文件。

RENAME  重命名文件。

REPLACE 替换文件。

RMDIR  删除目录。

SET   显示、设置或删除 Windows 环境变量。

SETLOCAL 开始批文件中环境更改的本地化。

SHIFT  更换批文件中可替换参数的位置。

SORT   对输入进行分类。

START  启动另一个窗口来运行指定的程序或命令。

SUBST  将路径跟一个驱动器号关联。

TIME   显示或设置系统时间。

TITLE  设置 CMD.EXE 会话的窗口标题。

TREE   以图形模式显示驱动器或路径的目录结构。

TYPE   显示文本文件的内容。

VER   显示 Windows 版本。

VERIFY  告诉 Windows 是否验证文件是否已正确写入磁盘。

VOL   显示磁盘卷标和序列号。

XCOPY  复制文件和目录树。
```
