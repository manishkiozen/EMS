 Dim objWshShell, ls, lc
 set objWshShell = WScript.CreateObject("WScript.Shell")
 ls = objWshShell.Run("cmd /k taskkill /F /IM node.exe", 0, false)
 lc = objWshShell.Run("cmd /k taskkill /F /IM nircmd.exe", 0, false)
 set objWshShell = nothing