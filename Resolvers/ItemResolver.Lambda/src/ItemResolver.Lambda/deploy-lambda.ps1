# For viewing more options for arguments, see:
# https://aws.amazon.com/blogs/developer/deploying-net-core-aws-lambda-functions-from-the-command-line/

# To run:
# Ensure Rider 'Powershell' plugin has been installed.
# Otherwise run manually through Powershell with '.\deploy-lambda.ps1'
## On Linux, use 'pwsh' for Powershell on Linux first

# Don't forget to modify the name
$LambdaName = "36-hours-resolver-lambda"

# Set path to the location of the script
Push-Location $PSScriptRoot

aws-vault exec harry -- -- dotnet lambda deploy-function -fms 128 -ft 10 -fn $LambdaName

Write-Host "The Lambda has been updated!"
Pop-Location