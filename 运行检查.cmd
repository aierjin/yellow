@echo off
cd /d "%~dp0"
"%~dp0runtime\node.exe" --test tests/*.test.mjs
pause
