#!/bin/sh
/bin/fwmng -i /tmp/new_fw -o /dev/mtdblock2 -v -V -U >& /tmp/fwmng.txt
result=`cat /tmp/fwmng.txt | awk 'END { print }'` 
if [ "$result" = "Firmware upgrade successfully finished." ]
then
	rm /tmp/fwmng.txt
	echo "done"
else
	rm /tmp/fwmng.txt
	echo "fail"
	/www/cgi-bin/update_ramdisk.sh
fi
