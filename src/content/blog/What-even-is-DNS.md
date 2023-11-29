---
author: Moe Chaudhry
pubDatetime: 2019-1-14T14:14:15.547Z
title: "What even is DNS"
postSlug: what-is-DNS
featured: false
tags:
  - infrastructure
  - penetration testing
  - cybersecurity
description: ""
---

## Introduction

The Domain Name System (DNS) is a cornerstone of the internet, translating human-readable domain names into IP addresses that computers use to communicate. This blog post delves into the intricacies of DNS, from domain names and resource records to name servers, zones, and typical use cases.

## Understanding Domain Names and Resource Records

- Tree Structure: DNS is organized as a tree with a root node at the top. Each node is a domain, and child nodes are subdomains.
- Resource Records: Domains own resource records, which describe their attributes. When you query DNS about a domain name, it responds with the relevant set of resource records.

## The Roles of Name Servers and Resolvers

- Distributed Database: DNS data is distributed across the globe to various name servers.
- Domain Namespace and Zones: The domain namespace is divided into zones for better manageability.
- Types of Name Servers:
  - Non-recursive Name Server: Answers queries only about the zones they are responsible for.
  - Recursive Name Server: Finds answers to queries if they are not already known.
- Types of Resolvers:
  - Fully Functional Resolver: Can interrogate DNS to find answers.
  - Stub Resolver: Relies on a recursive name server to do the heavy lifting.
- Caching: DNS servers and resolvers use domain name caches to speed up queries.

## Zones: The Building Blocks of DNS

- Purpose of Zones: Zones are crucial for DNS scalability and manageability.
- Authoritative Name Servers: Each zone requires at least two authoritative name servers.
- Caching and Distribution: Resource records from authoritative name servers are cached and distributed across the global DNS infrastructure.
- Zone Creation and Delegation: Admins delegate control of subdomains to create zones.

## Resource Record Conventions

- Meta-Information in Top Node: The top node of any zone contains meta-information, including the SOA (Start of Authority) and NS (Name Server) resource records.
- Types of Records:
  - A Records: Assign IP addresses to DNS names.
  - CNAME Records: Used for aliases, pointing one domain name to another.
- Authority Delegation: Authoritative name servers delegate requests to child zones and convey information to other systems.

## Basic Use Cases of DNS

- Resolver Queries: A stub resolver creates an A query (for an IP address) and sends it to the local name server.
- Iterative Queries: If the local name server can't find the answer, it makes iterative queries to root name servers and follows the chain of authority down to the specific domain's name servers.
- Fetching Records: The process continues until the name server fetches the desired A record, like www.google.com, from the appropriate authoritative server.

## Conclusion

DNS is a fundamental yet complex system that ensures the smooth navigation of the internet. It balances efficiency, scalability, and reliability through a distributed network of servers and resolvers. Understanding DNS is essential for anyone involved in network administration, cybersecurity, or just curious about how the internet works at a fundamental level. By mastering DNS concepts, one gains insight into the backbone of global internet connectivity.
