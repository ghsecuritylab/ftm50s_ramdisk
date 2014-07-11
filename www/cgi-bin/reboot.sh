#!/bin/sh

initRx=`cat /etc/ppp/data/initData | awk '{ print $1 }'`
initTx=`cat /etc/ppp/data/initData | awk '{ print $2 }'`
currentRx=`cat /etc/ppp/data/curData | awk '{ print $1 }'`
currentTx=`cat /etc/ppp/data/curData | awk '{ print $2 }'`
sumRx=`expr $initRx + $currentRx`
sumTx=`expr $initTx + $currentTx`
`echo $sumRx $sumTx > /etc/ppp/data/initData`

`echo AT#SHDN > /dev/ttyS1; sleep 0.1`
sleep 5 
sync
reboot