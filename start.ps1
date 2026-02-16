# Pakistan Cafe Finder - Advanced Edition Startup Script
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Pakistan Cafe Finder - Advanced Edition" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed (for potential local server)
$pythonInstalled = Get-Command python -ErrorAction SilentlyContinue

if ($pythonInstalled) {
    Write-Host "✓ Python detected" -ForegroundColor Green
    Write-Host ""
    Write-Host "Starting local development server..." -ForegroundColor Yellow
    Write-Host "Opening browser at: http://localhost:8000/index-enhanced.html" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    
    # Start Python HTTP server and open browser
    Start-Process "http://localhost:8000/index-enhanced.html"
    python -m http.server 8000
} else {
    Write-Host "Python not found. Opening file directly in browser..." -ForegroundColor Yellow
    Write-Host ""
    
    # Open the enhanced HTML file directly
    $htmlPath = Join-Path $PSScriptRoot "index-enhanced.html"
    Start-Process $htmlPath
    
    Write-Host "✓ Application opened in default browser" -ForegroundColor Green
    Write-Host ""
    Write-Host "Note: For best experience, run this with Python installed" -ForegroundColor Yellow
    Write-Host "Install Python from: https://www.python.org/downloads/" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Features:" -ForegroundColor Green
Write-Host "  • Advanced search and filtering" -ForegroundColor White
Write-Host "  • User reviews and ratings" -ForegroundColor White
Write-Host "  • Photo galleries" -ForegroundColor White
Write-Host "  • Favorites system" -ForegroundColor White
Write-Host "  • Route optimization" -ForegroundColor White
Write-Host "  • 32+ cafes across Pakistan" -ForegroundColor White
Write-Host "==================================================" -ForegroundColor Cyan
