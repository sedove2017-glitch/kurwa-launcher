# Builds kurwa-site.zip next to the site folder, without the heavy .exe files.

$ErrorActionPreference = 'Stop'

$site = Split-Path -Parent $MyInvocation.MyCommand.Path
$stage = Join-Path $env:TEMP 'kurwa-site-pack'
$zip = Join-Path (Split-Path -Parent $site) 'kurwa-site.zip'

Set-Location $site

Remove-Item $stage -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $stage | Out-Null

Copy-Item (Join-Path $site '*') $stage -Recurse -Force
Get-ChildItem (Join-Path $stage 'downloads') -Filter *.exe -ErrorAction SilentlyContinue | Remove-Item -Force

Remove-Item $zip -Force -ErrorAction SilentlyContinue
Compress-Archive -Path (Join-Path $stage '*') -DestinationPath $zip -CompressionLevel Optimal

$size = [math]::Round((Get-Item $zip).Length / 1MB, 2)
Write-Host ''
Write-Host "Done: $zip ($size MB)"
