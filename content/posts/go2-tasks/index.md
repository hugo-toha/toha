---
title: "Teaching an Old Dog New Tricks"
date: 2025-03-19T09:00:00+00:00
description: Reinforcement Learning for Unitree Go2 Robot Dog
hero: images/go2_banner.jpg
author:
  image: /images/sharwin_portrait.jpg
menu:
  sidebar:
    name: Unitree Go2 New Tasks
    identifier: go2-tasks
    weight: 5
tags: ["Python", "Reinforcement Learning", "PPO", "Genesis"]
repo: https://github.com/HarrisonBounds/go2RL
---
The Unitree Go2 Dog is an incredibly advanced robot with an impressive locomotion system. This project utilized the Genesis simulation platform to train policies for the robot using PPO (Proximal Policy Optimization) to accomplish various tasks such as strafing, running, jumping, and jumping over obstacles.


*This post is still under construction, check out our [Final Presentation](https://docs.google.com/presentation/d/1t-WxQv7l9nbno7PVQyR4ZqkIlAv57PJc0tnwp6PpszA/edit?usp=sharing) for more details*

## Reward Function Design
The reward function design was where the majority of the work was done to train the robot on different tasks. The Genesis platform offers an end-to-end example of a training script, environment, and evaluation script for teaching the robot to walk. The reward function for walking encouraged the dog to maintain a forward velocity while penalizing deviations from the body height target and from the initial joint points.

```python
    reward_cfg = {
        "tracking_sigma": 0.25, # Tolerance for tracking commanded velocity
        "base_height_target": 0.3, # Target height of main body [m]
        "feet_height_target": 0.075,  # Desired foot clearance [m]
        "reward_scales": {
            "tracking_lin_vel": 1.0, # Reward for matching commanded lin_vel
            "tracking_ang_vel": 0.2, # Reward for matching commanded ang_vel
            "lin_vel_z": -1.0,  # Penalty for vertical linear velocity
            "base_height": -50.0, # Penalty for deviation from target body height
            "action_rate": -0.005, # Penalty for rapid joint motions
            "similar_to_default": -0.1,  # Penalty for deviation from default joint angles
        },
    }
    command_cfg = {
        "num_commands": 3,
        "lin_vel_x_range": [0.5, 0.5],
        "lin_vel_y_range": [0, 0],
        "ang_vel_range": [0, 0],
    }
```