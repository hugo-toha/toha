---
title: "Chess Robot"
date: 2022-06-08T09:00:00+00:00
description: Gantry style robot with a camera to play chess against a human player.
hero: images/chess.jpg
author:
  image: /images/sharwin_portrait.jpg
menu:
  sidebar:
    name: Chess Robot
    identifier: chess-robot
    weight: 4
tags: ["Python", "OpenCV", "Arduino", "Stepper Motors"]
# categories: ["Basic"]
---

This robot utilized stepper motors, a camera, sensors, and a gantry style system to interact with the chess board and play against a human opponent.

## System Hardware
The robot's frame was assembled using aluminum extrusion and 3D printed parts. 2 motors were used to drive the X-axis, and 1 motor was used to drive the Y-axis (horizontally).

<div align="center">
    <img src="chess_robot_frame.jpg" alt="Chess Robot Frame" style="border-radius: 15px;">
</div>

In order to interact with the chess pieces and board, a gripper was developed to interface with each of the pieces' stem. The gripper assembly was mounted to a lead screw in order to raise and lower the gripper.

<div align="center">
    <img src="chess_gripper.png" alt="Chess Robot Gripper" style="border-radius: 15px;">
</div>

## Computer Vision
A standard USB camera was used to track the game state in real time. Our initial approach was to attempt to classify each piece on every square after breaking up the image by pixels for each square.


Since the beginning of a chess game is always the same and known to the computer, we can cheat a little bit with the computer vision in order to improve its performance. Instead of attempting to classify the piece, we only need to notice changes in the position compared to the previous position. For example if the squares `e2` and `e4` are marked as different from the starting position, we know that a white pawn started on `e2` and has moved to `e4`.


<div align="center">
    <img src="camera.jpg" alt="Chess Robot Frame" style="border-radius: 15px;">
</div>


## Resetting the Board

<div align="center">
    <img src="frame_from_above.jpg" alt="Chess Robot Frame" style="border-radius: 15px;">
</div>
