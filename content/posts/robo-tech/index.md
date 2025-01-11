---
title: "Robotech"
date: 2022-04-21T09:00:00+00:00
description: RoboTech 2022 Hackathon Submission
hero: images/robotech_sim.gif
author:
  image: /images/sharwin_portrait.jpg
menu:
  sidebar:
    name: Robotech
    identifier: robo-tech
    weight: 9
tags: ["Python", "RRT", "A*"]
# categories: ["Basic"]
---

A graphical simulation of a swarm of robotic agents cleaning algal bloom in a lake utilizing path planning algorithms such as A* and RRT*. Submitted for the RoboTech 2022 Hackathon.

## The Problem Statement
One of the most detrimental factors to the environment is the pollution and destruction to the oceans and all marine life. Aquatic habitats are incredibly beneficial for the sustainability of the planet since they act as massive carbon sinks and lower overall greenhouse gas emissions.

We've decided to focus on Algae blooms and their impact on lake/pond environments. Algae blooms produce toxins that kill marine animals, contaminate potential drinking water, and even create dead zones in large bodies of water. 

Dead zones are areas in a body of water that have minimal oxygen and aren't capable of supporting marine life. Algae blooms among other climate change stressors have contributed to an approximate 250,000 square kilometers of dead zones on the globe. 

Algae blooms are generated due to excess nitrogen and phosphorus in the water. These chemicals are pumped into the ocean from sewage effluent, manufacturing byproducts, etc.

These blooms block sunlight and consume large amounts of oxygen, and spread very quickly. The toxins produced from blooms are harmful to both humans and marine life.

## The Solution
Autonomous Swarm Cleaning Robots: ASCR.

Our strategy will be to deploy a swarm (coordinated fleet) of aquatic rovers to clear out large Algal blooms within a body of water of any size.

There are 2 major components: 
<ul>
<li>The Supervisor Module</li>
<li>Fleet of Aquatic Drones</li>
</ul> 
The supervisor is deployed initially and will survey the immediate surrounding area using a collection of a few sensors, and will plan sub-routines for the fleet of aquatic drones it carries.

Each drone is outfitted with an array of sensors, as well as a scrubbing and storage aparatus to clear out Algae and store it. The drones all have pre-determined cleaning paths organized and managed by the supervisor. Multiple runs are expected due to the small size of the drones and the amount of algae they can hold before needing to come back to the supervisor to expel the collected algae.

### The Hardware
A CAD model of an aquatic drone has been created using SOLIDWORKS and showcases the key features our drones will have. These include:
<ul>
<li>Ultrasonic Sensors to measure depth and proximity to other drones</li>
<li>Water level Sensors to measure water displacement</li>
<li>Electric Motors powering a dual-propeller system for maneuverability</li>
</ul>

### The Software
The software for a simulation was written for the higher-level planning and organization of the drone network. We've offered a graphical simulation depicting a lake full of algae being cleaned by aquatic drones following a pre-determined route written by the supervisor.

We've taken 2 approaches to path-planning:
<ul>
<li>A* Search Algorithm: Heuristic based search</li>
<li>RRT*: Optimized Random Sampling</li>
</ul>
We found that our Algae problem was counter-intuitive to a solution like A* Search. Despite being (one of) the best searching algorithms, it struggles with vast open environments and the complexity scales with the number of Algae spots that need to be cleaned up. The algorithm thrives in close quarters, where it can seek optimal paths using it's heuristic as as strong lead on how to bias expansion. In an open environment however, such a heuristic isn't as powerful due to ability for the robot to basically move anywhere!

Code for A* Search can be found in the files:

<ul>
<li><code>pathFind.py</code></li> -> source code for A* Search
<li><code>testingPathFinding.py</code></li> -> executable script with tunable parameters and random board generation
</ul>

RRT* is an optimized random sampling algorithm. In essence, random points are sampled given some constraints about the problem and a path is generated to the sampled point. This is repeated up to a certain <code>depth</code> and each layer can bias the generation depending on the state of the problem to improve performance.

Code for RRT* can be found in the files:
<ul>
<li><code>simulation.py</code></li> -> RRT* Implemented into Sim
</ul>

Within <code>simulation.py</code>, there are many parameters (with documentation!) that can be tuned to better visualize the varying levels of performance that comes with different number of drones, drone speed, RRT depth, etc. Note that being over-generous with the parameters can induce large computations on the PC and may not run fast or at all. However, once you're past the black screen while the paths are being generated, the simulation will keep going until the <code>MAX_DEPTH</code> of paths for each drone are reached. 

Take note of what areas of the lake the drones are more drawn too...

### Future Software Goals
<ul>
<li> Writing a (exceedingly) clever heuristic function to make A* Search a viable option </li>
<li> Implement quadrants to split lake into quadrants for each drone to have their path planned in to improve performance </li>
<li> Incorporate threading to boost performance </li>
<li> Implement more GUI features to improve interactivity with parameters </li>
<li> Write more documentation</li>
</ul>

## Running our code
Currently, our latest driving code is in [simulation.py](simulation.py). Run the file in order to see the simulation being output to the GUI built using the <code>pygame</code> library

Watch our simulation on [Youtube](https://www.youtube.com/watch?v=irKteNY1Mms).

