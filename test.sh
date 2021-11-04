#!/bin/bash
data="455 459"
declare -a issues=($data)
for i in "${issues[@]}"
do
   echo "Welcome $i times"
done