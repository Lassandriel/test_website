# Translation & Key Audit
Write-Host "--- Translation & Key Audit ---" -ForegroundColor Cyan

if (Get-Command node -ErrorAction SilentlyContinue) {
    npm run audit:i18n
} else {
    Write-Error "Node.js is not installed or not in PATH. Please install Node.js to run the audit."
}

Write-Host "`nPress any key to close..."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null
