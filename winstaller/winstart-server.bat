:: %~dp0 is the directory where this file is located, similar to node's __dirname
:: Explanation of %~dp0 http://stackoverflow.com/a/5034119/151312

:: Run a local node instance if it exists, otherwise a global node instance
:: node "%~dp0\.\app.js" %* local instance
:: @echo off
:: install forever node moulde
npm install -g forever

call C:\EmsApp\ems-start.bat
:: copy shortcut to start up
:: XCOPY C:\EmsApp\ems-start - Shortcut.bat C:\Users\%USERNAME%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\

:: @IF EXIST "%~dp0\node.exe" (
::  "%~dp0\node.exe" "%~dp0\.\app.js" %*
:: ) ELSE (
:: 	node "%~dp0\.\app.js" %*
:: )
