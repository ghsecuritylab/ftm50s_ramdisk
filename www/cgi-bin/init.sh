#!/bin/sh
`echo AT#SHDN > /dev/ttyS1; sleep 0.1`
cp /etc/initQos.conf /etc.init/
rm -rf /mnt/mtd/etc
sleep 1
cp -r /etc.init /mnt/mtd/etc
sleep 2
sync
reboot
