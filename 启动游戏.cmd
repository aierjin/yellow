@echo off
cd /d "%~dp0"
set PORT=8816
"%~dp0runtime\node.exe" "%~dp0server.cjs"
pause
