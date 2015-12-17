:: Run a local node instance if it exists, otherwise a global node instance
:: %~dp0 is the directory where this file is located, similar to node's __dirname

:: Open App in Chrome or another application
npm install -g forever
start node %~dp0\app.js

@IF EXIST "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --app=http://localhost:8085 --use-data-dir=%APPDATA%\EmsApp\
) ELSE (
  ::start %~dp0\msie-app-secure.hta
  start start http://localhost:8085/
)
exit

:: Note that comments can't be nested in if blocks!

::  IF EXIST "C:\Program Files (x86)\Mozilla Firefox\firefox.exe" (
:: Need to read more http://support.mozilla.org/en-US/questions/955250
:: https://developer.mozilla.org/en-US/docs/Getting_started_with_XULRunner
::  "C:\Program Files (x86)\Mozilla Firefox\firefox.exe" -app %~dp0\firefox-app.ini
::  ) ELSE (
::  )
