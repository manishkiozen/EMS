 Dim objWshShell, ls, lc
 set objWshShell = WScript.CreateObject("WScript.Shell")
 ls = objWshShell.Run("cmd /k cd C:\Program Files\nodejs\ && node C:\EmsApp\app.js", 0, false)
 lc = objWshShell.Run("chrome localhost:8085", 1, false)
 set objWshShell = nothing