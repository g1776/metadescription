# metadescription v1.0

## Created by Gregory Glatzer

## Features

metadescription allows you to add a description to any folder or file in your VSCode workspace. Simply right click any folder or file in the Explorer, and click "Edit Description". You will then be provided with a markdown file that is associated with this file.

<div style="text-align: center">
<img style="margin-bottom: 30px; margin-top: 10px; border: 1px solid white" width="592" height="294" src="https://raw.githubusercontent.com/g1776/metadescription/master/metadescriptionExample.gif">
</div>


> __How it works__: Since windows does not have a unique ID for files, metadescription uses the __creation date__ of a file as a unique identifier to associate the description with it. In most cases, this suffices as a unique identifier, unless you create multiple files in quick succession using a cli or other tool.

### __Note:__ This extension has not been tested on macOS.

## Requirements

The `temp` node module is required to run this extension. Please install with `npm i temp`.

## Requested Features

- Modify the file tab of the description, so it is easier to identify which description goes with which file when multiple descriptions are open.

- Create a feature to combine all files in a workspace's descriptions into one master file.

## Release Notes

This is the first release of this extension!