---
title: "Delta Robot ROS Package"
date: 2025-01-06T09:00:00+00:00
description: Open Source Delta Robot ROS Package
hero: images/delta_robot.jpg
author:
  image: /images/sharwin_portrait.jpg
menu:
  sidebar:
    name: Delta Robot
    identifier: delta-robot
    weight: 9
tags: ["ROS2", "C++", "Parallel Robot Kinematics"]
repo: https://github.com/Sharwin24/DeltaRobot
---
An open source ROS package for controlling delta robots with forward and inverse kinematics, trajectory generation, and visualization. Designed for public use and easy integration with new delta robot designs and applications.


# Kinematic Simulation
The robot's forward and inverse kinematics were first implemented in a jupyter notebook to visualize the robot's configuration space and workspace. Eventually, the kinematics will be implemented into ROS2 C++ nodes with optimizations for fast computation.

<div align="center">
    <img src="FK_notebook.png" alt="Robot Simulated in 3D Plot" style="border-radius: 15px;">
</div>