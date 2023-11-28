---
author: Moe Chaudhry
pubDatetime: 2023-3-14T14:07:15.547Z
title: "A Deep Deep Deep Dive into Nmap"
postSlug: Nmap Deep Dive
featured: false
tags:
  - infrastructure
  - penetration testing
  - cybersecurity
description: ""
---

## Introduction

In the complex landscape of network security, understanding the intricacies of host discovery is crucial. This blog post delves into the nuances of using Nmap, a powerful network discovery tool, to identify active hosts in various network environments, particularly when dealing with different firewall configurations.

## Exploring the Basics of Nmap

Nmap is a versatile tool used for network discovery and security auditing. Its default behavior includes conducting port scans to identify open ports (`nmap –sS target`) and ping sweeps to check if a host is online (`nmap –sP target`). Nmap typically sends ICMP echo requests and TCP pings (TCP packets with ACK flag targeting port 80) to determine if a host is active.

## Nmap in Action: Diverse Scenarios

### Scenario 1: Basic Firewall Configuration

In this setup, where the firewall acts merely as a router, Nmap's ICMP and TCP requests receive expected responses, indicating the presence of active hosts.

### Scenario 2: Firewall with a Generic Ruleset

```plaintext
pass from any to any proto tcp port 80
pass from any to any proto tcp port 53
pass from any to any proto tcp port 25
drop all
```

Here, TCP pings on allowed ports succeed, but ICMP packets are blocked, showcasing Nmap's capability to adapt to different firewall rules.

### Scenario 3: Firewall with Specific Rules

```plaintext
pass from any to 172.26.1.2 proto tcp port 80
pass from any to 172.26.1.4 proto tcp port 53
pass from any to 172.26.1.6 proto tcp port 25
drop all
```

In this scenario, only TCP pings destined for the WWW server on port 80 get through, highlighting the need for targeted discovery tactics.

### Scenario 4: Stateful Firewall with Specific Rules

```plaintext
pass from any to 172.26.1.2 proto tcp port 80 keep state
pass from any to 172.26.1.4 proto tcp port 53 keep state
pass from any to 172.26.1.6 proto tcp port 25 keep state
drop all
```

In a more advanced setup with a stateful firewall, no responses are received to Nmap's probes, demonstrating the limitations of default discovery methods in more secure environments.

## Customizing Nmap for Effective Discovery

### Tailoring TCP Pings

Customizing TCP pings can circumvent stateful firewall restrictions. For instance, using `-PS` with a SYN flag instead of ACK can bypass firewalls by emulating the start of a TCP connection. Changing the destination port with commands like `nmap –sP –PS25 172.26.1.2` or setting a specific source port (`-g 53`) can further refine the discovery process.

### Adapting ICMP Messages

Since firewalls may permit different types of ICMP traffic, varying the ICMP message types with -PP (timestamp requests) or -PM (address mask requests) can yield better discovery results.

## Bringing It All Together

In complex network environments, a strategic combination of TCP ping sweeps and adapted ICMP messages is key to effective host discovery. Understanding and utilizing the extensive customization options offered by Nmap allows network administrators and security professionals to navigate through various firewall configurations and accurately identify active hosts in their networks.

Nmap's versatility in host discovery underlines its essential role in network security, offering insights crucial for maintaining robust and secure network environments.
