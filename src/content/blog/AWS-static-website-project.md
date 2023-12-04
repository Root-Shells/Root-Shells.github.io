---
author: Moe Chaudhry
pubDatetime: 2021-5-22T14:14:54.547Z
title: "Creating a Static Website on AWS with CI/CD Pipelines"
postSlug: AWS-Static-Website
featured: true
ogImage: https://github.com/satnaing/astro-paper/assets/53733092/1ef0cf03-8137-4d67-ac81-84a032119e3a
tags:
  - AWS
  - cloud
  - DevOps
description: ""
---

![AWS CodePipeline](@assets/images/codepipeline.png)

## Introduction

Continuous integration and continuous deployment (CI/CD) are key to efficient and reliable software delivery. This blog post will walk you through a project that demonstrates these concepts using various AWS services. The goal is to create a static website hosted on an S3 bucket, set up through CloudFormation, and integrate automated testing and deployment via CodeBuild and CodePipeline.

## Services Utilized

- CodePipeline: Orchestrates the workflow of the pipeline.
- CodeBuild: Handles automated testing.
- CloudFormation: Automates the creation of the S3 bucket for web hosting.

## Prerequisites

Before diving into the steps, ensure the following:

- An S3 bucket is created with static website hosting enabled.
- `index.html` is prepared and uploaded to your chosen GitHub repository branch.

## Project Steps

### 1. CloudFormation: S3 Bucket Creation

We start by using a website.json file to create the S3 bucket via CloudFormation. The key setting here is the AccessControl property, set to PublicRead - a necessity for website hosting. Other CloudFormation settings are kept default.

### 2. CodePipeline Configuration

Our pipeline has three distinct phases:

- Source Phase: Uses GitHub as the action provider. Changes in the repository are tracked via GitHub webhooks, triggering the pipeline when updates occur.
- Testing Phase: Implements CodeBuild for testing. The specific test checks if `index.html` contains the phrase "Automation for the People!" using the command `cat index.html | grep "Automation for the People!"`. The required buildspec.yml is found in the master branch of this repository.
- Deploy Phase: Deploys the `index.html` file from the repository to the S3 bucket initialized by CloudFormation.

![AWS Build Process](@assets/images/static-website-build.png)

## Cleanup Process

Post-project, it’s crucial to delete both the CloudFormation Stack and the S3 bucket to prevent additional charges.

## Ideas for Improvement

To further streamline the process:

Automate the provisioning of the S3 bucket within the CodePipeline workflow.
Set up a configurable Time-To-Live (TTL) for the project resources. This allows for automatic deletion of the S3 bucket and stack when the TTL expires.
By following these steps, you can create a robust CI/CD pipeline, demonstrating the power and flexibility of AWS in automating web development processes. Whether you're a seasoned developer or new to AWS, this project offers valuable insights into the world of automated web hosting and deployment.

[Github Repository](https://github.com/Root-Shells/StaticWebsite/tree/master)
