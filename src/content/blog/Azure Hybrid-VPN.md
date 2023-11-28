---
author: Moe Chaudhry
pubDatetime: 2021-8-4T14:11:54.547Z
title: "Azure Project: Designing a Hybrid Network with Azure"
postSlug: Azure-Hybrid-Network
featured: false
ogImage: https://github.com/satnaing/astro-paper/assets/53733092/1ef0cf03-8137-4d67-ac81-84a032119e3a
tags:
  - azure
  - cloud
  - devops
  - infrastructure
description: ""
---

![Azure Hub-Spoke Diagram](@assets/images/hub-spoke.png)

## Introduction

In the realm of cloud computing, creating a seamless network that integrates both on-premise and cloud resources is a significant challenge. This blog post delves into a project that addresses this challenge using Azure's hybrid network capabilities. The project focuses on establishing a site-to-site VPN connection, utilizing Azure resources through a VPN gateway, virtual network peering, and a VPN software appliance on Hyper-V.

## Understanding Azure Virtual Networks

Azure virtual networks are the foundation of cloud-based network architectures in Azure. They comprise various elements like network interfaces, load balancers, subnets, network security groups, and public IP addresses. These elements work together to facilitate secure communication between on-premise networks and Azure resources.

## On-Premise Setup Requirements

To integrate with Azure's virtual network, certain on-premise configurations are necessary:

- Port Forwarding: Essential for allowing VPN connections. Forwarding ports 500 (IKE) and 4500 (IPSec NAT-T) is crucial, as per the guidance in RFC 8229, for the smooth traversal of IKEv2 and ESP protocols across TCP connections on your LAN.
- VPN Appliance: In this project, a Windows RRAS server on Hyper-V with two virtual switches is used. The external switch enables internet access, while the internal one allows communication within the hypervisor network.
- LAN Topology: A basic network diagram of the setup illustrates the connectivity and layout.

![LAN Topology](@assets/images/topology.png)

## Azure Configuration

Setting up the Azure side of the hybrid network involves several steps:

- Subnets: Two subnets are created in the virtual network - one for the virtual network gateway and the other as a management subnet hosting a Ubuntu server (jumpbox).
- Virtual Network Gateway: Acts as the VPN device for the virtual network. It is associated with a Public IP address and plays a key role in establishing the site-to-site VPN connection.
- Connection Resource: This is where the pre-shared key for phase 1 IKE negotiations is created. It sets the IKEv2 protocol for the VPN connection.
- Peering: Connects the hub virtual network with the spoke networks, enabling resource communication across these networks as if they were part of the same network.

## Final Considerations

- The Azure VPN resource cannot be turned off once created. Costs are incurred based on the duration the gateway is provisioned and available.
- Although Azure networking offers theoretically unlimited bandwidth and connectivity, it's important to optimize data flow to and out of Azure to minimize costs.

This project showcases the potential of Azure in crafting a hybrid network solution. By carefully configuring both on-premise and Azure elements, a robust and seamless network integration is achievable, bridging the gap between local and cloud-based resources.
