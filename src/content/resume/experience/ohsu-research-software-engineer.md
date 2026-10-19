---
title: "Research Software Engineer"
org: "Knight Cancer Institute, Oregon Health & Science University"
orgHref: "https://www.ohsu.edu/knight-cancer-institute"
location: "Portland, OR"
period: "Sep 2022 — Jun 2026"
order: 1
---

# Technical Leadership

- Worked directly with research groups and GA4GH standards partners to turn researcher needs into platform requirements and delivery plans.
- Led design and code review on a 3-person engineering team and mentored 2 junior developers on Go, [Kubernetes](https://kubernetes.io/), and [GA4GH](https://www.ga4gh.org/) standards.
- Lead developer of [Funnel](https://github.com/calypr/funnel): owned the architecture, roadmap, and release process, shipping 5+ releases and setting the direction for its storage, compute, and database backends.

# Distributed Systems & Workflow Orchestration

- Built and maintained Funnel, a Go service that schedules and executes genomic analysis tasks across Kubernetes, cloud, and HPC backends through the [GA4GH Task Execution API](https://github.com/ga4gh/task-execution-schemas); processed ~40 TB of genomic data in production. Replaced its manual Kubernetes install with a published [Helm](https://helm.sh/) chart and added a PostgreSQL backend.
- Designed and built [nf-ga4gh](https://github.com/nextflow-io/nf-ga4gh), a [Nextflow](https://www.nextflow.io/) plugin that lets existing genomic pipelines run on any TES backend without code changes; together with Funnel, adopted by 10+ research groups outside OHSU.
- Partnered with CTDS (University of Chicago) on [Gen3-Workflow](https://github.com/uc-cdis/gen3-workflow), building its Funnel execution layer: a Kubernetes Job per TES task in a shared multi-tenant namespace, per-task S3-backed volumes (AWS S3 CSI driver) shared across nodes, and a gRPC plugin that injects each user's Gen3 S3 credentials so the server never stores user tokens.

# Cloud Platform & Reliability

- Built and ran the Kubernetes platform (Helm, [Terraform](https://www.terraform.io/), kubeadm) for the lab's data commons and analysis services across [AWS](https://aws.amazon.com/), [Azure](https://azure.microsoft.com/), and [OpenStack](https://www.openstack.org/).
- Built the CI/CD pipelines, automated provisioning, and Postgres/Elasticsearch backup, restore, and migration procedures, cutting deploy time by 30%.
- Added monitoring, alerting, and status dashboards for production services, maintaining 99.9% uptime.
