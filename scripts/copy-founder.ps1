$src = Join-Path $env:TEMP 'temp_image_1776921117797.jpeg'
Copy-Item -LiteralPath $src -Destination 'public/founder.jpg' -Force
(Get-Item 'public/founder.jpg').Length
