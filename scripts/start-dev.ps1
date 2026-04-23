# Starts the Next.js dev server in the background, logging to .next-dev.log
$logFile = Join-Path $PSScriptRoot '..' '.next-dev.log'
if (Test-Path $logFile) { Remove-Item $logFile -Force }

# Use cmd.exe to spawn the npm.cmd properly
$proc = Start-Process -FilePath 'cmd.exe' `
  -ArgumentList '/c', 'npm run dev > .next-dev.log 2>&1' `
  -WorkingDirectory (Resolve-Path (Join-Path $PSScriptRoot '..')) `
  -WindowStyle Hidden `
  -PassThru

Write-Host "Started dev server PID=$($proc.Id)"
Start-Sleep -Seconds 10
if (Test-Path $logFile) {
  Write-Host "--- last 20 log lines ---"
  Get-Content $logFile -Tail 20
} else {
  Write-Host "(no log yet)"
}
