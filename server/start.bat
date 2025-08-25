@echo off
echo Starting LMS Server...
echo.
echo Make sure MongoDB is running first:
echo net start MongoDB
echo.
echo Starting server on port 3001...
node server.js
pause
