---
title: "Automated Poker Table"
date: 2023-04-11T09:00:00+00:00
description: Introduction to Sample Post
hero: images/bike_dealer.jpg
author:
  image: /images/sharwin_portrait.jpg
menu:
  sidebar:
    name: Automated Poker Table
    identifier: automated-poker-table
    weight: 3
tags: ["Arduino", "Python", "Raspberry Pi", "I2C", "Stepper Motors"]
# categories: ["Basic"]
---

An automated system that creates a seamless home-game experience by automating the tedious and repetitive tasks that occur during a game of cards while lowering the barrier of entry of knowledge for complex games, focusing on Texas Hold 'Em Poker as a proof of concept.

<div align="center">
    <iframe width="560" height="315" src="https://www.youtube.com/watch?v=PsuNezDvL1I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

**Update (April 11, 2023): We won first place at the [Northeastern ECE Capstone Expo](https://coe.northeastern.edu/news/2023-capstone-projects/)!**

## System Overview
The main compute for the B-I-K-E Poker Table is a Rasperry Pi 4B. The Pi is operating on native Ubuntu and will run our main program written in Python (3.10.6). The main program will facilitate the Poker logic and delegate low-level control to Arduino Unos and a Nucleo 32 via serial connection.

The Arduino Unos will control motors and sensors for both the Card-Turret and Auto-Shuffler. A custom communication layer lies between the Arduinos and the Pi to ensure correct command execution and completion. Each Arduino is running C++ utilizing our own custom-built Stepper-Motor Controller Library.

The Arduino Nano handles I/O control for the 4 button panels which enable players to provide input when playing Poker. Each button panel offers an I/O chip equipped with I2C and an interrupt pin. Our custom interfacing code translates the data over I2C into poker inputs for the Pi to operate upon.

<div align="center">
    <img src="system_overview.png" alt="System Overview" style="border-radius: 15px;">
</div>

### Card Dealer

### Auto-Shuffler

### Player Button Panel

### Game Display

## Design Reviews

### Card Dealer

### Auto-Shuffler

#### Card Dispenser

#### Conveyor Belt

#### Card Elevator

### Button Panel