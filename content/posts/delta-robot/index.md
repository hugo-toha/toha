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
    <img src="DeltaCircleTrajectory.gif" alt="Delta Robot Circular Trajectory" style="border-radius: 15px; height: 300px; margin-right: 5px;">
    <img src="FK_notebook.png" alt="Robot Simulated in 3D Plot" style="border-radius: 15px; height: 300px; margin-left: 5px;">
</div>


# End-Effector Sensors
## BNO085 IMU
<div align="center">
  <img src="imu.png" alt="IMU" style="border-radius: 15px; width: 50%;">
</div>

The [BNO085 IMU](https://www.adafruit.com/product/4754) has the following features:

- **Acceleration Vector / Accelerometer**
    - Three axes of acceleration (gravity + linear motion) in m/s^2
- **Angular Velocity Vector / Gyro**
    - Three axes of 'rotation speed' in rad/s
- **Magnetic Field Strength Vector / Magnetometer**
    - Three axes of magnetic field sensing in micro Tesla (uT)
- **Linear Acceleration Vector**
    - Three axes of linear acceleration data (acceleration minus gravity) in m/s^2
- **Gravity Vector**
    - Three axes of gravitational acceleration (minus any movement) in m/s^2
- **Absolute Orientation/  Rotation Vector**
    - Four point quaternion output for accurate data manipulation

Thanks to the sensor fusion and signal processing wizards from CEVA, with the BNO085 you also get:

- **Application Optimized Rotation Vectors**
      - For AR/VR, low latency, and low power consumption
- **Additional Base Sensor Reports**
    - Separate and simultaneous outputs of Calibrated, Uncalibrated + Correction, and Raw ADC outputs for the Accelerometer, Gyro, and Magnetometer
- **Detection and Classification reports:**
    - Stability Detection and Classification
    - Significant Motion Detector
    - Tap, Step, and Shake Detectors
    - Activity Classification

## VL53L1X Time of Flight Distance Sensor
<div align="center">
  <img src="ToF.png" alt="Time of Flight Sensor" style="border-radius: 15px; width: 50%;">
</div>

The [VL53L1X ToF Sensor](https://www.adafruit.com/product/3967) is capable of precise distance measurement within a range of 30 to 4000 mm, with up to a 50Hz update rate and a 27 degree field of view which can be configured with a programmable Region of Interest (ROI).