@echo off
echo Updating all student pages with sidebar template...

cd frontend\pages

REM List of all student pages
set pages=admitcard.htm assignments.htm clubs.htm clubevents.htm documents.htm events.htm history.htm hostelmenu.htm notes.htm notice.htm profile.htm pyqs.htm support.htm syllabus.htm timetable.htm

REM We've already updated attendance.htm and marks.htm

for %%f in (%pages%) do (
    echo Updating %%f...
    
    REM Create backup
    copy %%f %%f.bak
    
    REM Update head section
    powershell -Command "(Get-Content %%f) -replace '<head>[^<]*<meta[^>]*>[^<]*<style>[^<]*body[^}]*}[^<]*table[^}]*}[^<]*@media[^}]*}[^<]*<\/style>[^<]*<style>[^<]*body\.dark-mode[^}]*}[^<]*table\.dark-mode[^}]*}[^<]*\.dark-toggle[^}]*}[^<]*<\/style>[^<]*<meta[^>]*>[^<]*<title>[^<]*<\/title>[^<]*<\/head>', '<head>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <meta charset=\"UTF-8\" />\n    <title>%%~nf</title>\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css\">\n    <script src=\"/sidebar-template.js\"></script>\n    <style>\n      table {\n        width: 100%%;\n        max-width: 800px;\n        margin: 20px 0;\n        border-collapse: collapse;\n      }\n      \n      th, td {\n        padding: 10px;\n        text-align: left;\n        border: 1px solid #ddd;\n      }\n      \n      th {\n        background-color: #f2f2f2;\n      }\n      \n      body.dark-mode th {\n        background-color: #444;\n      }\n      \n      body.dark-mode table,\n      body.dark-mode th,\n      body.dark-mode td {\n        border-color: #444;\n      }\n    </style>\n  </head>' | Set-Content %%f"
    
    REM Update body opening
    powershell -Command "(Get-Content %%f) -replace '<body>[^<]*<button[^>]*>[^<]*Toggle Dark Mode[^<]*<\/button>[^<]*<script>[^<]*function toggleDarkMode[^<]*<\/script>', '<body>\n    <!-- Sidebar will be loaded by sidebar-template.js -->\n    \n    <!-- This content will be placed inside the main content area -->' | Set-Content %%f"
    
    REM Remove border attribute from tables
    powershell -Command "(Get-Content %%f) -replace 'border=\"1\"', '' | Set-Content %%f"
)

echo All pages updated successfully!
pause