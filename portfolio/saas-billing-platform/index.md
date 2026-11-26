# Multi-tenant SaaS Billing Platform

> Usage-based billing, invoicing and a customer portal for a B2B software product.

Canonical URL: https://hunexture.com/portfolio/saas-billing-platform/

This is an illustrative example project. Any metrics shown on the site are illustrative, not verified client results.

## Overview

A billing layer that meters product usage, applies plans and discounts, issues invoices in several currencies and gives customers a self-service portal.

## Challenge

Finance rebuilt invoices by hand each month because the product sold seat plans, usage tiers and custom contracts that the old system could not express.

## Solution

We designed an event-sourced metering service and a rules engine for plans, with Stripe handling payments and a reconciliation job that flags any mismatch before invoices go out.

## Features

## Technologies
