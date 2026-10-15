@echo off
chcp 65001 >nul
title PyAcademy - сервер
cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
  echo.
  echo Python не найден. Установите его с https://www.python.org/downloads/
  echo При установке отметьте галочку "Add Python to PATH".
  echo.
  pause
  exit /b
)

echo ============================================
echo   PyAcademy: запуск локального сервера
echo ============================================
echo.
echo Откройте в браузере:  http://localhost:3000
echo.
echo Чтобы остановить сервер - закройте это окно
echo или нажмите Ctrl+C.
echo.
python server.py
echo.
echo Сервер остановлен.
pause