#!/bin/sh
for i in {1..10}
do
    sleep 1
    echo "\nHello num $i"
    data='{"name": "aaa", "time": "111111111111111111", "weight": 2000, "lid_open": true, "enter_count": 15}'
    curl -H "Content-Type:application/json" -X POST --data ${data} http://13.230.45.222/open
done 
