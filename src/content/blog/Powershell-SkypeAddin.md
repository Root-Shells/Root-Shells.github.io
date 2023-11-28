---
author: Moe Chaudhry
pubDatetime: 2018-2-27T14:11:54.547Z
title: "Automating Office 365 User Profile Settings with PowerShell"
postSlug: Powershell-SkypeAddin
featured: false
ogImage: https://github.com/satnaing/astro-paper/assets/53733092/1ef0cf03-8137-4d67-ac81-84a032119e3a
tags:
  - powershell
  - automation
  - infrastructure
description: ""
---

## Introduction

This blog post introduces a custom PowerShell function specifically designed to interact with Office 365 user profile settings. For those looking for the complete function file and reference documentation, a GitHub repository link is provided at the end of this post.

## The Set-SkypeAddin PowerShell Function

The `Set-SkypeAddin` function is crafted to enable the Skype add-in for Outlook, particularly when the COM add-in menu is not functioning properly. It achieves this by interacting with registry hives through a PowerShell drive, as Office 365 settings are tied to user profiles.

## Code Overview

The function begins with a mandatory parameter for the username. It then retrieves the user's Security Identifier (SID) from Active Directory. Using this SID, it creates paths to the relevant registry keys where the settings for the Skype add-in are stored.

The function checks if the necessary registry paths exist and creates them if they don't. It then sets the properties for the `UCAddin.Lync.1` and `LoadBehavior` keys to enable the Skype add-in.

Here's a brief look at the function's structure:

```powershell
function Set-SkypeAddin {
    [cmdletbinding()]
    param(
        [parameter(Mandatory)]
        [string]$UserName
    )

    try {
        $SID = (New-Object System.Security.Principal.NTAccount($UserName)).Translate([System.Security.Principal.SecurityIdentifier]).value
        Write-Verbose -Message ('Located user {0}' -f $UserName)
    }
    catch {
        Throw ('Unable to locate user {0}' -f $UserName)
    }

    Write-Verbose -Message 'Establishing a PSDrive to HKU'
    New-PSDrive -Name HKU -PSProvider Registry -Root HKEY_USERS > $null

    $ResiliencyPath = 'HKU:\{0}\Software\Microsoft\Office\16.0\Outlook\Resiliency\DoNotDisturbAddinList' -f $SID
    $AddinPath = 'HKU:\{0}\Software\Microsoft\Office\16.0\Outlook\Addins\UCAddin.LyncAddin.1' -f $SID

    if ((Test-Path -Path $ResiliencyPath) -eq $false)  {
        Write-Verbose -Message ('The user path for DoNotDisturbAddinList does not exist for {0}; creating that path' -f $UserName)
        New-Item -Path $ResiliencyPath -Force > $Null
    }

    Write-Verbose -Message ('Setting properties for UCAddin.Lync.1 and LoadBehavior')
    New-ItemProperty -Path $ResiliencyPath -Name UCAddin.Lync.1 -Value 1 -PropertyType DWord -Force > $Null
    New-ItemProperty -Path $AddinPath -Name LoadBehavior -Value 3 -PropertyType DWord -Force > $Null

    Remove-PSDrive -Name HKU
}
```

## Functionality

- User Input: The function prompts for a username.
- Domain SID Retrieval: Uses Get-ADUser to pull the domain SID for the provided username.
- Registry Path Creation: Utilizes the domain SID to navigate to the `HKEY_CURRENT_USER` registry path.
- Registry Key Management: Creates and modifies registry keys to ensure the Skype add-in is enabled in Outlook.

## Example Usage

```powershell
Set-SkypeAddin -Username 'your_username_here' -Verbose
```

The `-Verbose` parameter provides detailed information about the function's operations.

## Error Handling

The function includes simple error handling through a try/catch block, which triggers if Get-ADUser fails to find the specified username.

## Conclusion

The `Set-SkypeAddin` function exemplifies the power of PowerShell in simplifying and automating tasks related to user profile settings in Office 365. This tool can be a valuable asset for system administrators needing to manage Outlook add-ins across different user profiles.

For access to the full PowerShell function and additional documentation, please refer to the GitHub repository linked below.

[Github Repository](https://github.com/Root-Shells/PowerShell-Scripts/blob/main/Set_SkypeAddin.ps1)
