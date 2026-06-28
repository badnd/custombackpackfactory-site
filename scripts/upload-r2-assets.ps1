param(
  [string]$Bucket = "junyibags-assets",
  [string]$AssetsDir = "public/assets",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Get-ContentType {
  param([string]$Path)
  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".avif" { "image/avif"; break }
    ".webp" { "image/webp"; break }
    ".png" { "image/png"; break }
    ".jpg" { "image/jpeg"; break }
    ".jpeg" { "image/jpeg"; break }
    ".svg" { "image/svg+xml"; break }
    ".ico" { "image/x-icon"; break }
    ".css" { "text/css"; break }
    ".js" { "text/javascript"; break }
    ".txt" { "text/plain"; break }
    ".xml" { "application/xml"; break }
    ".json" { "application/json"; break }
    ".pdf" { "application/pdf"; break }
    default { "application/octet-stream" }
  }
}

$resolvedAssets = (Resolve-Path -LiteralPath $AssetsDir).Path
$files = Get-ChildItem -LiteralPath $resolvedAssets -Recurse -File

if (-not $DryRun) {
  $wrangler = Get-Command wrangler -ErrorAction SilentlyContinue
  if (-not $wrangler) {
    throw "Cloudflare Wrangler was not found. Install it or run this script from a shell where 'wrangler' is available."
  }
}

foreach ($file in $files) {
  $relative = $file.FullName.Substring($resolvedAssets.Length).TrimStart([char[]]@('\', '/'))
  $key = "assets/$($relative -replace '\\', '/')"
  $contentType = Get-ContentType $file.FullName

  if ($DryRun) {
    Write-Host "$key <$contentType>"
    continue
  }

  wrangler r2 object put "$Bucket/$key" --file "$($file.FullName)" --content-type "$contentType"
}

Write-Host "Uploaded $($files.Count) files to R2 bucket '$Bucket'."
