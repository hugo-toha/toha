---
title: "ToastBot"
date: 2024-12-12T09:00:00+00:00
description: Pick and Place Sequence using the Franka Emika Panda Robot Arm
hero: images/toastbot.jpg
author:
  image: /images/sharwin_portrait.jpg
menu:
  sidebar:
    name: Toastbot
    identifier: ToastBot
    weight: 2
tags: ["Python", "ROS", "Moveit API", "Intel Realsense"]
# categories: ["Basic"]
---

Using a 7-DoF Franka Emika Panda Robot Arm, we developed a pick and place sequence using an Intel Realsense camera for identifying april tags.

<!-- Embed this youtube video: https://www.youtube.com/watch?v=XGcdhWRo-iU&t=1s -->
<div align="center">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/XGcdhWRo-iU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Computer Vision
The Intel Realsense camera has a ROS package `realsense` that enables the camera to publish depth and color images. 
In order to identify april tags, we used the `apriltag_ros` package which subscribes to the camera images and publishes the detected tags which each
have a unique ID. The tags were used to locate the positions of objects in the scene as well as localize the camera frame from the robot's base frame.

## Robot Arm Control
The Franka Emika Panda Robot Arm has a ROS package `franka_ros` which allows us to control the robot arm using the Moveit API. The Moveit API offers services and action servers to faciliate trajectory planning, end-effector operation, and motion profiling. On top of the Moveit API, we developed our own Motion Planner that offers higher level tasks such as pose-to-pose motions, end-effector operations, and cartesian path planning.